import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React, {useState, useEffect} from 'react'
import firebase, { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native'


export default function HomeScreen() {
  const navigation = useNavigation(); 
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('books').onSnapshot(snapshot=>{
      const booksData = [];
      snapshot.forEach(doc => {
        booksData.push({ id: doc.id, ...doc.data()});
      });
      setBooks(booksData);
    })
      return () => unsubscribe()
  }, [])

  const handleDeleteBook = async (id) => {
    try {
      await firebase.firestore().collection('books').doc(id).delete();
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  const handleSignOut = () => {
    auth.signOut().then(() => {
        navigation.navigate("Login");
    }).catch(error => alert(error.message))
  }  

  const handleEditBook = (id, name, count, no) => {
    navigation.navigate('Edit', { id, name, count, no });
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.text}>{auth.currentUser?.email}</Text>
        <FlatList
        style={styles.flat} 
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.textItem}>Kitap Adı: {item.name}</Text>
            <Text style={styles.textItem}>Sayfa Sayısı: {item.count}</Text>
            <Text style={styles.textItem}>Kitap No: {item.no}</Text>

            <TouchableOpacity onPress={() => handleEditBook(item.id, item.name, item.count, item.no)}>
                <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteBook(item.id)}>
                <Text style={styles.deleteButton}>-</Text>
            </TouchableOpacity>
          </View>
        )}
      />
          <TouchableOpacity 
            onPress={handleSignOut}
            style={styles.button}>
            <Text style={styles.buttonText}>Çıkış Yap</Text>
          </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('Add')}
        >
        <Text style={styles.addButtonIcon}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'top',
        alignItems: 'center',

    },
    text:{
      fontSize: 25,
      fontWeight: 'bold',
      marginTop: 10,
    },
    textItem:{
      fontSize: 15,
    },
    flat:{
      alignitems: 'left',
      marginTop: 40,
    },
    item:{
      paddingLeft: 0,
      paddingHorizontal: 130,
    },
    button:{
        backgroundColor: 'blue',
        paddingHorizontal: 70,
        paddingVertical: 20,
        alignItems: 'center',
        borderRadius: 10,
        width: '100%',
        marginTop: 'auto',
        marginBottom: 20,
    },
    buttonText:{
        color: 'white',
        fontSize:16,
    },
    editButton:{
      fontSize: 16,
      color: 'blue',
      left: 190,
      bottom: 40,
    },
    deleteButton:{
      fontSize: 50,
      color: 'red',
      left: 230,
      bottom: 85,
    },
    addButton: {
      position: 'absolute',
      bottom: 100,
      right: 20,
      backgroundColor: 'blue',
      borderRadius: 50,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    addButtonIcon: {
      fontSize: 25,
      color: 'white',
    },
})