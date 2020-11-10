const express = require('express');
const helmet = require('helmet');
const compression = require('compression');

const app = express();

app.use(helmet())
app.use(compression())

app.get('/api', (req, res) => {
    res.send("Hello world");
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}`));

