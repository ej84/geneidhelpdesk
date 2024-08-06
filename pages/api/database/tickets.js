import { getConnection } from "../../../lib/db";

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const connection = getConnection();

  connection.query("SELECT * FROM ticket", (error, results) => {
    if (error) {
      connection.end();
      return res.status(500).json({ message: "Database query error", error });
    }

    if (results.length === 0) {
      connection.end();
      return res.status(404).json({ message: "ticket not found" });
    }

    const ticket = results[0];

    connection.end();

    res.status(200).json({
      ticket_id: ticket.ticket_id,
      user_id: ticket.user_id,
      subject: ticket.subject,
      status: ticket.status,
      description: ticket.description,
    });
  });
}
