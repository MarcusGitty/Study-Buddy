import { Button, Text } from "react-native-paper"
import { Link } from "expo-router"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import Task from '../(todolist)/Task'
import { Icon } from "react-native-elements"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import Assignment from "../(reminder)/Assignment"

export default function Insight() {
  const router = useRouter();
  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [reminder, setReminder] = useState([]);

  async function fetchTodo() {
    setLoading(true);
      let {data} = await supabase.from('ToDoList').select('*').eq('completed', false)
      .eq('status', "High Priority").limit(5);
      console.log(`${data}`);
      setLoading(false);
      setTodo(data);
  }

  async function fetchReminder() {
    setLoading(true);
      let {data} = await supabase.from('AssignmentTracker').select('*').eq('completed', false)
      .order('Deadline', {ascending : false}).limit(5);
      console.log(`${data}`);
      setLoading(false);
      setReminder(data);
  }
  
  useEffect(() => {
    fetchTodo();
    fetchReminder();
      const channel = supabase
        .channel('schema-db-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public'
          },
          (payload) => {fetchTodo();}
        )
        .subscribe()
  }, [])

  useEffect(() => {
      if(refresh){
      fetchTodo();
      fetchReminder();
      setRefresh(false);
      }
  }, [refresh])

  return (
    <SafeAreaProvider style={{backgroundColor: '#F1F9FF'}}>
      <SafeAreaView>
        <View style= {styles.titleContainer}>
          <Text style={styles.title}>Urgent To Do List</Text>
        </View>
        <SafeAreaView style={{marginHorizontal:15, maxHeight:260}}>
            <FlatList 
            data = {todo}
            renderItem= {({item, index}) => 
            <>
              <Task todo={item} index={index}/>
            </>}
            refreshing={refresh}
            onRefresh={() => setRefresh(true)}
            />
        </SafeAreaView>
        <SafeAreaView>
        <View style= {styles.titleContainer}>
          <Text style={styles.title}>Earliest Due Assignment</Text>
        </View>
        <SafeAreaView style={{marginHorizontal:15, maxHeight:260}}>
            <FlatList 
            data = {reminder}
            renderItem= {({item, index}) => 
            <>
              <Assignment reminder={item} index={index}/>
            </>}
            refreshing={refresh}
            onRefresh={() => setRefresh(true)}
            />
        </SafeAreaView>
        </SafeAreaView>
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
  flex: 1,
  margin: 10,
  marginTop: 30,
  padding: 30,
},
tasksWrapper: {
  paddingTop: 80,
  paddingHorizontal: 20
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
}
});