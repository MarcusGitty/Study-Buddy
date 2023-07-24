import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper'
import { useRouter } from 'expo-router';
import { Icon } from 'react-native-elements';
import Insight from './Insight';

export default function Menu() {
    return (
        <SafeAreaProvider style={styles.container}>
            <SafeAreaView style={styles.welcomebox}>
                <Text data-testID='welcome' style={styles.text}>Welcome Back to </Text>
                <Text style={styles.text}>Study Buddy!</Text>
            </SafeAreaView>
            <SafeAreaView data-testID='menu' style={styles.menuTitle}>
                <Text style={{fontSize:25, marginLeft:10}}>Menu</Text>
                <View style={styles.menu}>
                <Todo />
                <Time />
                <Reminder />
            </View>
            </SafeAreaView>
            
        </SafeAreaProvider>
    )
}

export function Todo() {
    const router = useRouter();
    return (
        <View data-testID='todo'>
        <TouchableOpacity
            onPress={() => router.push("/ToDo")}
            style={styles.menubutton}
            activeOpacity={0.5}>
              <Icon
                name='reader-outline'
                type='ionicon'
                color='#517fa4'
                iconProps={{size:30}}
                style={styles.buttonImageIconStyle}
              />
              <Text style={styles.buttonTextStyle}>
                To Do List
              </Text>
        </TouchableOpacity>
        </View>
    )
}

export function Time() {
    const router = useRouter();
    return (
        <View data-testID='timer'>
        <TouchableOpacity
            onPress={() => router.push("/Timer")}
            style={styles.menubutton}
            activeOpacity={0.5}>
              <Icon
                name='timer-outline'
                type='ionicon'
                color='#517fa4'
                iconProps={{size:30}}
                style={styles.buttonImageIconStyle}
              />
              <Text style={styles.buttonTextStyle}>
                Study Timer
              </Text>
        </TouchableOpacity>
        </View>
    )
}

export function Reminder() {
  const router = useRouter();
    return (
        <View data-testID='reminder'>
        <TouchableOpacity
            onPress={() => router.push("/Reminder")}
            style={styles.menubutton}
            activeOpacity={0.5}>
              <Icon
                name='alarm-outline'
                type='ionicon'
                color='#517fa4'
                iconProps={{size:30}}
                style={styles.buttonImageIconStyle}
              />
              <Text style={styles.buttonTextStyle}>
                Reminder
              </Text>
        </TouchableOpacity>
        </View>
    )
}

export function ProgressTracker() {
  const router = useRouter();
    return (
        <View data-testID='progress'>
        <TouchableOpacity
          onPress={() => router.push("/Progress")}
            style={styles.menubutton}
            activeOpacity={0.5}>
              <Icon
                name='bar-chart-outline'
                type='ionicon'
                color='#517fa4'
                iconProps={{size:30}}
                style={styles.buttonImageIconStyle}
              />
              <Text style={styles.buttonTextStyle}>
                Progress Tracker
              </Text>
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F1F9FF',
    },
    welcomebox: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#517fa4',
        backgroundColor: '#517fa4',
        margin: 20,
        padding: 15
    },
    menuTitle: {
        justifyContent: 'flex-start',
        margin: 20
    },
    text: {
        fontSize: 35, 
        margin: 10, 
        color: 'white',
        alignItems: 'center'
    },
    menu : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    menubutton: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    buttonTextStyle: {
        color: '#000',
      },
    buttonImageIconStyle: {
        marginVertical:10
      }
});