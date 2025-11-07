// Import React hook for managing state in this component
import React, { useState } from 'react';
// Import React Native UI components for form inputs and display
import { View, Text, TextInput, Pressable, Image, StyleSheet, Alert } from 'react-native';
// Import Firebase instances for database and authentication
import { db, auth } from './firebase';
// Import Firestore methods to add new posts to database
import { collection, addDoc, Timestamp } from 'firebase/firestore';
// Import navigation hook to navigate back after posting
import { useNavigation } from '@react-navigation/native';

export default function PostifyAddPostScreen() {
  // State management for post title, text content, and image URL
  // Initialize with empty strings to avoid uncontrolled component warnings
  const [title, setTitle] = useState('');
  const [textNote, setTextNote] = useState('');
  const [imageUri, setImageUri] = useState('');

  const navigation = useNavigation();

  // Submit post to Firestore as either public or private
  // Private posts only visible to the post creator
  const handleSubmit = async (privatePost) => {
    // Ensure title and at least one content type (image or text) is provided
    if (title && (imageUri || textNote)) {
      const randomId = Math.floor(Math.random() * 1000000).toString();
      
      // Construct post data object with only provided fields
      const postData = {};
      postData.id = randomId;
      postData.title = title;
      postData.createdAt = Timestamp.now(); // Store creation timestamp
      if (textNote) postData.text = textNote; // Add text if provided
      if (imageUri) postData.imageUrl = imageUri; // Add image URL if provided
      postData.user = {_id:randomId, userid: auth.currentUser.email}; // Associate with current user
      postData.private = privatePost; // Set visibility (public/private)

      // Navigate back to posts list before uploading
      navigation.navigate('PostifyPostsList', { poster: auth.currentUser.email})
      
      // Add post to Firestore and show success notification
      addDoc(collection(db, "postify_posts"), postData).then(()=>{
        alert('Uploaded Successfully!') // In real apps, replace this with expo-notifications 
      })
    } else {
      // Validation: Ensure required fields are filled
      alert("Please fill all required fields");
    }
  };

  return (
    <View style={styles.container}>
      {/* Title input field - required for all posts */}
      <Text style={styles.label}>Title</Text>
      <TextInput
        placeholder="Enter post title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      {/* Multi-line text input for post content */}
      <Text style={styles.label}>Text Note</Text>
      <TextInput
        placeholder="Write your thoughts..."
        value={textNote}
        onChangeText={setTextNote}
        multiline
        style={styles.textArea}
      />

      {/* Image URL input with inline preview */}
      <Text style={styles.label}>Image URL (optional)</Text>
      <TextInput
        placeholder="Paste image URL"
        value={imageUri}
        onChangeText={setImageUri}
        style={styles.input}
      />

      {/* Display image preview if valid URL is provided */}
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : null}

      {/* Post action buttons: Public and Private options */}
      <View style={styles.postOptions}>
        <View style={styles.buttonContainer}>
          {/* Public post button - visible to all users */}
          <Pressable style={styles.button} onPress={() => handleSubmit(false)}>
            <Text style={styles.buttonText}>Post</Text>
          </Pressable>
          
          {/* Private post button - only visible to creator */}
          <Pressable style={styles.button} onPress={() => handleSubmit(true)}>
            <Text style={styles.buttonText}>Post Privately</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffe6ff'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginRight: 15,
    marginLeft:10
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginTop: 5,
    borderRadius: 5,
  },
  textArea: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginTop: 5,
    borderRadius: 5,
    height: 100,
    textAlignVertical: 'top',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 10,
  },
  postOptions: {
    flexDirection: 'row',
    alignItems: 'stretch',
    margin:10
  },
  buttonContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  button: {
    padding:10,
    borderRadius: 6,
    backgroundColor: '#b830b3',
    margin: 15,
  }
});
