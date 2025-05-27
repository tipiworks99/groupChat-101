## 💬SuperChat
SuperChat is a modern real-time chat application built using React and Firebase. It features secure Google authentication, real-time message syncing via Firestore, and a clean, responsive user interface designed for seamless chatting across devices.

### ✨Features
  - 🔐 Google Sign-In Authentication
  - 💬 Real-time messaging powered by Firestore
  - 🎨 Clean and responsive user interface
  - 📱 Mobile-friendly layout
  - 🗑️ Auto-clear messages after 48 hours (optional / under development)
  - 🔒 Secure Firestore rules

### 🛠️Tech Stack
  - Frontend: React, CSS
  - Backend/Database: Firebase (Authentication + Firestore)
  - Tooling: Git, Vite (or CRA)

### 📦 Installation
- 1. Clone the repository :
git clone https://github.com/your-tipiworks99/superchat.git

- 2. Navigate to the project folder :
cd superchat

- 3. Install dependencies :
npm install

- 4. Start the development server:
npm run dev  # or npm start if you used CRA


### ⚙️ Firebase Setup
1. Create a new project in Firebase Console
2. Enable Google Authentication under Authentication → Sign-in method
3. Create a Firestore database
4. Apply Firestore security rules:
   
  ```rules_version = '2';
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
```
### 📱 Usage
- Sign in with your Google account
- Start sending and receiving messages in real time
- Messages are displayed with user avatars and timestamps
- Auto-scroll and responsive behavior for mobile and desktop

### 📄 License
This project is licensed under the MIT License – see the LICENSE file for details.

### 🙏 Acknowledgements
1. Fireship YouTube Channel – For Firebase + React tutorial inspiration -> 
I built a chat app in 7 minutes with React & Firebase : https://www.youtube.com/watch?v=zQyrwxMPm88
2. React Documentation
3. Firebase Documentation
