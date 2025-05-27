###💬SuperChat
SuperChat is a modern real-time chat application built using React and Firebase. It features secure Google authentication, real-time message syncing via Firestore, and a clean, responsive user interface designed for seamless chatting across devices.

####✨Features
  🔐 Google Sign-In Authentication
  💬 Real-time messaging powered by Firestore
  🎨 Clean and responsive user interface
  📱 Mobile-friendly layout
  🗑️ Auto-clear messages after 48 hours (optional / under development)
  🔒 Secure Firestore rules

####🛠️Tech Stack
  Frontend: React, CSS
  Backend/Database: Firebase (Authentication + Firestore)
  Tooling: Git, Vite (or CRA)

📦 ###**Installation**
Clone the repository

bash
Copy
Edit
git clone https://github.com/your-username/superchat.git
cd superchat
Install dependencies

bash
Copy
Edit
npm install
Create a .env file in the root directory and add your Firebase credentials:

env
Copy
Edit
VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_auth_domain
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_storage_bucket
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id
Run the application

bash
Copy
Edit
npm run dev   # For Vite
# or
npm start     # If you used CRA
⚙️ Firebase Setup
Create a new project in Firebase Console

Enable Google Authentication under Authentication → Sign-in method

Create a Firestore database

Apply Firestore security rules:

js
Copy
Edit
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /messages/{docId} {
      allow read: if request.auth.uid != null;
      allow create: if canCreateMessages();
    }

    function canCreateMessages() {
      let isSignedIn = request.auth.uid != null;
      let isOwner = request.auth.uid == request.resource.data.uid;
      let isNotBanned = exists(
        /databases/$(database)/documents/banned/$(request.auth.uid)
      ) == false;
      return isSignedIn && isOwner && isNotBanned;
    }
  }
}
📱 Usage
Sign in with your Google account

Start sending and receiving messages in real time

Messages are displayed with user avatars and timestamps

Auto-scroll and responsive behavior for mobile and desktop

🤝 Contributing
Contributions are welcome!
If you’d like to suggest a feature or fix a bug, feel free to open an issue or pull request.

📄 License
This project is licensed under the MIT License – see the LICENSE file for details.

🙏 Acknowledgements
Fireship YouTube Channel – For Firebase + React tutorial inspiration

React Documentation

Firebase Documentation
