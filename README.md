# WebPushNotification
This project demonstrates how to implement Web Push Notifications to keep customers informed about important events in the Nagara Metered Auto application. It allows the backend to send real‑time notifications directly to users’ devices or browsers, even when the web app is not open in the foreground.

📌 Web Push Notification Setup
This POC demonstrates sending web push notifications to customers for ride status updates, app announcements, or other alerts.
It uses Service Workers on the frontend and VAPID keys for secure push subscription.

🔑 Generating VAPID Keys
To send notifications, you need a VAPID key pair (public & private).
You can generate them using the web-push library in Node.js.

Steps:

bash
Copy
Edit
# Install web-push globally or locally
npm install web-push -g

# Generate VAPID keys
web-push generate-vapid-keys
Output Example:

vbnet
Copy
Edit
Public Key:
BIZfib_QT8YUr63tIwG8XAGo7iP7V-ErD6_3nLV5lQJKfVH_o1-9cXpAqml-RW9rnQ9ENcEoug0KY3PTBDLgEQo

Private Key:
kXx0XWkOaHgqVvM4tSg0opYBHFJv7lMxW2XJz0_8FRA
Public Key → Use this in the frontend as applicationServerKey.

Private Key → Keep this safe and use in backend to sign notifications.

📄 Frontend Subscription (React Example)
In your frontend, register the service worker and subscribe to push notifications:

javascript
Copy
Edit
navigator.serviceWorker.register('/sw.js')
  .then(registration => {
    return registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: '<Your Public VAPID Key Here>'
    });
  })
  .then(subscription => {
    // Send subscription to your backend
    console.log('Push Subscription:', subscription);
  })
  .catch(err => console.error('Push registration failed', err));
⚙️ Backend Setup (Node.js Example)
Use the web-push library in your backend to send notifications:

javascript
Copy
Edit
const webpush = require('web-push');

// Set your VAPID keys
webpush.setVapidDetails(
  'mailto:youremail@example.com',
  '<Your Public VAPID Key>',
  '<Your Private VAPID Key>'
);

// Send notification
webpush.sendNotification(subscription, JSON.stringify({
  title: 'Ride Update',
  body: 'Your driver has started the ride!',
  icon: '/icon.png'
}));
✅ Features in this POC
🔔 Send notifications like ride status updates or new app announcements.

📡 Tested with service workers and VAPID key authentication.

📱 Works even when the app is in background or closed (PWA support).
