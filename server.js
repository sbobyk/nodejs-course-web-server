// register the required modules
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const os = require('os');

var app = express();

hbs.registerPartials(__dirname + '/views/partials') //sets the partials directory
app.set('view engine', 'hbs'); // assign handlebars as the view engine
app.use(express.static(__dirname + '/public')); //sets the public directory for html files

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url} from ${req.ip}`;

    console.log(log);
    fs.appendFile('server.log', log + os.EOL, (err) => {
        if (err) {
            console.log('Unable to append to server.log.')
        }
    });
    next();
});

// return the current year for use in pages
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

// return the string in all caps
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// this is the root of the site
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Hello Express!',
        pageText: 'Here is the content of the page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Sorry, page not found.'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});