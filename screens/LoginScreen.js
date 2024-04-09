import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native'

export default function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setEmail('');
            setPassword('');
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(user){
                navigation.navigate('Home');
            }
        })
    },[])

    const handleSignUp = () => {
            navigation.navigate('SignUp');
    }

    const handleLogin = () => {
        auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredentials) => {
            const user = userCredentials.user;
            console.log('Kullanıcı Giriş Yaptı', user.email)
            navigation.navigate('Home');
        })
        .catch(error => alert(error.message));
    }

  return (
    <KeyboardAvoidingView style={styles.container}> 
        <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Email" 
            value={email} 
            onChangeText={text => setEmail(text)}/>
            <TextInput style={styles.input} placeholder="Şifre" 
            value={password} 
            onChangeText={text => setPassword(text)} 
            secureTextEntry/>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity 
                onPress={handleLogin} 
                style={styles.button}>
                <Text style={styles.buttonText}>Giriş Yap</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={handleSignUp}
                style={[styles.button, 
                styles.outlineButton]}>
                <Text style={styles.outlineButtonText}>Kayıt Ol</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer:{
        width: '80%',
    },
    input:{
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 5,
        borderRadius: 10,
    },
    buttonContainer:{
        width: '50%',
        marginTop: 40,
    },
    button:{
        backgroundColor: 'blue',
        padding: 15,
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText:{
        color: 'white',
        fontSize:16,
        
    },
    outlineButton:{
        backgroundColor: 'white',
        marginTop: 5,
    },
    outlineButtonText:{
        color: 'blue',
        fontSize:16,
       
    }
})