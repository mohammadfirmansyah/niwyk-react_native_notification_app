// Import React hooks for managing component state
import React, { useState } from 'react';

// Import React Native UI components for building the login interface
import { View, TextInput, Pressable, Text, StyleSheet, Image, Alert } from 'react-native';

// Import Firebase authentication method for user sign in
import { signInWithEmailAndPassword } from 'firebase/auth';

// Import navigation hook to enable screen transitions after login
import { useNavigation } from '@react-navigation/native';

// Import Firebase authentication instance
import { auth } from './firebase';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // Handle user login with email and password authentication
  // Signs in user with Firebase and navigates to home screen on success
  const handleLogin = async () => {
    try {
      // Authenticate user with Firebase using email and password
      await signInWithEmailAndPassword(auth, email, password);
      console.log("The user has successfully logged in")
    } catch(error) {
        const errorMessage = error.message;
        console.log(errorMessage);
        // Show user-friendly error message if login fails
        Alert.alert("Login Error", "Please check the credentials");
    };
  };

  return (
    <View style={styles.container}>
      {/* App logo displayed at the top of login form */}
      <Image
        source={require('./assets/logo.png')}
        style={styles.logo}
      />
      
      {/* Login header text */}
      <Text style={styles.header}>Log In</Text>
      
      {/* Email input field optimized for email keyboard */}
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
      
      {/* Login button triggers authentication */}
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </Pressable>
      
      {/* Link to signup screen for new users */}
      <View style={styles.signupLinkContainer}>
        <Text>Don't have an account? </Text>
        <Pressable onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signupLink}>Sign Up</Text>
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
    width:'80%',
  },
  signupLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupLink: {
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

export default LoginScreen;
