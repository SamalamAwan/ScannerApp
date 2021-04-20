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

const USER_STORAGE_KEY = '@save_user'
const USER_TYPE_STORAGE_KEY = '@save_user_type'
const AUTH_STORAGE_KEY = '@save_auth'
const JWT_STORAGE_KEY = '@save_jwt'


const Burger = () => {
  return (
    <Entypo name="menu" style={styles.menuIcon} size={36} color="black" />
  );
}

const BarcodeIcon = () => {
  return (
    <Entypo name="rainbow" style={styles.barcodeIcon} size={36} color="black" />
  );
}

const burgerOptions = ({navigation}) => (
  {
    headerLeft: () => <TouchableOpacity onPress={() => navigation.toggleDrawer()}><Burger/></TouchableOpacity>,
    headerRight: () => <TouchableOpacity onPress={() => navigation.navigate('Utilities')}><BarcodeIcon/></TouchableOpacity>,
  })


const JobsStack = createStackNavigator();
const JobsStackScreen = ({navigation, route}) => {
  return (
  <JobsStack.Navigator screenOptions={burgerOptions}>
    <JobsStack.Screen name="Jobs" component={JobsScreen}/>
  </JobsStack.Navigator>
)};



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
    <Tabs.Screen name="Jobs" component={JobsStackScreen}/>
  </Tabs.Navigator>
);

const Drawer = createDrawerNavigator();
const DrawerScreen = ({ route }) => {
  const { getJobs } = React.useContext(AuthContext);
  React.useEffect(() => {
  getJobs(route.params.jwtToken.jwtToken)
  }, []);
  return(
  <Drawer.Navigator initialRouteName="Jobs">
    <Drawer.Screen name="Jobs" component={TabsScreen}/>
    <Drawer.Screen name="Utilities" component={UtilityTabScreen} />
    <Drawer.Screen name="Profile" component={ProfileStackScreen} />
  </Drawer.Navigator>
)};


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
const RootStackScreen = ({ userToken, userName, userType, jwtToken}) => {
  const { getJwt } = React.useContext(AuthContext);
  const { readJWTcontext } = React.useContext(AuthContext);
  React.useEffect(() => {
    getJwt(userToken,userName, userType)
    readJWTcontext()
  }, []);
  return (
  <RootStack.Navigator headerMode="none">
    {(userToken && userName && userType && jwtToken) ? (
      <RootStack.Screen
        name="App"
        component={DrawerScreen}
        options={{
          animationEnabled: false
        }} initialParams={{ userToken:{userToken}, userName:{userName},userType:{userType},jwtToken:{jwtToken} }}
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
)};

export default () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [userType, setUserType] = React.useState(null);
  const [jwtToken, setJwtToken] = React.useState(null);

  const saveAuth = async (auth_key) => {
    try {
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, auth_key)
    } catch (e) {
      alert('Failed to save session storage')
    }
  }
  const saveUserName = async (userName) => {
    try {
      await AsyncStorage.setItem(USER_STORAGE_KEY, userName)
    } catch (e) {
      alert('Failed to save session storage')
    }
  }
  const saveUserType = async (userType) => {
    try {
      await AsyncStorage.setItem(USER_TYPE_STORAGE_KEY, userType)
    } catch (e) {
      alert('Failed to save session storage')
    }
  }

  const saveJWT= async (jwt) => {
    try {
      await AsyncStorage.setItem(JWT_STORAGE_KEY, jwt)
    } catch (e) {
      alert('Failed to save JWT')
    }
  }

  const readAuth = async () => {
    try {
      const user_token = await AsyncStorage.getItem(AUTH_STORAGE_KEY)
      const user_name = await AsyncStorage.getItem(USER_STORAGE_KEY)
      const user_type = await AsyncStorage.getItem(USER_TYPE_STORAGE_KEY)
      if (user_token !== null && user_name !== null && user_type !== null) {
        setUserToken(user_token)
        setUser(user_name)
        setUserType(user_type)
      }
      else{
        setUserToken('') 
        setUser('')
        setUserType('')
      }
    } catch (e) {
        alert('Failed to fetch session storage')
    }
  }

  const readJWT = async () => {
    try {
      const user_jwt = await AsyncStorage.getItem(JWT_STORAGE_KEY)
      if (user_jwt !== null) {
        setJwtToken(user_jwt)
      }
    } catch (e) {
      alert('Failed to fetch session storage')
    }
  }

  const fetchJwt = (userToken, user, userType ) => {
    let data = {
      method: 'POST',
      mode: "cors", // no-cors, cors, *same-origin *=default
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"username": user,"auth_key": userToken, "updateAuth":true,"user_type":userType})
    };
    return fetch('https://api-veen-e.ewipro.com/v1/authenticate/', data)
    .then((response) => {
        if(!response.ok) throw new Error(response.status);
        else return response.json();
      })
    .then((responseData) => {
      saveJWT(responseData.jwt)
    })
    .catch((error) => {
    });
  }

  const sendJwtForJobs = (jwt) => {
    const apiKey = '129937fa0cedad4fg9d0asdaf53e3faefc5'
    let authGet = apiKey + " " + jwt
    console.log(authGet)
    let data = {
      method: 'GET',
      mode: "cors", // no-cors, cors, *same-origin *=default
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authGet
      }
    };
    return fetch('https://api-veen-e.ewipro.com/v1/jobs/', data)
    .then((response) => {
        if(!response.ok) throw new Error(response.status);
        else return response.json();
      })
    .then((responseData) => {
      console.log(responseData);
    })
    .catch((error) => {
      console.log(error)
    });
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
      getJwt: (user_token, user_name, user_type) => {
        fetchJwt(user_token, user_name, user_type)
      },
      signIn: (auth_key, userName, userType, jwt) => {
        setUserToken(auth_key);
        setUser(userName);
        setUserType(userType);
        setJwtToken(jwt);
        setIsLoading(false);
        saveAuth(auth_key);
        saveUserName(userName);
        saveUserType(userType);
        saveJWT(jwt);
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
        clearStorage();
      },
      readJWTcontext: () =>{
        readJWT();
      },
      getJobs: (jwt) => {
        sendJwtForJobs(jwt);
      },
    };
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  React.useEffect(() => {
    readAuth();
  }, []);


  if (isLoading) {
    return <Splash />;
  }


  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} userName={user} userType={userType} jwtToken={jwtToken}/>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};