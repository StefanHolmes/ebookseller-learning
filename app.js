const express = require('express');
const stripe = require('stripe')('sk_test_PP2O5cISCWTdVDHn4BjV9se4');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();

// Handlebars
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Static folder
app.use(express.static(`${__dirname}/public`));

// Index
app.get('/', (req, res) => {
    res.render('index');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    console.log(`${__dirname}\\public`);
});