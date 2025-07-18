const express = require('express');
const bodyParser = require('body-parser');
const webPush = require('web-push');
const app = express();
const PORT = process.env.PORT || 3900;
const cors = require('cors');
app.use(cors());

// VAPID keys should be generated only once.
// You can generate these keys using the following command in a separate file:
// const webPush = require('web-push');
// console.log(webPush.generateVAPIDKeys());

const vapidKeys = {
    publicKey: 'BIZfib_QT8YUr63tIwG8XAGo7iP7V-ErD6_3nLV5lQJKfVH_o1-9cXpAqml-RW9rnQ9ENcEoug0KY3PTBDLgEQo',
    privateKey: 'fldu4jm9_xCPXJisW8nq7029zowlccTlF8xh8BW83qY'
};

webPush.setVapidDetails(
    'mailto:maheshgouda2001@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

app.use(bodyParser.json());

// Endpoint to save the subscription object on the server
let subscriptions = [];

app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    subscriptions.push(subscription); // Store subscription in memory or a database
    res.status(201).json({ message: 'Subscription received!' });
});

// Endpoint to trigger push notifications
app.post('/send-notification', (req, res) => {
  const notificationPayload = JSON.stringify({
    title: "Test Notification",
    message: "This is a test notification from the server.",
    icon: "/NAGARA/icon.png",
    url: "http://localhost:3000/NAGARA"
});

const sendNotifications = async () => {
        const notifications = subscriptions.map(sub => 
            webPush.sendNotification(sub, notificationPayload)
                .catch(error => console.error("Error sending notification:", error))
        );
        
        await Promise.all(notifications);
        res.status(200).json({ message: 'Notifications sent!' });
    };

    sendNotifications();
});

app.post('/save-subscription', (req, res) => {
  const subscription = req.body;
  // Save subscription to the database or in memory
  res.status(201).json({ message: 'Subscription saved' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
