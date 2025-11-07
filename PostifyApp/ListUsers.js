// Import React hooks for component lifecycle and state management
import React, { useEffect, useState } from 'react';

// Import React Native UI components for building the user list interface
import { View, Text, Pressable, FlatList, Image, StyleSheet } from 'react-native';

// Import Firestore methods to retrieve user data from the database
import { getFirestore, collection, getDocs, query } from 'firebase/firestore';

// Import navigation hooks for screen transitions and focus detection
import { useNavigation, useFocusEffect } from '@react-navigation/native';

// Import Firebase authentication to identify the current logged-in user
import { getAuth } from 'firebase/auth';

// Import ScrollView for scrollable content when user list is long
import { ScrollView } from 'react-native-web';

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const db = getFirestore();
  const auth = getAuth();
  const navigation = useNavigation();

  // Fetch users from Firestore whenever this screen comes into focus
  // This ensures the user list is always up-to-date when navigating back
  useFocusEffect(
    React.useCallback(() => {
      const fetchUsers = async () => {
        try {
          // Create a query to get all user data from Firestore
          const q = query(
           collection(db, "user_data"),
           );
         
           // Execute the query and retrieve user documents
           const querySnapshot = await getDocs(q);
           
           // Map Firestore documents to user objects with id and data
             const fetchedUsers = querySnapshot.docs.map(doc => ({
               id: doc.id,
               ...doc.data(),
             }));
             
             // Separate current user from other users for special display
             const currentUser = fetchedUsers.find((user) => user.email === auth.currentUser.email);
             const otherUsers = fetchedUsers.filter((user) => user.email !== auth.currentUser.email);
         
             // Set the sorted array with the current user first (highlighted)
             setUsers([currentUser, ...otherUsers]);        
           } catch (error) {
             console.error('Error fetching users:', error);
           }     
      };
      fetchUsers();
    }, [])
  );

  return (
    <ScrollView>
      {/* Render list of users with avatar and display name */}
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
            <View>
              {/* User container is pressable to navigate to their posts */}
              <Pressable style={styles.userContainer}
                onPress={() =>
                  navigation.navigate('PostifyPostsList', { poster: item.email})
                }
              >
                {/* Display user avatar with special border for current user */}
                <Image
                  source={{
                    uri: item.avatar ? item.avatar : 'https://randomuser.me/api/portraits/lego/1.jpg',
                  }}
                  style={[
                    styles.avatar,
                    // Highlight current user's avatar with purple border
                    item.email === auth.currentUser.email && styles.currentUserAvatarBorder
                  ]}
                />
                
                {/* Display user's name or email if name not set */}
                <Text style={styles.username}>
                  {item.displayName ? item.displayName : item.email}
                </Text>
              </Pressable>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
	userContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
	},
	title: {
	  fontSize: 24,
	  marginBottom: 20,
	  fontWeight: 'bold',
	},
	avatar: {
		width: 50,
		height: 50,
		borderRadius: 20,
		marginRight: 10,
	  },
	  username: {
		fontSize: 20,
		color: 'blue',
	  },
    currentUserAvatarBorder: {
      borderColor: 'purple',
      borderWidth: 3
    }
	});

// Export ListUsers as default for consistency with other screens
export default ListUsers;
