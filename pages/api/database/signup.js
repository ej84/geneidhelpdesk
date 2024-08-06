import { getConnection } from "../../../lib/db";
import bcrypt from "bcryptjs";

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { username, password, email } = req.body;

  const connection = getConnection();

  const hashedPassword = bcrypt.hashSync(password, 10);

  connection.query(
    "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
    [username, hashedPassword, email],
    (error, results) => {
      connection.end();

      if (error) {
        if (error.code === "ER_DUP_ENTRY") {
          return res
            .status(400)
            .json({ message: "Username or email already exists" });
        }
        return res.status(500).json({ message: "Database query error", error });
      }

      res.status(200).json({ message: "User registered successfully" });
    }
  );
}
