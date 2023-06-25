import { Button, Text } from "react-native-paper"
import { Link } from "expo-router"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet, TouchableOpacity, Image, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import Task from './Task'
import { Icon } from "react-native-elements"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function ToDo() {
  const router = useRouter();
  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  async function fetchTodo() {
    setLoading(true);
      let {data} = await supabase.from('ToDoList').select('*').eq('completed', false);
      console.log(`${data}`);
      setLoading(false);
      setTodo(data);
  }
  
  useEffect(() => {
    fetchTodo();
      const channel = supabase
        .channel('schema-db-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
          },
          (payload) => {fetchTodo();}
        )
        .subscribe()
  }, [])

  useEffect(() => {
      if(refresh){
      fetchTodo();
      setRefresh(false);
      }
  }, [refresh])

  return (
    <SafeAreaProvider style={{backgroundColor: '#F1F9FF'}}>
      <SafeAreaView>
        <Link href="/">
            <Button>Back</Button>
        </Link>
        <View style= {styles.titleContainer}>
          <Text style={styles.title}>Today's To Do List</Text>
        </View>
        <View style={{alignItems: 'flex-end', marginHorizontal: 15}}>
        <Icon
            name='add-outline'
            type='ionicon'
            color='#517fa4'
            iconProps={{size:35}}
            onPress={() => router.push("/AddTask")}
        />
        </View>
        <SafeAreaView style={{marginHorizontal:15, marginBottom: '75%'}}>
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