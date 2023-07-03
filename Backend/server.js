const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

const usersRoute = require('./routes/users');
const mediasRoute = require('./routes/medias');
const matchesRoute = require('./routes/matches');
const preferencesRoute = require('./routes/preferences');
const swipesRoute = require('./routes/swipes');
const connectionsRoute = require('./routes/connections');

// Set up the routes for the "/users" path
app.use('/users', usersRoute);

app.use('/medias', mediasRoute)

app.use('/matches', matchesRoute)

app.use('/preferences', preferencesRoute)

app.use('/swipes', swipesRoute)

app.use('/connections', connectionsRoute)

// app.put('/preferences/:userId/radius', (req, res) => {
//     res.send(`UserId is ${req.params.userId}`);
// });


console.log(process.env.MONGODB_URI);

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});