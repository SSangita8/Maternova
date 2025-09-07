// import React, { useState, useContext } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import axios from 'axios';
// import { AuthContext } from '../context/authContext';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function LoginScreen({ navigation }) {
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [state, setState] = useContext(AuthContext);

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('/auth/login', { phone, password });
//       const { token, user } = response.data;
//       setState({ user, token });
//       await AsyncStorage.setItem('@auth', JSON.stringify(response.data));
//       alert('Login successful');
//       if (user.questionsAnswered) {
//         navigation.navigate('HomeScreen');
//       } else {
//         navigation.navigate('Question1');
//       }
//     } catch (error) {
//       console.error(error);
//       alert('Error logging in');
//     }
//   };

//   return (
//     <View style={styles.container}>
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
//       <Button title="Login" onPress={handleLogin} />
//       <Button title="Go to Signup" onPress={() => navigation.navigate('Signup')} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent:'center',
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
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await axios.post('/auth/login', { phone, password });
      const { token, user } = response.data;
      setState({ user, token });
      await AsyncStorage.setItem('@auth', JSON.stringify(response.data));
      alert('Login successful');
      if (user.questionsAnswered) {
        navigation.navigate('HomeScreen');
      } else {
        navigation.navigate('Question1');
      }
    } catch (error) {
      console.error(error);
      alert('Error logging in');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.halfPageContainer}></View>
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
      <View style={styles.button}>
        <Text style={styles.buttonText} onPress={handleLogin}>Login</Text>
      </View>
      <View style={styles.button}>
        <Text style={styles.buttonText} onPress={() => navigation.navigate('Signup')}>Go to Signup</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#e0f7fa', 
  },
  input: {
    height: 35,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 10,  
  },
  button: {
    backgroundColor: '#b2dfdb', 
    borderRadius: 10,  
    marginBottom: 10, 
    paddingVertical: 10,  
  },
  buttonText: {
    color: 'black', 
    textAlign: 'center', 
    fontWeight: 'bold',  
  },
});

