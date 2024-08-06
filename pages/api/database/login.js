import { getConnection } from "../../../lib/db";
import bcrypt from "bcryptjs";

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { username, password } = req.body;
  const connection = getConnection();

  connection.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (error, results) => {
      if (error) {
        connection.end();
        return res.status(500).json({ message: "Database query error", error });
      }

      if (results.length === 0) {
        connection.end();
        return res.status(404).json({ message: "User not found" });
      }

      const user = results[0];

      const isPasswordValid = bcrypt.compareSync(password, user.password);
      connection.end();

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }
      console.log("User logged in:", {
        user_id: user.id,
        username: user.username,
        email: user.email,
      });

      res.status(200).json({
        user_id: user.id,
        username: user.username,
        email: user.email,
      });
    }
  );
}
