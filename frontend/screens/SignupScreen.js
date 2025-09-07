// // screens/SignupScreen.js
// import React, { useState, useContext } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
// import axios from 'axios';
// import { AuthContext } from '../context/authContext';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Ionicons } from '@expo/vector-icons';

// export default function SignupScreen({ navigation }) {
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [dob, setDob] = useState(new Date());
//   const [dobText, setDobText] = useState('');
//   const [showPicker, setShowPicker] = useState(false);
//   const [state, setState] = useContext(AuthContext);

//   const handleSignup = async () => {
//     try {
//       await axios.post('/auth/signup', { name, phone, password, dob });
//       alert('User registered successfully');
//       navigation.navigate('Login');
//     } catch (error) {
//       console.error(error);
//       alert('Error registering user');
//     }
//   };

//   const onDateChange = (event, selectedDate) => {
//     const currentDate = selectedDate || dob;
//     setShowPicker(false);
//     setDob(currentDate);
//     setDobText(currentDate.toISOString().split('T')[0]); // Format date as YYYY-MM-DD
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         placeholder="Name"
//         value={name}
//         onChangeText={setName}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Phone"
//         value={phone}
//         onChangeText={setPhone}
//         style={styles.input}
//         keyboardType="phone-pad"
//       />
//       <TextInput
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         style={styles.input}
//         secureTextEntry
//       />
//       <View style={styles.datePickerContainer}>
//         <TextInput
//           placeholder="Date of Birth"
//           value={dobText}
//           style={styles.dateInput}
//           editable={false}
//         />
//         <TouchableOpacity onPress={() => setShowPicker(true)}>
//           <Ionicons name="calendar" size={24} color="black" style={styles.icon} />
//         </TouchableOpacity>
//       </View>
//       {showPicker && (
//         <DateTimePicker
//           value={dob}
//           mode="date"
//           display="default"
//           onChange={onDateChange}
//         />
//       )}
//       <Button title="Signup" onPress={handleSignup} />
//       <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
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
//   datePickerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   dateInput: {
//     height: 35,
//     borderColor: 'gray',
//     borderWidth: 1,
//     paddingLeft: 8,
//     flex: 1,
//   },
//   icon: {
//     marginLeft: 8,
//   },
// });
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState(new Date());
  const [dobText, setDobText] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [state, setState] = useContext(AuthContext);

  const handleSignup = async () => {
    if (!name || !phone || !password || !dobText) {
      alert('All fields are required');
      return;
    }
    try {
      await axios.post('/auth/signup', { name, phone, password, dob });
      alert('User registered successfully');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Response data:', error.response.data);  // Log full response from the server
      alert(`Error: ${error.response.data || 'Error registering user'}`);
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowPicker(false);
    setDob(currentDate);
    setDobText(currentDate.toISOString().split('T')[0]); // Format date as YYYY-MM-DD
  };

  return (
    <View style={styles.container}>
      <View style={styles.halfPageContainer}></View>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        keyboardType="phone-pad"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <View style={styles.datePickerContainer}>
        <TextInput
          placeholder="Date of Birth"
          value={dobText}
          style={styles.dateInput}
          editable={false}
        />
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <Ionicons name="calendar" size={24} color="black" style={styles.icon} />
        </TouchableOpacity>
      </View>
      {showPicker && (
        <DateTimePicker
          value={dob}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
      <View style={styles.button}>
        <Text style={styles.buttonText} onPress={handleSignup}>Signup</Text>
      </View>
      <View style={styles.button}>
        <Text style={styles.buttonText} onPress={() => navigation.navigate('Login')}>Go to Login</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#e0f7fa',  // Optional: A subtle background color for the whole screen.
  },
  input: {
    height: 35,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 10,  // Rounds off the edges of the inputs
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateInput: {
    height: 35,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    flex: 1,
    borderRadius: 10,  // Rounds off the edges of the date input
  },
  icon: {
    marginLeft: 8,
  },
  button: {
    backgroundColor: '#b2dfdb',  // Pastel green color for the buttons
    borderRadius: 10,  // Rounds off the edges of the buttons
    marginBottom: 10,  // Adds some space between the buttons
    paddingVertical: 10,  // Makes the button height a bit larger
  },
  buttonText: {
    color: 'black',  // Sets the text color on the buttons to black
    textAlign: 'center',  // Centers the text on the buttons
    fontWeight: 'bold',  // Makes the text a bit bolder
  },
});
