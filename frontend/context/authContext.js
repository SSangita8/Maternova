import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Create context
const AuthContext = createContext();

// Provider component
const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    token: "",
  });

  let token = state && state.token;

  // Default axios setting
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axios.defaults.baseURL = "http:/192.168.1.6:5000"; // Update with your server URL

  // Initial local storage data
  useEffect(() => {
    const loadLocalStorageData = async () => {
      let data = await AsyncStorage.getItem("@auth");
      if (data) {
        let loginData = JSON.parse(data);
        setState({ ...state, user: loginData?.user, token: loginData?.token });
      }
    };
    loadLocalStorageData();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem("@auth");
    setState({ user: null, token: "" });
  };

  return (
    <AuthContext.Provider value={[state, setState, logout]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
