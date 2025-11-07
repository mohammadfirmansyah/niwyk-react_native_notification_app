// Import React hooks for component state management
import React, { useState } from 'react';

// Import React Native UI components for building the signup interface
import { View, TextInput, Image, Pressable, Text, StyleSheet } from 'react-native';

// Import Firebase authentication method for creating new user accounts
import { createUserWithEmailAndPassword } from 'firebase/auth';

// Import navigation hook to enable screen transitions
import { useNavigation } from '@react-navigation/native';

// Import Firebase instances for database and authentication
import { db, auth } from './firebase';

// Import Firestore methods for storing user data in the database
import { collection, addDoc } from 'firebase/firestore';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  // Handle user registration with email and password
  // Validates input, creates Firebase account, stores user data in Firestore
  const handleSignUp = async () => {
    // Validate that all fields are filled and passwords match
    if (email && password && confirmPassword && password !== confirmPassword) {
      alert("Please provide all required details for SignUp");
      return;
    }
    try {
      // Create new user account with Firebase Authentication
      await createUserWithEmailAndPassword(auth, email, password);

      // Prepare user data object for Firestore storage
      const userData = {};
      userData.display_name = email;
      userData.email = email;

      // Store user profile data in Firestore database
      await addDoc(collection(db, "user_data"), userData);
      
      // Navigate to Login screen after successful signup
      navigation.navigate('Login');
      }
      catch(error) {
        const errorMessage = error.message;
        // Check for duplicate email error and show appropriate message
        if(errorMessage.indexOf("email-already-in-use") != -1) {
          alert("Email already in use.");
        } else {
          alert(errorMessage)
        }
        console.log(errorMessage);
      };
  };

  return (
    <View style={styles.container}>
      {/* App logo displayed at the top of signup form */}
      <Image
        source={require('./assets/logo.png')} // Replace with your logo path
        style={styles.logo}
      />
      
      {/* Welcome message for new users */}
      <Text style={styles.header}>Post it for posterity!</Text>
      
      {/* Email input field with keyboard optimization for email addresses */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      {/* Password input field with secure text entry */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      {/* Confirm password field to ensure user entered correct password */}
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      
      {/* Sign up button triggers account creation */}
      <Pressable style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
      
      {/* Link to login screen for existing users */}
      <View style={styles.loginLinkContainer}>
        <Text>Already have an account? </Text>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Log In</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',  
    backgroundColor: '#ffe6ff'
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    width:'80%'
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginLink: {
    color: 'blue',
    fontWeight: 'bold',
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 30,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default SignUpScreen;
