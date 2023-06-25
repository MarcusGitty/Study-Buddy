import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { Text, Button, ActivityIndicator, TextInput } from "react-native-paper"
import { StyleSheet, Image, View } from "react-native";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { Link, Stack } from "expo-router";

export default function Login() {
    return (
        <SafeAreaProvider>
            <Stack.Screen
                options={{
                    headerTitle:"Sign In"
                }}
            />
            <SafeAreaView style={styles.container}>
                <Logo />
                <Text style={{fontSize:34}}>Sign In</Text>
                <SignIn />
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

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const submit = async () => {
        setErrMsg('');
        if (email=== '') {
            setErrMsg("Email cannot be empty");
        }
        if (password === '') {
            setErrMsg("Password cannot be empty");
        }
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        setLoading(false);
        if (error) {
            setErrMsg(error.message);
            return;
        }
    }
    return (
        <SafeAreaView>
            <Text style={{fontSize: 20}}>Email</Text>
            <TextInput 
                style={styles.textInContainer}
                mode='outlined'
                autoCapitalize="none"
                textContentType="emailAddress"
                value={email}
                onChangeText={setEmail} />
            <Text style={{fontSize: 20}}>Password</Text>
            <TextInput
                style={styles.textInContainer}
                mode='outlined'
                secureTextEntry
                autoCapitalize="none"
                textContentType="password"
                value={password}
                onChangeText={setPassword} />
            <Button mode="contained" onPress={submit} style={{margin: 15, backgroundColor:'#3F5DFF'}}>Submit</Button>
            {errMsg !== "" && <Text>{errMsg}</Text>}
            {loading && <ActivityIndicator />}
            <Link href="/Sign-Up">
                <Button>Sign Up</Button>
            </Link>
        </SafeAreaView>
    )
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