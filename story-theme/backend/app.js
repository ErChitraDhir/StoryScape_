const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const config = require("./config/db");
const cors = require("cors");
require('dotenv').config();

const corsOptions = {
    origin: 'https://storyscape.onrender.com', 
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '50mb' }));
app.use(express.static(__dirname + "/public/"));

const routes = require("./routes/apiRoutes");
app.use("/api", routes);

// Seeder
if (process.env.NODE_ENV !== 'production') {
    const seeder = require('./config/seeder');
    seeder.adminseeder();
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log("Server Connected on port " + port);
});
