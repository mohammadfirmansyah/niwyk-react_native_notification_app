// Import React library for building UI components
import React from 'react';
// Import navigation components for screen routing
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Import Pressable for interactive logout/home buttons
import { Pressable } from 'react-native';

// Import authentication screens for non-logged-in users
import SignUpScreen from './SignUpScreen';
import LoginScreen from './LoginScreen';

// Import main app screens for logged-in users
import ListUsers from './ListUsers';
import PostifyPostsList from './PostifyPostsList';
import PostifyAddPostScreen from './PostifyAddPostScreen';
import SettingsScreen from './SettingsScreen';

// Import custom hook to track authentication state
import useAuthentication from './useAuthentication';
// Import icons for navigation tabs and buttons
import { Ionicons } from '@expo/vector-icons';
// Import Firebase auth methods for logout functionality
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  // Monitor authentication state - returns current user or null
  const {user} = useAuthentication();

  // Sign out current user from Firebase
  const handleLogout = async ()=>{
    await signOut(auth);
  }

  // Logout button component for header - appears on all logged-in screens
  const logoutButton = ()=> (
    <Pressable
      style={{margin:3}} 
      onPress={() => {
        handleLogout();
        console.log('User logged out');
      }} 
    >
      <Ionicons name="log-out-outline" size={24} color="grey" />
    </Pressable>
  )

  // Home button component for header - navigates back to users list
  // Note: This function references 'navigation' which should be passed from screen options
  const homeButton = (navigation)=> (
    <Pressable
      style={{margin:3}} 
      onPress={() => {
        navigation.navigate('ListUsers')
      }} 
    >
      <Ionicons style={{marginLeft:10}} name="home" size={24} color="grey" />
    </Pressable>
  )
  
  // Show bottom tab navigation for authenticated users
  if (user){
    return (
      <NavigationContainer>
      <Tab.Navigator
            screenOptions={({ route }) => ({
              // Configure tab icons based on route name
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'PostifyPostsList') {
                  iconName = focused ? 'list' : 'list-outline';
                } else if (route.name === 'PostifyAddPostScreen') {
                  iconName = focused ? 'add' : 'add-outline';
                } else if (route.name === 'Settings') {
                  iconName = focused ? 'settings' : 'settings-outline';
                } else if (route.name === 'ListUsers') {
                  iconName = focused ? 'people' : 'people-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'purple',
              tabBarInactiveTintColor: 'gray',
            })}
          >
          {/* Users list tab - shows all registered users */}
          <Tab.Screen 
            name="ListUsers" 
            component={ListUsers} 
            options={{ title: 'Posties',
            headerRight: logoutButton,
          }} />
          
          {/* Posts list tab - displays user posts */}
          <Tab.Screen 
            name="PostifyPostsList" 
            component={PostifyPostsList} 
            options={({navigation})=>({ title: 'Posts....',
            headerRight: logoutButton,
            headerLeft: ()=>homeButton(navigation)
          })} />
          
          {/* Add post tab - create new posts */}
          <Tab.Screen 
            name="PostifyAddPostScreen" 
            component={PostifyAddPostScreen} 
            options={({navigation})=>({ title: 'Add!!!',
            headerRight: logoutButton,
            headerLeft: ()=>homeButton(navigation)
          })} />
          
          {/* Settings tab - update profile */}
          <Tab.Screen 
            name="Settings" 
            component={SettingsScreen} 
            options={({navigation})=>({ title: 'Settings',
            headerRight: logoutButton,
            headerLeft: ()=>homeButton(navigation)
          })} />
        </Tab.Navigator>
      </NavigationContainer>
    )
  } else {
    // Show stack navigation with SignUp/Login for non-authenticated users
    return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
      </NavigationContainer>  
    );  
  }
}

