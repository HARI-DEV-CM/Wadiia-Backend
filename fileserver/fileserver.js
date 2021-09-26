var fs = require('fs')
var express = require('express')
var app = express();
var mysql = require('mysql')

app.get('/', function(request, response) {
    fetchData(response);
    console.log('Done. Displayed Data !!!');
});

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'wadiiatest'
})

function fetchData(response) {
    executeQuery("SELECT converter from flight_cms ", function(result){
        console.log(result);
        response.write('<h1>')
        for(var converter in result[0]){
            response.write(converter);
        }
        response.end('</h1>')
    })
}

const port = process.env.PORT || 8001;
app.listen(port, () => console.log(`port is running on ${port}`));