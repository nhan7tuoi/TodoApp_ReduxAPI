import React, { useEffect, useState } from 'react';
import { Pressable, View, TextInput, StyleSheet, Text, Alert } from 'react-native';

const URL = 'https://650663f03a38daf4803e724d.mockapi.io/phamducnhan/Nhan';

export default function Screen1({ navigation }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(URL, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const user = data.find((user) => user.username === username && user.pass === password);
    if (user) {
      console.log('Login successful');
      navigation.navigate({
        name: 'Screen2',
        params: {
          user: user,
        },
      });
    //   console.log(user);
    } else {
      Alert.alert('Invalid Credentials', 'Please check your email and password.');
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setUsername(text)}
        value={username}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      <Pressable onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
    height: 40,
    marginVertical: 10,
    paddingLeft: 10,
  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db', // Màu nền button
  },
  buttonText: {
    color: '#fff', // Màu chữ button
  },
});
