import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { Text, Button, ActivityIndicator, TextInput } from "react-native-paper"
import { StyleSheet, Image, View } from "react-native";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { Stack } from "expo-router";

export default function signUp() {
    return (
        <SafeAreaProvider>
            <Stack.Screen
                options={{
                    headerTitle:"Sign Up"
                }}
            />
            <SafeAreaView style={styles.container}>
                <Logo />
                <Text style={{fontSize:34}}>Sign Up</Text>
                <Register />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

function Logo() {
    return (
      <View>
        <Image source={require('./icon.png')} />
      </View>
    )
}

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const submit = async () => {
        if (email == '') {
            setErrMsg("Email cannot be empty")
            return;
        }
        if (password == '') {
            setErrMsg("Password cannot be empty")
            return;
        }
        setLoading(true);
        const { error } = await supabase.auth.signUp({ email, password });
        setLoading(false);
        if (error) {
            setErrMsg(error.message);
            return;
        }
    }

    return (
        <View>
            <Text style={{fontSize: 20}}>Email</Text>
            <TextInput
                style={styles.textInContainer}
                mode='outlined'
                autoCapitalize='none'
                textContentType='emailAddress'
                value={email}
                onChangeText={setEmail} />
            <Text style={{fontSize: 20}}>Password</Text>
            <TextInput
                style={styles.textInContainer}
                mode='outlined'
                secureTextEntry
                autoCapitalize='none'
                textContentType='password'
                value={password}
                onChangeText={setPassword} />
            <Button mode='contained' onPress={submit} style={{margin: 15, backgroundColor:'#3F5DFF'}}>Submit</Button>
            {errMsg !== "" && <Text>{errMsg}</Text>}
            {loading && <ActivityIndicator />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#CBE1FF',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInContainer: {
        maxWidth: '90%',
        minWidth: '90%',
        justifyContent: 'center',
    }
});