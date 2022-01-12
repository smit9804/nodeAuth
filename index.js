const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 4000;
const user = require('./routes/user.routes');

require('./config/mongoose.config');

//Middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ message: "API Functional"});
});

app.use("/user", user);

app.listen(port, (req, res) => {
    console.log(`Server started up on port ${port}`);
});