import { Button} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import NavBar from "./NavBar";

export default function Timer() {
    const [isStarted, setStart] = useState(false);
    const [reststart, setReststart] = useState(false);
    const [skey, setsKey] = useState(0);
    const [rkey, setrKey] = useState(1);
    const [studyTimer, setSTimer] = useState(0);
    const [rest, setRest] = useState(0);

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
        <>
        <NavBar/>
        <div style={{backgroundColor: '#F1F9FF'}}>
            <div>
        <div style={{marginBottom: 40, display: 'flex', alignItems:'center', justifyContent: 'center'}}>
            <h1>Study Timer</h1>
        </div>
        <div style={{ display:'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row'}}>
        <CountdownCircleTimer
            isPlaying={isStarted}
            size={400}
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
            <div style={{justifyContent:'center',
            alignItems: 'center'}}>
                <h2>Study</h2>
                <h2>{children({remainingTime})}</h2>
            </div>
            }
        </CountdownCircleTimer>
        <CountdownCircleTimer
            isPlaying={reststart}
            size={400}
            key={rkey}
            duration={rest}
            colors={['#F7B801', '#A30000', '#A30000', '#004777']}
            colorsTime={[7, 5, 2, 0]}
            onComplete ={() => {
                return {delay: studyTimer, shouldRepeat: true}
            }}
            >
            {({ remainingTime }) => 
            <div style={{justifyContent:'center',
            alignItems: 'center'}}>
            <h2>Rest</h2>
            <h2>{children({remainingTime})}</h2>
        </div>}
        </CountdownCircleTimer>
        </div>
        <div style={{justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: 70}}>
                <Button variant="outlined"
                onClick={() => {
                    setSTimer(0);
                    setRest(0);
                    setsKey((prevkey) => prevkey+2)
                    setrKey((prevkey => prevkey+2))
                }}
                style={{width:100}}>Reset</Button>
            <div>
                <Button variant="outlined"
                onClick={() => setStart(true) && setReststart(true)}
                style={{width: 100}}>Start</Button>
            </div>
        </div>
            <div style={{justifyContent:'center', display: 'flex',
        alignItems: 'center'}}>
            <div style={{alignItems: 'center', display: 'flex',
        justifyContent: 'flex-start',
        margin: 20}}>
        <div style={{ display: 'flex', flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20}}>
            <h1 style={{fontSize:30, marginBottom: 20}}>Create Timer</h1>
            <div style={{justifyContent: 'center', display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: 20}}>
                <Button variant="outlined" onClick={() => {
                setSTimer(25 * 60);
                setRest(5 * 60);
                setStart(false);
                setReststart(false);
            }} style={{width: 200}}>Pomodoro Timer</Button>
            </div>
            </div>
            </div>
        </div>
        </div>
        </div>
        </>
    )
}