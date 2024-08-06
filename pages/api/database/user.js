export default function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const user = req.query.user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.status(200).json({ user });
}
