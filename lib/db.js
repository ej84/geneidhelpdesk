import mysql from "mysql";

const dbConfig = {
  host: "67.225.136.131",
  user: "admin_geneuser",
  password: "GetGeneIDmy@136!",
  database: "admin_getgeneid_panel",
};

export function getConnection() {
  const connection = mysql.createConnection(dbConfig);
  connection.connect((err) => {
    if (err) {
      throw new Error("Failed to connect to database");
    }
  });
  return connection;
}
