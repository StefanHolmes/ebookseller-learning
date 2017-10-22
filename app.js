const express = require('express');

require('dotenv').config();

console.log(process.env);

const keySecret = process.env.STRIPE_SECRET;

const stripe = require('stripe')(keySecret);
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

// Charge
app.post('/charge', (req, res) => {
    const amount = 1337;

    //  console.log(req.body);
    // res.send('TEST');

    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
        .then(customer => stripe.charges.create({
            amount,
            description:'Web development ebook',
            currency:'gbp',
            customer:customer.id
        }))
        .then(charge => res.render('success'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    console.log(`Serving from ${__dirname}`);
});