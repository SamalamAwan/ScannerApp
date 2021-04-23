import React, { useEffect, useState, useRef }  from "react";
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Image,ScrollView,  AppRegistry, TouchableWithoutFeedback, Keyboard } from "react-native";
import 'react-native-gesture-handler';
import { AuthContext } from "./context";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Camera } from 'expo-camera';
import AsyncStorage from '@react-native-community/async-storage'
import styles from './styles'
import { RadioButton } from 'react-native-paper';


const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);


const Toggle = (props) => {
  const [colour, setColour] = useState('#0078d7');
  const [colour2, setColour2] = useState('#fff');
  const [colour3, setColour3] = useState('#fff');
  const [fontColour, setFontColour] = useState('#fff');
  const [fontColour2, setFontColour2] = useState('#333');
  const [fontColour3, setFontColour3] = useState('#333');
  let style = StyleSheet.create({
    button1: {
      backgroundColor: colour,
      flex:3.33,
      alignItems:'center',
      marginLeft:5,
      marginRight:5,
      borderRadius:5,
    },
    label1:{
      color: fontColour,
      textAlign: "right",
    },
    button2: {
      backgroundColor: colour2,
      color: fontColour2,
      flex:3.33,
      alignItems:'center',
      marginLeft:5,
      marginRight:5,
      borderRadius:5,
    },
    label2:{
      color: fontColour2,
      textAlign: "right",
    },
    button3: {
      backgroundColor: colour3,
      color: fontColour3,
      flex:3.33,
      alignItems:'center',
      marginLeft:5,
      marginRight:5,
      borderRadius:5,
    },
    label3:{
      color: fontColour3,
      textAlign: "right",
    },
  })
  const handleChange = (newValue) => {
    props.handleChange(newValue)
    if (newValue == 1){
      setColour('#0078d7')
      setColour2('#fff')
      setColour3('#fff')
      setFontColour('#fff')
      setFontColour2('#333')
      setFontColour3('#333')
    }
    if (newValue == 2){
      setColour('#fff')
      setColour2('#0078d7')
      setColour3('#fff')
      setFontColour('#333')
      setFontColour2('#fff')
      setFontColour3('#333')
    }
    if (newValue == 3){
      setColour('#fff')
      setColour2('#fff')
      setColour3('#0078d7')
      setFontColour('#333')
      setFontColour2('#333')
      setFontColour3('#fff')
    }
  }
  return (
    <RadioButton.Group onValueChange={newValue => handleChange(newValue)} value={props.value} style={{width:450}}>
      <View style={{flexDirection:"row",alignItems:'center'}}>

        <RadioButton.Item label="Manager" labelStyle={style.label1} color="#fff" style={style.button1}  value="1" />

        <RadioButton.Item label="Packer"  labelStyle={style.label2} color="#fff"   style={style.button2} value="2"/>

        <RadioButton.Item label="Driver"  labelStyle={style.label3} color="#fff"   style={style.button3}  value="3" />

      </View>
    </RadioButton.Group>
  );
};





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


export const JobsScreen = ({ navigation, route }) => {
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


  const [value, setValue] = React.useState('1');
  const handleChange = (newValue) => {
    setValue(newValue)
    setuserType(newValue)
  }

  const getAuth = () => {
    let data = {
      method: 'POST',
      mode: "cors", // no-cors, cors, *same-origin *=default
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"username": email,"password": password,"updateAuth":false,"user_type":userType})
    };
    return fetch('https://api-veen-e.ewipro.com/v1/authenticate/', data)
    .then((response) => {
        if(!response.ok) throw new Error(response.status);
        else return response.json();
      })
    .then((responseData) => {
       signIn(responseData.auth_key, responseData.username, userType, responseData.jwt);
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
        placeholder="Username..." 
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
      <Toggle handleChange={handleChange} value={value}/>
    <TouchableOpacity style={styles.loginBtn} onPress={() => getAuth({navigation})}>
      <Text style={styles.loginText}>LOGIN</Text>
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