import React from "react";
import { StyleSheet } from "react-native";
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5
  },
  inputView: {
    width: "80%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 5,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputView2: {
    backgroundColor: "#eee",
    borderRadius: 5,
    width: 0,
    height: 0,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    opacity: 0
  },
  inputText: {
    height: 50,
    color: "#333"
  },
  inputText2: {
    width: 0,
    height: 0
  },
  errorText: {
    height: 50,
    color: "#f00"
  },
  loginBtn: {
    width: "80%",
    maxWidth: 400,
    backgroundColor: "#0078d7",
    color: "#fff",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10
  },
  loginText: {
     color: "#fff",
     fontWeight: "bold" 
    },
  logo: {
    width: 200,
    height: 60,
    marginBottom: 50,
  },
  camera: {
    flex: 1,
    width: "100%",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  photo: {
    flex: 1,
    width: "100%",
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
  menuIcon: {
    marginLeft: 10,
  },
  barcodeIcon: {
    marginRight: 20,
  },
});