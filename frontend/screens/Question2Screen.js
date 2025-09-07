// import React, { useContext, useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import { HealthContext } from '../context/HealthContext';

// export default function Question2Screen({ navigation }) {
//   const [healthData, setHealthData] = useContext(HealthContext);
//   const [liveBirth, setLiveBirth] = useState(healthData.liveBirth || '');

//   const handleNext = () => {
//     setHealthData({ ...healthData, liveBirth });
//     navigation.navigate('Question3');
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Number of live births:</Text>
//       <TextInput
//         value={liveBirth}
//         onChangeText={setLiveBirth}
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
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { HealthContext } from '../context/HealthContext';

export default function Question2Screen({ navigation }) {
  const [healthData, setHealthData] = useContext(HealthContext);
  const [liveBirth, setLiveBirth] = useState(healthData.liveBirth || '');

  const handleNext = () => {
    setHealthData({ ...healthData, liveBirth });
    navigation.navigate('Question3');
  };

  return (
    <View style={styles.container}>
      <Text>Number of live births:</Text>
      <TextInput
        value={liveBirth}
        onChangeText={setLiveBirth}
        keyboardType="numeric"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f7e09c',  // Pastel yellow/mustard yellow background color
  },
  input: {
    height: 35,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 10,  // Rounds the edges of the input box
    backgroundColor: 'white',  // Optional: Set a white background to input for contrast
  },
  button: {
    backgroundColor: '#b2dfdb',  // Pastel green background for the button
    borderRadius: 10,  // Rounds the edges of the button
    paddingVertical: 10,  // Adjusts the vertical padding
    alignItems: 'center',  // Centers the text within the button
    marginTop: 10,
    borderColor: 'gray',  // Color of the button border
    borderWidth: 2, 
  },
  buttonText: {
    color: 'black',  // Sets the text color on the button to black
    fontWeight: 'bold',  // Makes the text a bit bolder
  },
});
