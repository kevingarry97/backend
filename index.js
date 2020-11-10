const express = require('express');
const mongoose = require('mongoose');
const config = require("config");
const parser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const helmet = require('helmet');
const compression = require('compression');

const app = express();

if (!config.get('jwtPrivatekey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

app.use(cors({
    origin: ['http://www.acyira.com', 'http://localhost:4200'],
    credentials: true
}));

mongoose
  .connect(config.get("db"), {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log("DB connected successfully"))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(parser.json())
app.use(parser.urlencoded({ extended: false }))
app.use(helmet())
app.use(compression())

app.use(
    session({
        secret: 'mySecureKey',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection, ttl: 14 * 24 * 60 * 60 }),
        cookie: { maxAge: 180 * 60 * 1000 }
    })
)
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});
  
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
});

app.get('/api', (req, res) => {
    res.send("Hello world");
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}`));

