import { Button, Text, Checkbox, TextInput } from "react-native-paper"
import { Link } from "expo-router"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { supabase } from "../../lib/supabase"
import { Icon } from "react-native-elements"
import { StyleSheet, TouchableOpacity, View, Alert, Modal} from "react-native"
import { useState } from "react"
import SelectDropdown from "react-native-select-dropdown"

const Task = ({todo}) => {
    const [check, setCheck] = useState(todo.completed);
    const [modal, setModal] = useState(false);
    const [inputText, setInput] = useState(todo.task);
    const [status, setStatus] = useState(todo.status);

    const openModal = () => {
        setModal(true);
    }

    const edit = async () => {
        const { error } = await supabase
            .from('ToDoList')
            .update({task: inputText, status:status})
            .eq('id', todo.id)

            if (error != null) {
                Alert.alert(`Error: ${error}`);
            }
            
        setModal(false);
    }

    const handleComplete = async () => {
        const { error } = await supabase
            .from('ToDoList')
            .update({completed:!check})
            .eq('id', todo.id);

        if (error != null) {
            Alert.alert(`Error: ${error}`);
        }

        setCheck(!check);
    }
    
    const handleDelete = async () => {
        const { error } = await supabase
            .from('ToDoList')
            .delete()
            .eq('id', todo.id);

        if (error != null) {
            Alert.alert(`Error: ${error}`);
        }
    }

    const prioritylist = ["", "High Priority", "Low Priority"]

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
        <Text style={styles.title}>Edit Task</Text>
      </View>
      <Text style={{fontSize: 20, margin: 20}}>Task Name</Text>
      <View style={styles.container}>
        <TextInput style={styles.textInContainer}
          mode='outlined'
          value={inputText} 
          placeholder="Enter task name"
          onChangeText={setInput}/>
      </View>
      <Text style={{fontSize: 20, margin: 20}}>Status</Text>
      <View style={{marginHorizontal:20, alignItems: "flex-start"}}>
        <SelectDropdown
        data={prioritylist}
        defaultButtonText={status != null ? status : "Select status"}
        onSelect={(selectedItem, index) => {
          selectedItem == "" ? setStatus(null) : setStatus(selectedItem);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem
        }}
        rowTextForSelection={(item, index) => {
          return item
        }}
        buttonStyle={styles.dropdown1BtnStyle}
        buttonTextStyle={styles.dropdown1BtnTxtStyle}
        dropdownIconPosition={'right'}
        renderDropdownIcon={isOpened => {
          return(
          <Icon 
          name={isOpened ? 'chevron-up-outline' : 'chevron-down-outline'} 
          type='ionicon'
          color='#517fa4'
          iconProps={{size:18}} />);
        }}
        dropdownStyle={styles.dropdown1DropdownStyle}
        rowStyle={styles.dropdown1RowStyle}
        rowTextStyle={styles.dropdown1RowTxtStyle}
        />
      </View>
      <SafeAreaView style={{alignItems: 'center',justifyContent: 'center', maxWidth: '90%'}}>
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
            <Text style ={{fontSize:16}}>{todo.task}</Text>
            <Text style={{fontSize:14}}>{todo.status}</Text>
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

export default Task

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