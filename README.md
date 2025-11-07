# 📱 PostifyApp

[![GitHub](https://img.shields.io/badge/GitHub-PostifyApp-blue?logo=github)](https://github.com/mohammadfirmansyah/PostifyApp)
[![React Native](https://img.shields.io/badge/React%20Native-0.74.5-blue?logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-51.0.28-black?logo=expo)](https://expo.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-11.0.1-orange?logo=firebase)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A modern social media application built with React Native and Firebase. PostifyApp allows users to share posts with images and text, manage their profiles, and interact with other users in a beautiful, intuitive interface.

## 📚 Documentation

- **[Contributing Guide](CONTRIBUTING.md)** - Learn how to contribute to the project
- **[Changelog](CHANGELOG.md)** - Version history and release notes

## ✨ Key Features

- **User Authentication**: Secure signup and login using Firebase Authentication
- **Post Creation**: Share posts with title, text content, and images
- **Privacy Control**: Create public posts or private posts visible only to you
- **User Profiles**: Customize your profile with display name and avatar
- **Social Feed**: Browse posts from all users with real-time updates
- **Image Support**: Add images to posts via URL with inline preview
- **Responsive Design**: Beautiful UI that works seamlessly on web, iOS, and Android
- **Bottom Tab Navigation**: Easy navigation between Users, Posts, Add Post, and Settings

## 📱 Screenshots

```
┌────────────────────────────────┐
│   🔐 SignUp/Login Screen       │
│                                │
│   📧 Email: ___________        │
│   🔒 Password: ________        │
│                                │
│   [Sign Up] [Login]            │
└────────────────────────────────┘

┌────────────────────────────────┐
│   👥 Users List (Posties)      │
│                                │
│   😊 Current User (Purple)     │
│   😊 User 1                    │
│   😊 User 2                    │
│                                │
│   [Users] [Posts] [Add] [⚙️]   │
└────────────────────────────────┘

┌────────────────────────────────┐
│   📝 Add New Post              │
│                                │
│   Title: ___________           │
│   Text: ___________            │
│   Image URL: _______           │
│   [Preview Image]              │
│                                │
│   [Post] [Post Privately]      │
└────────────────────────────────┘
```

## 🛠️ Technologies Used

- **React Native** - v0.74.5 - Cross-platform mobile framework
- **Expo SDK** - v51.0.28 - Development platform for React Native
- **Firebase** - v11.0.1 - Backend services (Authentication, Firestore)
- **React Navigation** - v6.1.18 - Navigation library for React Native
- **React Native Toast Message** - v2.2.1 - Elegant toast notifications
- **React Native Web** - v0.19.10 - Run React Native on web browsers
- **TypeScript** - Modern JavaScript with static typing

## 📂 Project Structure

```
PostifyApp/
├── App.js                      # Main application entry point with navigation
├── firebase.js                 # Firebase configuration and initialization
├── useAuthentication.js        # Custom hook for authentication state
├── SignUpScreen.js             # User registration screen
├── LoginScreen.js              # User login screen
├── ListUsers.js                # Display all registered users
├── PostifyPostsList.js         # Display user posts
├── PostifyAddPostScreen.js     # Create new posts
├── SettingsScreen.js           # User profile settings
├── colors.js                   # App color palette
├── package.json                # Dependencies and project metadata
├── app.json                    # Expo configuration
└── assets/                     # Images, fonts, and other assets
```

## 🚀 Setup & Installation

Before you begin, make sure you have the following installed:
- **Node.js** >= 18.0
- **npm** or **yarn**
- **Expo CLI** (install with `npm install -g expo-cli`)
- **Firebase Account** with a project configured

### Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable **Authentication** with Email/Password provider
3. Create a **Firestore Database** with the following collections:
   - `user_data` - Stores user profiles (email, displayName, avatar)
   - `postify_posts` - Stores posts (title, text, imageUrl, user, private, createdAt)
4. Copy your Firebase configuration and update `firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mohammadfirmansyah/PostifyApp.git
   cd PostifyApp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Firebase:**
   - Update `firebase.js` with your Firebase configuration (see above)

## 💻 Usage / How to Run

1. **Start the development server:**
   ```bash
   npm start
   # or
   expo start
   ```

2. **Run on specific platform:**
   ```bash
   # Web browser
   npm run web

   # iOS simulator (macOS only)
   npm run ios

   # Android emulator or device
   npm run android
   ```

3. **First time setup:**
   - Create an account using the SignUp screen
   - Complete your profile in Settings (add display name and avatar)
   - Start creating and sharing posts!

## 📝 Code Highlights

### Firebase Authentication Integration

```javascript
// SignUpScreen.js - User Registration
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase';

const handleSignUp = async () => {
  try {
    // Create Firebase auth account
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      email, 
      password
    );
    
    // Store user profile in Firestore
    await addDoc(collection(db, 'user_data'), {
      email: userCredential.user.email,
      displayName: email.split('@')[0],
      avatar: ''
    });
  } catch (error) {
    Alert.alert('Error', error.message);
  }
};
```

### Real-time Post Fetching

```javascript
// PostifyPostsList.js - Fetch Posts with Client-side Filtering
const fetchPosts = async () => {
  // Query Firestore for user's posts
  const postsCollection = query(
    collection(db, 'postify_posts'),
    where('user.userid', '==', poster)
  );
  
  const postSnapshot = await getDocs(postsCollection);
  let postsList = postSnapshot.docs.map(doc => ({ 
    id: doc.id, 
    ...doc.data() 
  }));
  
  // Filter for public posts (client-side to avoid index requirement)
  postsList = postsList.filter(post => post.private === false);
  
  // Sort by creation date (newest first)
  postsList.sort((a, b) => 
    b.createdAt.toMillis() - a.createdAt.toMillis()
  );
  
  setPostList(postsList);
};
```

### Bottom Tab Navigation

```javascript
// App.js - Navigation Structure
<Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
      if (route.name === 'ListUsers') {
        iconName = focused ? 'people' : 'people-outline';
      }
      // ... other icons
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: 'purple',
    tabBarInactiveTintColor: 'gray',
  })}
