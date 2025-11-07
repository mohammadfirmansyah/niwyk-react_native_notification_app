A comprehensive social media application built with React Native and Firebase. PostifyApp demonstrates modern mobile development practices with clean architecture, real-time data synchronization, and extensive documentation.

## ✨ What's New

- **User Authentication**: Secure signup and login with Firebase Authentication
- **Post Creation**: Share posts with title, text, and images (URL-based)
- **Privacy Controls**: Create public posts visible to all or private posts for yourself only
- **User Profiles**: Customize display name and avatar URL
- **Social Feed**: Browse posts from all users with real-time Firestore sync
- **Bottom Tab Navigation**: Intuitive 4-tab interface (Users, Posts, Add Post, Settings)
- **Tutorial-Style Code**: Comprehensive educational comments throughout the codebase

## 🛠️ Technical Stack

- **React Native** - v0.74.5
- **Expo SDK** - v51.0.28
- **Firebase** - v11.0.1 (Authentication + Firestore)
- **React Navigation** - v6.1.18 (Bottom Tabs + Stack Navigator)
- **React Native Toast** - v2.2.1

## 📚 Documentation

- **[README.md](README.md)** - Complete setup guide and feature overview
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines and coding standards
- **[CHANGELOG.md](CHANGELOG.md)** - Detailed version history and technical decisions

## 🚀 Quick Start

```bash
cd PostifyApp
npm install
npm run web
```

## 📦 What's Included

- ✅ 6 screen components with tutorial-style comments
- ✅ Firebase integration (Auth + Firestore)
- ✅ Bottom tab + stack navigation setup
- ✅ Client-side filtering to avoid Firebase composite indexes
- ✅ Comprehensive documentation suite
- ✅ MIT License

## 🔧 Bug Fixes & Improvements

- Fixed export/import mismatch in ListUsers component
- Resolved Firebase composite index requirement with client-side filtering
- Corrected TextInput null value warnings
- Optimized post fetching with efficient Firestore queries

Built with ❤️ using React Native & Firebase
