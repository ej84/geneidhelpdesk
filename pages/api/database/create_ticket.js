import { getConnection } from "../../../lib/db";

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { id, username, subject, email, description, date, dept } = req.body;

  const connection = getConnection();

  connection.query(
    "INSERT INTO ticket (user_id, username, subject, email, description, created_date, department) VALUES (?, ?, ?, ?, ?, ?,?)",
    [id, username, subject, email, description, date, dept],
    (error, results) => {
      connection.end();

      if (error) {
        if (error.code === "ER_DUP_ENTRY") {
          return res
            .status(400)
            .json({ message: "Failed to create a ticket." });
        }
        return res.status(500).json({ message: "Database query error", error });
      }

      res.status(200).json({ message: "Created ticket successfully." });
    }
  );
}
