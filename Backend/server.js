const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const WebSocket = require('ws');
// const { saveMessageToDatabase } = require('../api');


// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

const url = require('url');

// Initialize WebSocket server
const wss = new WebSocket.Server({ port: 3001 });

const connectedUsers = {};

wss.on('connection', (ws, req) => {
  const params = url.parse(req.url, true).query;
  const userId = params.userID;

  // Associate the WebSocket connection with the userId
  connectedUsers[userId] = ws;

  console.log(`New client connected with userId: ${userId}`);

  ws.on('message', async (message) => {

    console.log(`Received message => ${message}`);

    const parsedMessage = JSON.parse(message);

    console.log(`parsedMessage message => ${parsedMessage}`);

    // Forward the message only if the other user is online
    if (parsedMessage.type === 'chat' && parsedMessage.targetUserId) {

      const targetWs = connectedUsers[parsedMessage.targetUserId];
      if (targetWs) {

        // Inject the sender's ID
        parsedMessage.senderId = userId;

        console.log(`Forwarding message to user: ${parsedMessage.targetUserId}`);
        targetWs.send(JSON.stringify(parsedMessage));

        // Emit a new message notification to the receiver
        // const notificationMessage = {
        //   type: 'new_message_notification',
        //   sender_id: userId,
        //   receiver_id: parsedMessage.targetUserId,
        // };
        // targetWs.send(JSON.stringify(notificationMessage));

        // Notify the frontend to update the 'read' status
        // ws.send(JSON.stringify({ type: 'updateReadStatus', read: false }));
      }
    }
  });


  ws.on('close', () => {
    console.log('Client has disconnected');
    // Remove the WebSocket connection from connectedUsers
    delete connectedUsers[userId];
  });
});



// Your existing routes
const usersRoute = require('./routes/users');
const mediasRoute = require('./routes/medias');
const matchesRoute = require('./routes/matches');
const preferencesRoute = require('./routes/preferences');
const swipesRoute = require('./routes/swipes');
const connectionsRoute = require('./routes/connections');
const profilesRoute = require('./routes/profiles');

app.use('/users', usersRoute);
app.use('/medias', mediasRoute);
app.use('/matches', matchesRoute);
app.use('/preferences', preferencesRoute);
app.use('/swipes', swipesRoute);
app.use('/connections', connectionsRoute);
app.use('/profiles', profilesRoute);

// MongoDB connection
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

// Start the HTTP server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
