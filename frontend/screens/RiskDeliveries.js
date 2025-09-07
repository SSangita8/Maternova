// import React, { useContext, useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import { HealthContext } from '../context/HealthContext';

// export default function riskNumConceived({ navigation }) {
//   const [healthData, setHealthData] = useContext(HealthContext);
//   const [deliveries, setDeliveries] = useState(healthData.deliveries || '');

//   const handleNext = () => {
//     setHealthData({ ...healthData, deliveries });
//     navigation.navigate('riskLiveBirth');
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Number of deliveries:</Text>
//       <TextInput
//         value={deliveries}
//         onChangeText={setDeliveries}
//         keyboardType="numeric"
//         style={styles.input}
//       />
//       <Button title="Next" onPress={handleNext} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   input: {
//     height: 35,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 12,
//     paddingLeft: 8,
//   },
// });

import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { HealthContext } from "../context/HealthContext";
import { AuthContext } from "../context/authContext";
import axios from "axios";

export default function RiskDeliveries({ navigation }) {
  const [healthData, setHealthData] = useContext(HealthContext);
  const [state] = useContext(AuthContext);
  const [deliveries, setDeliveries] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("/ques/details", {
          headers: { Authorization: `Bearer ${state.token}` },
        });
        const user = response.data;
        setHealthData({
          ...healthData,
          deliveries: user.deliveries.toString(),
        });
        setDeliveries(user.deliveries.toString());
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, []);

  const handleNext = () => {
    setHealthData({ ...healthData, deliveries });
    navigation.navigate("RiskLiveBirth");
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.headerText}>
          Enter values from{" "}
          <Text style={styles.headerTextBold}>your report</Text>
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.labelText}>Number of deliveries:</Text>
        <TextInput
          value={deliveries}
          onChangeText={setDeliveries}
          keyboardType="numeric"
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe", // Light background color for the whole page
  },
  topContainer: {
    height: "35%", // Take up the top part of the screen
    backgroundColor: "#fcd8df", // Pastel pink color
    borderBottomLeftRadius: 40, // Curved bottom edges
    borderBottomRightRadius: 40, // Curved bottom edges
    justifyContent: "center", // Center the text vertically
    alignItems: "center", // Center the text horizontally
    paddingHorizontal: 20, // Padding for the text
  },
  headerText: {
    fontSize: 35,
    color: "#333",
    textAlign: "center",
  },
  headerTextBold: {
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    marginBottom: 200,
  },
  labelText: {
    marginBottom: 8,
    color: "#555",
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 20, // Rounded edges for the input
    backgroundColor: "#fff", // White background for input
    shadowColor: "#000", // Shadow for input box
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, // Android shadow effect
  },
  button: {
    backgroundColor: "#a0d468", // Green color for the button
    borderRadius: 20, // Rounded edges for the button
    paddingVertical: 10,
    alignItems: "center",
    shadowColor: "#000", // Shadow for button
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, // Android shadow effect
  },
  buttonText: {
    color: "#000", // Black text color for the button
    fontWeight: "bold",
  },
});
