var mysql = require("mysql2");

const config =  mysql.createConnection({
    user: "wadiia_dev",
    host: "134.209.158.198",
    password: "Wadia@1cmd",
    database: "cms_panel_development"
}) 

module.exports = config;