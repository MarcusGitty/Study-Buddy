import { ActivityIndicator, Button, Text, TextInput } from "react-native-paper"
import { Link, useRouter } from "expo-router"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native"
import { supabase } from "../../lib/supabase"
import { useState } from "react"
import { useAuth } from "../../contexts/auth"
import { Icon } from "react-native-elements"
import DateTimePicker from '@react-native-community/datetimepicker'
import { NewCalendarList } from "react-native-calendars"
import { Platform, Pressable } from "react-native"

export default function AddTask() {
  const currdate = new Date()
  const [assignment, setAssignment] = useState('');
  const [course, setCourse] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [formatTime, setFTime] = useState(currdate.getHours() + ":" + currdate.getMinutes() + ":" + '00')
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [formatDate, setFDate] = useState(date.toDateString())
  const [showPicker, setShowPicker] = useState(false);
  const [showtimePicker, settimePicker] = useState(false);

  const { user } = useAuth();
  const router = useRouter();

  const picker = () => {
      setShowPicker(!showPicker);
  }

  const timepicker = () => {
      settimePicker(!showtimePicker);
  }

  const changeDate = ({type}, selectedDate) => {
      if (type == "set") {
        const duedate = selectedDate;
        setDate(duedate);
        setFDate(duedate.toDateString())
        console.log(date)
        if (Platform.OS === "android") {
          picker();
        }
      } else {
          picker();
      }
  }
  
  const changeTime = ({type}, selectedTime) => {
      if (type == "set") {
        const duetime = selectedTime;
        setTime(duetime);
        setFTime(duetime.getHours() + ":" + duetime.getMinutes() + ":" + "00");
        console.log(time);
        if (Platform.OS === "android") {
          timepicker();
        }
      } else {
          timepicker();
      }
  }


  const handleSubmit = async () => {
    if (assignment === '') {
        setErrMsg('task cannot be empty');
        return;
    }

    setLoading(true);
    const { error } = await supabase
      .from('AssignmentTracker')
        .insert({assignment:assignment, module:course, due_time:formatTime, Deadline:date, user_id: user.id})
        .select()
        .single();
    setLoading(false);
    
    if(error != null) {
      setErrMsg(error.message);
      return Alert.alert(errMsg);
    }
    router.push("/Reminder")
  }
  
  return (
    <SafeAreaProvider style={{backgroundColor: '#F1F9FF'}}>
    <SafeAreaView style={{margin:20, alignItems: 'flex-start'}}>
       <Button onPress={() => router.push("/Reminder")}>Cancel</Button>
    </SafeAreaView>
    <View style= {styles.titleContainer}>
      <Text style={styles.title}>New Assignment</Text>
    </View>
    <Text style={{fontSize: 20, margin: 20}}>Course Name</Text>
    <View style={styles.container}>
      <TextInput style={styles.textInContainer}
        mode='outlined'
        value={course} 
        placeholder="Enter course name"
        onChangeText={setCourse}/>
    </View>
    <Text style={{fontSize: 20, margin: 20}}>Assignment Name</Text>
    <View style={styles.container}>
      <TextInput style={styles.textInContainer}
        mode='outlined'
        value={assignment} 
        placeholder="Enter assignment name"
        onChangeText={setAssignment}/>
    </View>
    <Text style={{fontSize: 20, margin: 20}}>Deadline</Text>
    <View style={styles.container}>
              {!showPicker && (<Pressable onPress={picker}>
              <TextInput style={styles.textInContainer}
                mode='outlined'
                value={formatDate} 
                onChangeText={setFDate}
                placeholder="Choose Date"
                editable={false}
                onPressIn={picker}/>
              </Pressable>
              )}
            </View>
            <View style={styles.container}>
              {!showtimePicker && (<Pressable onPress={timepicker}>
              <TextInput style={styles.textInContainer}
                mode='outlined'
                value={formatTime} 
                onChangeText={setFTime}
                placeholder="Choose TImee"
                editable={false}
                onPressIn={timepicker}/>
              </Pressable>
              )}
            </View>
            <View style={{marginHorizontal:20, alignItems: "flex-start"}}>
            {showPicker && (<DateTimePicker
                mode="date"
                value={date}
                onChange={changeDate}
                />
            )}
            {showtimePicker && (<DateTimePicker
                mode="time"
                value={time}
                onChange={changeTime}
                />
                )}
            </View>
    <SafeAreaView style={{alignItems: 'center',justifyContent: 'center', maxWidth: '90%', margin: 20}}>
      <Button onPress={handleSubmit} mode='contained' buttonColor="#517fa4">Save</Button>
    </SafeAreaView>
  </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
backButtons : {
  margin: 15, backgroundColor:'#3F5DFF'
},
title: {
  fontSize: 25
},
titleContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  margin: 15
},
container: {
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  menubutton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc4e41',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    borderRadius: 5,
    margin: 5, 
  },
  textInContainer: {
    minWidth: '90%',
    maxWidth: '90%',
  },
  dropdown1BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: {
    color: '#444', 
    textAlign: 'left'
  },
  dropdown1DropdownStyle: {
    backgroundColor: '#EFEFEF'
  },
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF', 
    borderBottomColor: '#C5C5C5'
  },
  dropdown1RowTxtStyle: {
    color: '#444', 
    textAlign: 'left'},
});

/*
<View style={{marginHorizontal:20, alignItems: 'flex-start', justifyContent: 'space-around', flexDirection: 'row'}}>
      <DateTimePicker
        mode="date"
        value={date}
        onChange={changeDate}
         />
      <DateTimePicker
        mode="time"
        value={time}
        onChange={changeTime}
         />
    </View>
    */