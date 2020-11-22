const express = require('express');
const mongoose = require('mongoose');
const config = require("config");
const parser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const helmet = require('helmet');
const compression = require('compression');

//Routes
const categoryRoutes = require("./routes/categories");
const contactRoutes = require("./routes/contacts");
const cartRoutes = require("./routes/carts");
const productRoutes = require("./routes/products");
const imageRoutes = require("./routes/images");
const userRoutes = require("./routes/users");

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
        cookie: { maxAge: 180 * 60 * 1000, path: '/', domain: 'localhost:3000' , sameSite: 'none', secure: true }
    })
)
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

app.use('/api/category', categoryRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api', cartRoutes);
app.use('/api/product', productRoutes);
app.use('/api', imageRoutes);
app.use('/api/user', userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}`));

