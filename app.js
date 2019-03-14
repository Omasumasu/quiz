const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const config = require("config");

const app = express();

const connect_db = () => {
    return mysql.createConnection({
        host: config.db.master.host,
        user: config.db.master.user,
        password: config.db.master.password,
        database: config.db.master.database
    })
};

const fetch_sample_data = (connection) =>{
    connection.query('select * from sample', function (error, results) {
    if (error) throw error;
    console.log(results);
  });
};

const check_auth = (req) => {
    if (req.get("x-api-key") && req.get("x-api-key") === config.x_api_key) {
        return true;
    } else {
        return false;
    }
};

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.listen(8085);

app.post('/getsampleData', function (req, res) {
    try {
        var connection = connect_db();
        fetch_sample_data(connection);
    } catch (e) {
        throw new Error("DB access Exception")
    } finally {
        connection.end();
    }
    status = check_auth(req) ? "ok" : "unauthorized";
    res.json({"status": status});
});