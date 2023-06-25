import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text } from 'react-native-paper'
import { Link, useRouter } from 'expo-router';

export default function Calendar() {
    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                
            </View>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F1F9FF',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    menubutton: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#BFD4E5',
        borderWidth: 0.5,
        minHeight: '40%',
        maxHeight: '40%',
        minWidth: '40%',
        maxWidth: '40%',
        borderColor: '#fff',
        borderRadius: 5,
        margin: 5
    },
    buttonTextStyle: {
        color: '#000',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
      },
    buttonImageIconStyle: {
        padding: 10,
        margin: 0,
        width: 75,
        height: 75,
        borderRadius: 75/2,
        flex: 1,
        resizeMode: 'stretch',
      }
});