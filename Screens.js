import React, { useEffect, useState, useRef }  from "react";
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Image,ScrollView,  AppRegistry, TouchableWithoutFeedback, Keyboard } from "react-native";
import 'react-native-gesture-handler';
import { AuthContext } from "./context";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Camera } from 'expo-camera';

import styles from './styles'

const ScreenContainer = ({ children }, {TextInput}) => (
  <View style={styles.container}>{children}</View>
);








export const BarcodeScreen = ({ navigation }) => {  
  const [Barcode, setBarcode] = useState('');
  const [Output, setOutput] = useState('');
  const ref_input = useRef();
  const submitHandler = () => {
    setOutput(Barcode);
    setBarcode("")
    setTimeout(() => {
    ref_input.current.focus()
    if (!ref_input.current.isFocused){
      ref_input.current.focus()
    }
    }, 10);
    
   }

  return (
  React.useEffect(() => {

    const test = navigation.addListener('focus', () => {
      setTimeout(() => {
      ref_input.current.focus()
    }, 200);
    });

    return test;
  }, [navigation]),

    <ScreenContainer>
    <Text>{Output}</Text>
    <View style={styles.inputView2}>
      <TextInput
        autoFocus={true}
        clearTextOnFocus={true} 
        style={styles.inputText}
        placeholder="Barcode" 
        placeholderTextColor="#003f5c"
        onSubmitEditing={submitHandler} 
        onChangeText={(text) => setBarcode(text)}
        value={Barcode}
        ref={ref_input}
        showSoftInputOnFocus={false} />
   </View>

  </ScreenContainer>
)};


export const CameraScreen = ({ navigation }) => { 
  const [hasPermission, setHasPermission] = useState(null);
  const [photostate, setphotostate] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraInstance = useRef();
  const takePicture = async () => {
    if (cameraInstance) {
        const options = {quality: 1, base64: true};
        const data = await cameraInstance.current.takePictureAsync(options);
        setphotostate(data.uri);
    }
  };
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <ScreenContainer>
      <Camera style={styles.camera} type={type} ref={cameraInstance} ratio="1:1">
      </Camera>
      <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => takePicture()}>
            <Text style={styles.text}> Take Photo </Text>
          </TouchableOpacity>

        </View>
      <View style={styles.photo}>
          <Image style={{width: "auto", height:"50%", borderWidth: 1, borderColor: 'red'}} source={{uri: photostate}}/>
          </View>
          </ScreenContainer>
  );
}

export const Details = ({ route }) => (
  <ScreenContainer>
    <Text>Details Screen</Text>
    {route.params.name && <Text>{route.params.name}</Text>}
  </ScreenContainer>
);

export const Projects = ({ navigation }) => (
  <ScreenContainer>
    <Text>Projects</Text>
    <Button title="Go To Prospects" onPress={() => navigation.push('Prospects')} />
  </ScreenContainer>
);

export const Prospects= ({ navigation }) => (
  <ScreenContainer>
        <Text>Prospects</Text>
        <Button title="Go To Projects" onPress={() => navigation.push('Projects')} />
      </ScreenContainer>
);

export const Profile = ({ navigation }) => {
  const { signOut } = React.useContext(AuthContext);

  return (
    <ScreenContainer>
      <Text>Profile Screen</Text>
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
      <Button title="Sign Out" onPress={() => signOut()} />
    </ScreenContainer>
  );
};


export const JobsScreen = ({ navigation }) => {
  return (
    <ScreenContainer>
      <Text>Jobs Screen</Text>
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
    </ScreenContainer>
  );
};




export const Splash = () => (
  <ScreenContainer>
    <Text>Loading...</Text>
    <TextInput/>
  </ScreenContainer>
);





export const SignIn = ({ navigation }) => {
  const { signIn } = React.useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setuserType] = useState('');
  const [errorOutput, setError] = useState('');




  const getAuth = () => {
    let data = {
      method: 'POST',
      mode: "cors", // no-cors, cors, *same-origin *=default
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"username": email,"password": password,"user_type":userType})
    };
    return fetch('https://api-veen-e.ewipro.com/v1/authenticate/', data)
    .then((response) => {
        if(!response.ok) throw new Error(response.status);
        else return response.json();
      })
    .then((responseData) => {
       signIn(responseData.auth_key)
    })
    .catch((error) => {
      setError("Unable to log in," + error.toString());
    });
  }


  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{uri: 'https://calculator.ewipro.com/img/ewistorelogo.png'}}
      />
    <View style={styles.inputView} >
      <TextInput  
        style={styles.inputText}
        placeholder="Email..." 
        placeholderTextColor="#003f5c"
        onChangeText={text => setEmail(text)}/>
    </View>
    <View style={styles.inputView} >
      <TextInput  
        secureTextEntry
        style={styles.inputText}
        placeholder="Password..." 
        placeholderTextColor="#003f5c"
        onChangeText={text => setPassword(text)}/>
    </View>
    <View style={styles.inputView} >
      <TextInput  
        style={styles.inputText}
        placeholder="User type" 
        placeholderTextColor="#003f5c"
        onChangeText={text => setuserType(text)}/>
    </View>
    <TouchableOpacity>
    </TouchableOpacity>
    <TouchableOpacity style={styles.loginBtn} onPress={() => getAuth({navigation})}>
      <Text style={styles.loginText}>LOGIN</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.push('CreateAccount')}>
      <Text style={styles.loginText}>Signup</Text>
    </TouchableOpacity>
    <TouchableOpacity>
      <Text style={styles.errorText} >{errorOutput} </Text>
    </TouchableOpacity>


  </View>
  );
};

export const CreateAccount = () => {
  const { signUp } = React.useContext(AuthContext);

  return (
    <ScreenContainer>
      <Text>Create Account Screen</Text>
      <Button title="Sign Up" onPress={() => signUp()} />
    </ScreenContainer>
  );
};