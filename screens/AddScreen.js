import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import firebase from '../firebase';
import { useNavigation } from '@react-navigation/native';

export default function AddScreen() {
  const navigation = useNavigation();
  const [bookName, setBookName] = useState('');
  const [bookCount, setBookCount] = useState('');
  const [bookId, setBookId] = useState('');

  const handleAddBook = async () => {
    if (bookName && bookCount && bookId) {
      await firebase.firestore().collection('books').add({
        name: bookName,
        no: parseInt(bookId),
        count: parseInt(bookCount),
      });
      setBookName('');
      setBookCount('');
      setBookId('');
    }
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={bookName}
        onChangeText={setBookName}
        placeholder="Kitap Adı"
      />
      <TextInput
        style={styles.input}
        value={bookId}
        onChangeText={setBookId}
        placeholder="Kitap Numarası"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={bookCount}
        onChangeText={setBookCount}
        placeholder="Sayfa Sayısı"
        keyboardType="numeric"
      />
      <Button onPress={handleAddBook} title="Ekle" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
});
