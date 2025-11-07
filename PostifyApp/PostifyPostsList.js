// Import React hooks for callbacks and state management
import React, { useCallback, useState } from 'react';

// Import navigation hooks for screen transitions and focus detection
import { useFocusEffect, useNavigation } from '@react-navigation/native';

// Import React Native UI components for displaying posts
import { Image, Text, View, FlatList, StyleSheet, Pressable } from 'react-native';

// Import Firestore methods to query and retrieve posts from database
import {
  collection,
  getDocs,
  where,
  orderBy,
  query
} from 'firebase/firestore';

// Import Firebase instances for authentication and database
import { auth, db } from './firebase';

// Import icons for add post button
import { Ionicons } from '@expo/vector-icons';

// Import ScrollView for scrollable content when posts exceed screen height
import { ScrollView } from 'react-native-web';

const PostifyPostsList = ({route}) => {
  // Default to current user's email, can be overridden by route params
  let poster  = auth.currentUser.email;
  const navigation = useNavigation();
  const [postList, setPostList] = useState([])
  const [postStatus, setPostStatus] = useState("Loading....")

  // Check if viewing another user's posts via navigation params
  if(route.params){
    poster = route.params.poster;
    console.log(poster);
  }
  
  // Convert Firestore timestamp to readable date format (MM/DD/YYYY)
    let formatTimestampToDate = (timestamp) => {
        const date = timestamp.toDate();
        const month = String(date.getMonth()).padStart(2, '0');
        const day = String(date.getDay()).padStart(2, '0');
        const year = String(date.getFullYear()).padStart(2, '0');
        return `${month}/${day}/${year}`;
      }
  
  // Convert Firestore timestamp to readable time format (HH:MM:SS)
    let formatTimestampToTime = (timestamp) => {
      const date = timestamp.toDate();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');      
      return `${hours}:${minutes}:${seconds}`;
    }
  
  // Navigate to add post screen for creating new posts
    let loadPostScreen = ()=>{
      navigation.navigate('PostifyAddPostScreen', { poster: auth.currentUser.email})
    }
  
  // Fetch posts from Firestore for the specified user
  // Only retrieves public posts, ordered by creation date (newest first)
    const fetchPosts = async () => {
      try {
        // Create query to get user's posts (filter by userid only to avoid index requirement)
        // We'll filter for public posts client-side to avoid composite index
        const postsCollection = query(
          collection(db, 'postify_posts'),
          where('user.userid', '==', poster)
        );  
    
        // Execute query and map documents to post objects
        const postSnapshot = await getDocs(postsCollection);
        let postsList = postSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Filter for public posts only (client-side filtering)
        postsList = postsList.filter(post => post.private === false);
        
        // Sort by creation date descending (newest first)
        postsList.sort((a, b) => {
          if (!a.createdAt || !b.createdAt) return 0;
          return b.createdAt.toMillis() - a.createdAt.toMillis();
        });
        
        // Display message if user has no posts yet
        if(postsList.length == 0) {
          setPostStatus("No posts yet!")
        }
        setPostList(postsList);
      } catch(error){
        console.error(error);
        console.log("Unable to fetch posts")
      }
    };
  
  // Refetch posts whenever this screen comes into focus
  // This ensures new posts appear when navigating back from add post screen
    useFocusEffect(
      useCallback(() => {
        fetchPosts();
      }, [])
    );
    
  // Render individual post item with date, time, image, and text
    const listItem = (post)=>{
      return (
      <View style={{flexDirection:'column'}}>
        {/* Display post creation date and time in grey color */}
        <View style={styles.createdAt}>
          <Text style={styles.postTime}>{formatTimestampToDate(post.createdAt)}</Text>
          <Text style={styles.postTime}>{formatTimestampToTime(post.createdAt)}</Text>
        </View>
        
        {/* Center-aligned container for post image */}
        <View style={{
    flexDirection: 'row', 
    justifyContent: 'center',
  }}>
        {/* Display post image if URL is provided */}
        {post.imageUrl ? (
          <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
          ) : null}          
        </View>
        
        {/* Display post text content if provided */}
        {post.text ? (
          <Text style={styles.postText}>
          {post.text}
          </Text>
          ) : null}          
    
        {/* Divider line between posts */}
        <View style={styles.divider} />
      </View>)
    }

  return (
    <ScrollView style={styles.container}>
      {/* Show Add Post button only if viewing own posts */}
      {poster == auth.currentUser.email && (
      <Pressable style={styles.buttonContainer} onPress={()=>loadPostScreen()}>
        <Text style={{color:'white'}}>Add a Post!</Text>
      </Pressable>
    )}
    
      {/* Display posts list or status message */}
      {postList && postList.length > 0 ? (
        <FlatList
          data={postList}
          keyExtractor={post => post.id}
          renderItem={(post)=>listItem(post.item)}
        />):(
      // Display status message when no posts are available
      <Text style={styles.text}>{postStatus}</Text>
    )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  pressableContainer: {
    flexDirection: 'row', // Arrange children horizontally
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: '1cm',
  },
  postsList: {
    flexDirection: 'column',
    width: '80%',
    alignItems: 'flex-start'
  },
  button: {
    backgroundColor: 'cyan',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  generalText: {
    color: 'black',
    fontSize: 20,
    fontStyle: 'italic',
    marginBottom: '1cm'
  },
  buttonContainer: {
    width: '50%',
    alignSelf: 'center',
    alignItems: 'center',
    padding:10,
    borderRadius: 6,
    backgroundColor: '#b830b3',
    marginTop: 15
  },
  postTime: {
    color: 'grey',
    margin:5
  },
  divider: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginTop: 8,
  },
  postImage: {
    margin: 5,
    width: '60%',
    aspectRatio: 1,
    height: undefined, 
  },
  createdAt: {
    marginTop:15,
    marginBottom:10, 
    flexDirection:'row', 
    justifyContent: 'flex-start', 
  },
  audio: {
    flexDirection:'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  postText: {
    fontSize: 16,
    marginBottom: 10
  },  
});

export default PostifyPostsList;
