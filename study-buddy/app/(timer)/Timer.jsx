import { View, StyleSheet, Alert, TouchableOpacity, ScrollView, Keyboard} from "react-native"
import { Button, Text, TextInput } from "react-native-paper"
import { Link } from "expo-router"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { useState } from "react";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

export default function Timer() {
    const [mm, setMinutes] = useState('');
    const [rmm, setRmm] = useState('')
    const [isStarted, setStart] = useState(false);
    const [reststart, setReststart] = useState(false);
    const [skey, setsKey] = useState(0);
    const [rkey, setrKey] = useState(1);
    const [studyTimer, setSTimer] = useState(0);
    const [rest, setRest] = useState(0);

    var timeinss = Number(mm) * 60;
    var restinss = Number(rmm) * 60

    var totalTime = 0;

    const children = ({ remainingTime }) => {
        const hours = Math.floor(remainingTime / 3600)
        const minutes = Math.floor((remainingTime % 3600) / 60)
        const seconds = remainingTime % 60

        let hour = ''
        let minute = ''
        let second = ''

        if (hours < 10) {
            hour = '0' + hours.toString()
        } else {
            hour = hours.toString();
        }

        if (minutes < 10) {
            minute = '0' + minutes.toString()
        } else {
            minute = minutes.toString()
        }

        if (seconds < 10) {
            second = '0' + seconds.toString()
        } else {
            second = seconds.toString()
        }
        return hour + ' : ' + minute +' : ' + second 
      }

    return (
        <SafeAreaProvider style={{backgroundColor: '#F1F9FF'}}>
            <SafeAreaView>
        <Link href="/">
            <Button>Back</Button>
        </Link>
        <View style={[styles.title, {marginBottom: 40}]}>
            <Text style={styles.text}>Study Timer</Text>
        </View>
        <View style={[styles.timer, {justifyContent: 'space-evenly'}]}>
        <CountdownCircleTimer
            isPlaying={isStarted}
            size={150}
            key={skey}
            duration={studyTimer}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            onComplete ={() => {
                setReststart(true);
                return {delay: rest, shouldRepeat: true}
            }}
            >
            {({ remainingTime }) => 
            <View style={styles.title}>
                <Text>Study</Text>
                <Text>{children({remainingTime})}</Text>
            </View>
            }
        </CountdownCircleTimer>
        <CountdownCircleTimer
            isPlaying={reststart}
            size={150}
            key={rkey}
            duration={rest}
            colors={['#F7B801', '#A30000', '#A30000', '#004777']}
            colorsTime={[7, 5, 2, 0]}
            onComplete ={() => {
                return {delay: studyTimer, shouldRepeat: true}
            }}
            >
            {({ remainingTime }) => 
            <View style={styles.title}>
            <Text>Rest</Text>
            <Text>{children({remainingTime})}</Text>
        </View>}
        </CountdownCircleTimer>
        </View>
        <View style={styles.buttons}>
            <TouchableOpacity onPress={() => {
                setSTimer(0);
                setRest(0);
                setsKey((prevkey) => prevkey+2)
                setrKey((prevkey => prevkey+2))
            }} style={styles.buttons}>
                <Button mode="contained-tonal" style={{width:100}}>Cancel</Button>
            </TouchableOpacity>
            <View>
            <TouchableOpacity onPress={() => setStart(true) && setReststart(true)} style={styles.buttons}>
                <Button mode="contained-tonal" style={{width: 100}}>Start</Button>
            </TouchableOpacity>
            </View>
        </View>
            <View style={styles.title}>
            <View style={styles.item}>
            <Text style={{fontSize:20, marginBottom: 20}}>Create Timer</Text>
                <View style={styles.time}>
                <Text style={{fontSize:18}}>Study Time : </Text>
                <TextInput placeholder="mm"
                value={mm}
                keyboardType="numeric"
                mode="outlined"
                style={{height:30}}
                onChangeText={
                    (text) => setMinutes(text)
                    }
                />
                <Text style={{fontSize:18}}> Minutes </Text>
                </View>
                <View style={styles.time}>
                <Text style={{fontSize:20}}>Rest Time : </Text>
                <TextInput placeholder="mm"
                value={rmm}
                keyboardType="numeric"
                maxLength={2}
                mode="outlined"
                style={{height:30}}
                onChangeText={
                    (text) => setRmm(text)
                    }
                />
                <Text style={{fontSize:20}}> Minutes </Text>
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity onPress={() => {
                Keyboard.dismiss;
                setSTimer(timeinss);
                setRest(restinss);
                setStart(false);
                setReststart(false);
                setMinutes("")
                setRmm("")
            }}>
                <Button mode="contained-tonal" style={{width: 200}}>Set Timer</Button>
            </TouchableOpacity>
            </View>
            <View style={styles.buttons}>
                <TouchableOpacity onPress={() => {
                setSTimer(25 * 60);
                setRest(5 * 60);
                setStart(false);
                setReststart(false);
            }}>
                <Button mode="contained-tonal" style={{width: 200}}>Pomodoro Timer</Button>
            </TouchableOpacity>
            </View>
            </View>
            </View>
        </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    title: {
        justifyContent:'center',
        alignItems: 'center'
    },
    text: {
        fontSize:26
    },
    timer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttons: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 20
    },
    time: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    item: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: 20,
    }
})