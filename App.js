import React, { useEffect, useState }  from "react";
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from '@react-native-community/async-storage'
//import { RNCamera } from 'react-native-camera';
import { Entypo } from '@expo/vector-icons';
import styles from './styles'
import { AuthContext } from "./context";
import {
  SignIn,
  CreateAccount,
  Projects,
  BarcodeScreen,
  JobsScreen,
  Details,
  Prospects,
  Profile,
  Splash,
  CameraScreen,
} from "./Screens";


const STORAGE_KEY = '@save_auth'


const Burger = () => {
  return (
    <Entypo name="menu" iconStyle={styles.iconStyle} size={36} color="black" />
  );
}

const burgerOptions = ({navigation}) => ({headerLeft: () => <TouchableOpacity onPress={() => navigation.toggleDrawer()}><Burger/></TouchableOpacity>,})




const JobsStack = createStackNavigator();
const JobsStackScreen = ({navigation}) => (
  <JobsStack.Navigator screenOptions={burgerOptions}>
    <JobsStack.Screen name="Jobs" component={JobsScreen}/>
  </JobsStack.Navigator>
);



const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator screenOptions={burgerOptions}>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

const BarcodeStack = createStackNavigator();
const BarcodeStackScreen = () => (
  <BarcodeStack.Navigator screenOptions={burgerOptions}>
    <BarcodeStack.Screen name="Barcode" component={BarcodeScreen} />
  </BarcodeStack.Navigator>
);

const CameraStack = createStackNavigator();
const CameraStackScreen = () => (
  <CameraStack.Navigator  screenOptions={burgerOptions}>
    <CameraStack.Screen name="Camera" component={CameraScreen} />
  </CameraStack.Navigator>
);

const UtilityTabs = createBottomTabNavigator();
const UtilityTabScreen = () => (
  <UtilityTabs.Navigator>
    <UtilityTabs.Screen name="Barcode" component={BarcodeStackScreen}  />
    <UtilityTabs.Screen name="Camera" component={CameraStackScreen} />
  </UtilityTabs.Navigator>
);

const Tabs = createBottomTabNavigator();
const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Jobs" component={JobsStackScreen} />
  </Tabs.Navigator>
);

const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="Jobs">
    <Drawer.Screen name="Jobs" component={TabsScreen} />
    <Drawer.Screen name="Utilities" component={UtilityTabScreen} />
    <Drawer.Screen name="Profile" component={ProfileStackScreen} />
  </Drawer.Navigator>
);


const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{ title: "Sign In" }}
    />
    <AuthStack.Screen
      name="CreateAccount"
      component={CreateAccount}
      options={{ title: "Create Account" }}
    />
  </AuthStack.Navigator>
);



const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={DrawerScreen}
        options={{
          animationEnabled: false
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false
        }}
      />
    )}
  </RootStack.Navigator>
);

export default () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const saveData = async (auth_key) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, auth_key)
    } catch (e) {
      alert('Failed to save session storage')
    }
  }

  const readData = async () => {
    try {
      const user_token = await AsyncStorage.getItem(STORAGE_KEY)
  
      if (user_token !== null) {
        setUserToken(user_token)
      }
    } catch (e) {
      alert('Failed to fetch session storage')
    }
  }

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear()
    } catch (e) {
      alert('Failed to clear session storage')
    }
  }

  const authContext = React.useMemo(() => {
    return {
      signIn: (auth_key) => {
        setUserToken(auth_key);
        setIsLoading(false);
        saveData(auth_key);
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken("asdf");
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
        clearStorage();
      }
    };
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  React.useEffect(() => {
    readData()
  }, []);


  if (isLoading) {
    return <Splash />;
  }



  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};