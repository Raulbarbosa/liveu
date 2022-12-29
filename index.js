const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const methods = require('./controllers/index');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use('/public', express.static('public'));

app.get('/sign-up', (req, res) => {
    res.render('./sign-up.ejs')
})

app.post('/user', methods.createUser);


app.listen(5000, () => {
    console.log("server is running...");
})