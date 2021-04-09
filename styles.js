import React from "react";
import {StyleSheet} from "react-native";
export default styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0078D7',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginVertical: 10,
      borderRadius: 5
    },
    inputView:{
      width:"80%",
      backgroundColor:"#eee",
      borderRadius:25,
      height:50,
      marginBottom:20,
      justifyContent:"center",
      padding:20
    },
    inputView2:{
      backgroundColor:"#eee",
      borderRadius:25,
      width: 0,
      height: 0,
      marginBottom:20,
      justifyContent:"center",
      padding:20,
      opacity:0
    },
    inputText:{
      height:50,
      color:"#333"
    },
    inputText2:{
      width: 0,
      height: 0
    },
    errorText:{
      height:50,
      color:"#f00"
    },
     loginBtn:{
      width:"80%",
      backgroundColor:"#fb5b5a",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:40,
      marginBottom:10
    },
    logo:{
      width: 200,
       height: 60
    },
    camera: {
      flex: 1,
      width:"100%",
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    photo: {
      flex: 1,
      width:"100%",
      justifyContent: 'flex-end',
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
    iconStyle: {
      marginLeft: 50,
    },
  });