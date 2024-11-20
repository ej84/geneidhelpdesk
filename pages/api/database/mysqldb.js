import mysql from "mysql";

export default function handler(req, res) {
  const dbConfig = {
    host: "67.225.136.131",
    user: "admin_geneuser",
    password: "GetGeneIDmy@136!",
    database: "admin_getgeneid_panel",
  };

  const connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
    if (err) {
      res.status(500).json({ error: "Failed to connect to database" });
      return;
    }

    connection.query("SELECT * FROM users", (err, results) => {
      if (err) {
        res.status(500).json({ error: err });
        return;
      }
      res.status(200).json(results);
    });

    connection.end();
  });
}
