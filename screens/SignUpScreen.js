import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native'

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const navigation = useNavigation();

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Kayıt başarılı!');
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('Kayıt olma hatası:', error);
      });
  };

  const returnLogin = () => {
    navigation.navigate('Login');
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="İsim"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Soyisim"
          value={surname}
          onChangeText={(text) => setSurname(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Kullanıcı Adı"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={returnLogin} style={styles.buttonReturn}>
          <Text style={styles.buttonReturnText}>Zaten Hesabım Var</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
    borderRadius: 10,
  },
  buttonContainer: {
    width: '50%',
    marginTop: 40,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonReturn: {
    alignItems: 'center',
    margin: 5,
  },
  buttonReturnText: {
    color: 'blue',
    fontSize: 16,
  },
});
