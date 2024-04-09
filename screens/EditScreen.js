// EditScreen.js

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import firebase from '../firebase';

export default function EditScreen({ route, navigation }) {
  const { id, name: initialName, count: initialCount, no: initialNo } = route.params;

  const [name, setName] = useState(initialName);
  const [count, setCount] = useState(initialCount.toString());
  const [no, setNo] = useState(initialNo.toString());

  const handleEditBook = async () => {
    try {
      await firebase.firestore().collection('books').doc(id).update({
        name,
        count: parseInt(count),
        no: parseInt(no)
      });
      navigation.goBack();
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Kitap Adı"
      />
      <TextInput
        style={styles.input}
        value={count}
        onChangeText={setCount}
        placeholder="Sayfa Sayısı"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={no}
        onChangeText={setNo}
        placeholder="Kitap No"
        keyboardType="numeric"
      />
      <Button onPress={handleEditBook} title="Düzenle" />
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
