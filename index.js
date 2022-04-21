const express = require('express')
const app = express()

const path = require('path')
//add template engine
const hbs = require('express-handlebars');
//setup template engine directory and files extensions
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
}))

//setup public dir
app.use(express.static('public'));

const mysql = require('mysql')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))

app.get('/',(req, res)=>{
    let query = "SELECT * FROM joga_mysql.article";
    let articles = [];
    con.query(query, (err, result) => {
        if(err) throw err;
        articles = result

        res.render("index",{
            articles: articles
        })
    })
});

//show article this slug
app.get('/article/:slug', (req, res) =>{
    let query = `SELECT * FROM joga_mysql.article WHERE slug='${req.params.slug}'`;
    let article;
    con.query(query, (err, result) =>{
        if (err) throw err;
        console.log(result);
        article = result;
        res.render('article', {
            article: article
        });
    })
})


//create db connection
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty",
    database: "joga_mysql"
})

con.connect(function (err){
    if (err) throw err;
    console.log("Connected to joga_mysql db");
})

app.listen(3001, () => {
    console.log("app is started at http://localhost:3001")
});