>
  <Tab.Screen name="ListUsers" component={ListUsers} />
  <Tab.Screen name="PostifyPostsList" component={PostifyPostsList} />
  <Tab.Screen name="PostifyAddPostScreen" component={PostifyAddPostScreen} />
  <Tab.Screen name="Settings" component={SettingsScreen} />
</Tab.Navigator>
```

## 📖 Learning Outcomes

This project demonstrates excellent skills in:

- ✅ **Firebase Integration**: Authentication, Firestore database queries, and real-time data
- ✅ **State Management**: Using React hooks (useState, useEffect, useCallback) effectively
- ✅ **Navigation**: Complex navigation with React Navigation (Stack + Bottom Tabs)
- ✅ **Form Handling**: Controlled inputs with validation and error handling
- ✅ **Async Operations**: Proper handling of async/await for database operations
- ✅ **Component Composition**: Building reusable, well-documented components
- ✅ **User Experience**: Intuitive UI with toast notifications and loading states
- ✅ **Code Quality**: Tutorial-style comments and clean, readable code

## 🔧 Technical Decisions

### Why Client-side Filtering for Posts?

We use client-side filtering for the `private` field to avoid Firebase composite index requirements:

```javascript
// Instead of this (requires composite index):
query(collection(db, 'postify_posts'),
  where('user.userid', '==', poster),
  where('private', '==', false),  // ❌ Requires index
  orderBy('createdAt', 'desc')    // ❌ Requires index
);

// We do this (no index needed):
query(collection(db, 'postify_posts'),
  where('user.userid', '==', poster)  // ✅ Single field query
);
// Then filter and sort in JavaScript
```

**Benefits:**
- ✅ No need to create composite indexes in Firebase Console
- ✅ Faster development and deployment
- ✅ Still efficient for typical user post counts (< 100 posts)

### Why Empty String Instead of Null for TextInput?

React Native's TextInput requires controlled components with string values:

```javascript
// ❌ Causes warning: "value prop should not be null"
const [imageUri, setImageUri] = useState(null);

// ✅ Correct: Use empty string for controlled input
const [imageUri, setImageUri] = useState('');
```

## 🤝 Contributing

We welcome contributions! Please see our **[Contributing Guide](CONTRIBUTING.md)** for details on:

1. How to submit bug reports and feature requests
2. Development workflow and coding standards
3. Pull request process
4. Code review guidelines

Quick start:
```bash
# Fork the repository
git clone https://github.com/YOUR_USERNAME/PostifyApp.git

# Create feature branch
git checkout -b feature/AmazingFeature

# Make changes and commit
git commit -m 'Add some AmazingFeature'

# Push to your fork
git push origin feature/AmazingFeature

# Open a Pull Request
```

## 📄 License

This project is licensed under the MIT License. See the **[LICENSE](LICENSE)** file for details.

## 🚨 Security Note

**Important:** The Firebase configuration in `firebase.js` contains API keys that should be protected. For production apps:

1. Use Firebase App Check to restrict API usage
2. Configure Firestore Security Rules to protect data
3. Never commit sensitive keys to public repositories
4. Use environment variables for configuration

Example Firestore Security Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /user_data/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    
    // Posts are readable by all, writable by owner
    match /postify_posts/{postId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.user._id;
    }
  }
}
```

## 👨‍💻 Developer

- **Mohammad Firman Syah**
- **GitHub:** [@mohammadfirmansyah](https://github.com/mohammadfirmansyah)
- **Project Link:** [https://github.com/mohammadfirmansyah/PostifyApp](https://github.com/mohammadfirmansyah/PostifyApp)

## 🙏 Acknowledgments

- Firebase for excellent backend services
- Expo for simplifying React Native development
- React Navigation for robust navigation solutions
- The React Native community for continuous support

---

**Built with ❤️ using React Native & Firebase**
