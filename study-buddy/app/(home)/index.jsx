import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, Button } from 'react-native-paper'
import { supabase } from '../../lib/supabase';

export default function homePage() {
    return (
        <SafeAreaProvider>
                <SignOut />
                <View style={styles.container}>
                    <Text style={styles.textStyle}>Welcome to</Text>
                    <Text style={styles.textStyle}>Study Buddy!</Text>
                </View>
        </SafeAreaProvider>   
    );
}

function SignOut() {
    return (
        <View style={styles.header}>
            <Button 
                mode='contained-tonal'
                style={{margin: '3%'}}
                onPress={() => supabase.auth.signOut()}>
                    Sign Out
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#CBE1FF',
        flex: 9,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        backgroundColor: '#3F5DFF',
        alignItems: 'flex-end',
        flex: 1
    },
    welcome: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});