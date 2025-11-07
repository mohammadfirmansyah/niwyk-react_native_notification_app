// Import React hooks for managing state and side effects
import React, { useState, useEffect } from 'react';
// Import React Native UI components for settings form
import { View, Text, TextInput, Image, StyleSheet, Alert, Pressable } from 'react-native';
// Import Firestore methods to query and update user settings
import { query, where, setDoc, collection, getDocs, addDoc, doc } from 'firebase/firestore';
// Import Firebase instances for authentication and database
import { auth, db } from './firebase';
// Import Toast for success notifications
import Toast from 'react-native-toast-message';
// Import navigation hook to navigate after saving
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  // State management for user profile settings
  // Initialize with empty strings to avoid uncontrolled component warnings
  const [avatar, setAvatar] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [docRef, setDocRef] = useState(null); // Reference to user's Firestore document

  const navigation = useNavigation();

  // Get the current authenticated user's email on component mount
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserEmail(currentUser.email);
    } else {
      Alert.alert('User not logged in', 'Please log in to update settings.');
    }
  }, []);

  // Fetch existing avatar and display name from Firestore
  const fetchAvatar = async () => {
    try {
      // Query user_data collection to find current user's profile
      const q = query(collection(db, "user_data"), where("email", "==", auth.currentUser.email));
      const querySnapshot = await getDocs(q);

      // Load existing profile data if found
      if (!querySnapshot.empty) {
        querySnapshot.forEach((docItem) => {
          const docReference = doc(db, "user_data", docItem.id);
          console.log(docReference);
          setDocRef(docReference); // Save document reference for updates

          // Set avatar URL if it exists in database
          if(docItem.data().avatar) {
            setAvatar(docItem.data().avatar);
          }
          
          // Set display name if it exists in database
          if(docItem.data().displayName) {
            setDisplayName(docItem.data().displayName);
          }
        });
      } else {
        console.log("No existing profile found - will create new one on save");
      }
    } catch (error) {
      console.error("Error fetching profile: ", error);
    }
  };

  // Load user profile data when component mounts
  useEffect(() => {  
    fetchAvatar();
  }, []);

  // Save profile changes to Firestore
  const saveChanges = async () => {
    if (!docRef) {
      // Create new profile document if user doesn't have one yet
      await addDoc(collection(db, "user_data"), {
        email: userEmail,
        avatar: avatar,
        displayName: displayName
      });
    } else {
      // Update existing profile document
      await setDoc(docRef, 
                    { email: userEmail, 
                      avatar: avatar, 
                      displayName: displayName 
                    });
    }
    
    // Show success notification
    Toast.show({
      type: "success",
      text1: "Changes Saved",
      text2: "Your profile has been updated 👋",
      position: "top"
    });
    
    // Navigate back to users list to see updated profile
    navigation.navigate('ListUsers')
  }

  return (
    <View style={styles.container}>
      {/* Settings screen title */}
      <Text style={styles.title}>Settings</Text>

      {/* Avatar preview container */}
      <View style={styles.avatarContainer}>
        {avatar ? (
          // Display avatar image if URL is provided
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          // Placeholder text when no avatar is set
          <Text style={styles.avatarPlaceholder}>No Avatar</Text>
        )}
      </View>

      {/* Display name input field */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Text style={styles.label}>Display Name:</Text>
        <TextInput
          placeholder="Enter display name"
          value={displayName}
          onChangeText={setDisplayName}
          style={styles.input}
        />
      </View>

      {/* Avatar URL input field */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <Text style={styles.label}>Avatar URL:</Text>
        <TextInput
          placeholder="Paste avatar image URL"
          value={avatar}
          onChangeText={setAvatar}
          style={styles.input}
        />
      </View>

      {/* Save changes button */}
      <Pressable style={styles.button} onPress={saveChanges}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffe6ff'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  avatarContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  avatarPlaceholder: {
    color: '#666',
    fontSize: 18,
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
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginTop: 5,
    borderRadius: 5,
    fontSize: 16
  },
  label: {
    marginRight:10, 
    padding: 8, 
    marginTop: 5, 
    fontSize:16
  }
});

export default SettingsScreen;
