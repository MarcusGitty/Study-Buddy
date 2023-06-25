import { ActivityIndicator, Button, Text, TextInput } from "react-native-paper"
import { Link, useRouter } from "expo-router"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet, TouchableOpacity, Image, View } from "react-native"
import { supabase } from "../../lib/supabase"
import { useState } from "react"
import SelectDropdown from "react-native-select-dropdown"
import { useAuth } from "../../contexts/auth"
import { Icon } from "react-native-elements"

export default function AddTask() {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState(null);
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async () => {
    if (task === '') {
        setErrMsg('task cannot be empty');
        return;
    }

    setLoading(true);
    const { error } = await supabase
      .from('ToDoList')
        .insert({task:task, status:priority, user_id: user.id})
        .select()
        .single();
    setLoading(false);
    
    if(error != null) {
      setErrMsg(error.message);
      return;
    }
    router.push("/ToDo")
  }
  
  const prioritylist = ["High Priority", "Low Priority"];

  return (
    <SafeAreaProvider style={{backgroundColor: '#F1F9FF'}}>
      <SafeAreaView>
        <Link href="/ToDo">
          <Button>Cancel</Button>
        </Link>
      </SafeAreaView>
      <View style= {styles.titleContainer}>
        <Text style={styles.title}>New Task</Text>
      </View>
      <Text style={{fontSize: 20, margin: 20}}>Task Name</Text>
      <View style={styles.container}>
        <TextInput style={styles.textInContainer}
          mode='outlined'
          value={task} 
          placeholder="Enter task name"
          onChangeText={setTask}/>
        {errMsg!== '' && <Text>{errMsg}</Text>}
      </View>
      <Text style={{fontSize: 20, margin: 20}}>Status</Text>
      <View style={{marginHorizontal:20, alignItems: "flex-start"}}>
        <SelectDropdown
        data={prioritylist}
        defaultButtonText={'Select status'}
        onSelect={(selectedItem, index) => {
          setPriority(selectedItem);
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
        <Button onPress={handleSubmit} mode='contained' buttonColor="#517fa4">Save</Button>
        {loading && <ActivityIndicator />}
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


function App() {
  return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonFacebookStyle}
            activeOpacity={0.5}>
            <Image
              source={{
                uri:
                  'https://raw.githubusercontent.com/AboutReact/sampleresource/master/facebook.png',
              }}
              style={styles.buttonImageIconStyle}
            />
            <View style={styles.buttonIconSeparatorStyle} />
            <Text style={styles.buttonTextStyle}>
              Login Using Facebook
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonGPlusStyle}
            activeOpacity={0.5}>
            <Image
              source={{
                uri:
                  'https://raw.githubusercontent.com/AboutReact/sampleresource/master/google-plus.png',
              }}
              style={styles.buttonImageIconStyle}
            />
            <View style={styles.buttonIconSeparatorStyle} />
            <Text style={styles.buttonTextStyle}>
              Login Using Google Plus
            </Text>
          </TouchableOpacity>
          </View>
  </SafeAreaView>
);
}