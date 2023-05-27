import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper'

export default function Menu() {
    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <Text style={{fontSize: 30}}>Features are under development</Text>
            </View>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#CBE1FF',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});