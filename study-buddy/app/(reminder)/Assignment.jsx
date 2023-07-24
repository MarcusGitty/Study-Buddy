import { Button, Text, Checkbox, TextInput } from "react-native-paper"
import { Link } from "expo-router"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { supabase } from "../../lib/supabase"
import { Icon } from "react-native-elements"
import { StyleSheet, TouchableOpacity, View, Alert, Modal, Pressable, Platform} from "react-native"
import { useState } from "react"
import DateTimePicker from '@react-native-community/datetimepicker'

const Assignment = ({reminder}) => {
    const [check, setCheck] = useState(reminder.completed);
    const [modal, setModal] = useState(false);
    const [inputText, setInput] = useState(reminder.assignment);
    const [course, setCourse] = useState(reminder.module)
    const [date, setDate] = useState(new Date(reminder.Deadline));
    const [time, setTime] = useState(new Date());
    const [formatTime, setFTime] = useState(reminder.due_time);
    const [formatDate, setFDate] = useState(reminder.Deadline)
    const [showPicker, setShowPicker] = useState(false);
    const [showtimePicker, settimePicker] = useState(false);

    const picker = () => {
        setShowPicker(!showPicker);
    }

    const timepicker = () => {
        settimePicker(!showtimePicker);
    }

    const openModal = () => {
        setModal(true);
    }

    const changeDate = ({type}, selectedDate) => {
        if (type == "set") {
          const duedate = selectedDate;
          setDate(duedate);
          console.log(date)
          if (Platform.OS === "android") {
            picker();
            setFDate(duedate.toDateString())
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

    const edit = async () => {
        const { error } = await supabase
            .from('AssignmentTracker')
            .update({assignment: inputText, module: course, Deadline: date, due_time: formatTime})
            .eq('id', reminder.id)

            if (error != null) {
                Alert.alert(`Error: ${error}`);
            }
            
        setModal(false);
    }

    const handleComplete = async () => {
        const { error } = await supabase
            .from('AssignmentTracker')
            .update({completed:!check})
            .eq('id', reminder.id);

        if (error != null) {
            Alert.alert(`Error: ${error}`);
        }

        setCheck(!check);
    }
    
    const handleDelete = async () => {
        const { error } = await supabase
            .from('AssignmentTracker')
            .delete()
            .eq('id', reminder.id);

        if (error != null) {
            Alert.alert(`Error: ${error}`);
        }
    }

    return (
    <View>
        <Modal animationType="fade"
            visible={modal}
            onRequestClose={() => setModal(false)}
        >
          <SafeAreaProvider style={{backgroundColor: '#F1F9FF'}}>
            <SafeAreaView style={{margin:20, alignItems: 'flex-start'}}>
               <Button onPress={() => setModal(false)}>Cancel</Button>
            </SafeAreaView>
            <View style= {styles.titleContainer}>
              <Text style={styles.title}>Edit Assignment</Text>
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
                value={inputText} 
                placeholder="Enter assignment name"
                onChangeText={setInput}/>
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
              <Button onPress={edit} mode='contained' buttonColor="#517fa4">Save</Button>
            </SafeAreaView>
          </SafeAreaProvider>
        </Modal>

    <View style={styles.item}>
        <View style={styles.itemLeft}>
            <TouchableOpacity style={{marginRight:15}}>
            <Checkbox.Android 
                status={check? "checked" : "unchecked"}
                onPress={handleComplete}/>
            </TouchableOpacity>
            <View style={{maxWidth:'80%'}}>
            <Text style={{fontSize:16}}>{reminder.assignment}</Text>
            <Text style={{fontSize: 16}}>Course: {reminder.module}</Text>
            <Text style={{fontSize:16}}>Due: {reminder.Deadline} {reminder.due_time}</Text>
            </View>
        </View>
        <View style={styles.itemRight}>
            <Icon
            name='pencil-outline'
            type='ionicon'
            color='#517fa4'
            iconProps={{size:26}}
            onPress={openModal}
            />
            <Icon
            name='close-circle-outline'
            type='ionicon'
            color='#517fa4'
            iconProps={{size:26}}
            onPress={handleDelete}
            />
        </View>
    </View>
    </View>
)
}

export default Assignment;

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    checkbox: {
        width: 24,
        height: 24,
        backgroundColor: '#DFE9F1',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    itemRight: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    itemText: {
        maxWidth: '80%'
    },
    icons: {
        width: 12,
        height:12
    },
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

})