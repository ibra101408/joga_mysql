const con = require('../utils/db');

//show all articles - index
const getAllArticles = (req, res) =>{
    let query = "SELECT * FROM joga_mysql.article";
    let articles = [];
    con.query(query, (err, result) => {
        if(err) throw err;
        articles = result

        res.render("index",{
            articles: articles
        })
    })
};


//show article by this slug
const getArticleBySlug = (req, res) =>{
    let query = `SELECT joga_mysql.article.name, joga_mysql.article.slug, article.image, article.body, article.published, joga_mysql.author.name FROM joga_mysql.article INNER JOIN joga_mysql.author ON article.author_id=joga_mysql.author.id WHERE slug='${req.params.slug}'`;

    let article;
    con.query(query, (err, result) =>{
        if (err) throw err;
        console.log(result);
        article = result;
        res.render('article', {
            article: article
        });
    })
};

// show articles by author
const getArticlesByAuthor = (req, res) => {
    let query = `SELECT joga_mysql.article.name, joga_mysql.article.slug, article.image, article.body, article.published, joga_mysql.author.name FROM joga_mysql.article INNER JOIN joga_mysql.author ON article.author_id=joga_mysql.author.id WHERE author_id = "${req.params.author_id}";`
    // let query = `SELECT * FROM article where slug = "${req.params.slug}"`
    let articles = []
    let author
    con.query(query, (err, result) => {
        if (err) throw err
        articles = result
        author = result[0]
        res.render('author', {
            articles: articles,
            author: author
        })
    })
}

//export controller functions
module.exports = {
    getAllArticles,
    getArticleBySlug,
    getArticlesByAuthor

};