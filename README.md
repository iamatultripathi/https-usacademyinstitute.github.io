# https-usacademyinstitute.github.io
Official website for US Academy Institute.

## Live site
This repository is set up so that GitHub Pages can publish it as a website.

## What’s included
- `index.html` — the home page
- `styles.css` — site styling
- `script.js` — placeholder for future interactivity

## How to publish
1. Commit and push your files to the `main` branch.
2. Because the repo name is `iamatultripathi.github.io`, GitHub Pages will publish it automatically from `main`.
3. Visit `https://iamatultripathi.github.io` after a few minutes.

## Next steps for backend and database
This site is now ready for Firebase backend integration.

### What Firebase gives you
- A dashboard for your form responses and student requests
- A database to save contact and student data
- A backend without writing a server

### Setup Firebase
1. Open `https://console.firebase.google.com`
2. Sign in with a Google account
3. Create a new project, for example `us-academy-institute`
4. Add a Web app to the project
5. Copy the Firebase configuration and replace the placeholder values in `script.js`

Your Firebase config will look like this:
```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### Dashboard page
- The site includes `dashboard.html`
- After Firebase setup, open `https://iamatultripathi.github.io/dashboard.html`
- You will see saved requests from the contact form

### Publish after setup
1. Save your changes to `script.js`
2. Commit them in VS Code
3. Push to GitHub
4. Open `https://iamatultripathi.github.io`

### View data in Firebase
- In Firebase console, open your project
- Click `Firestore Database`
- View the `requests` collection

### Payments and complete dashboard
- Firebase handles student requests and contact data
- Payment integration can be added later with Stripe or PayPal
- Your Firebase console acts as the dashboard for incoming data
