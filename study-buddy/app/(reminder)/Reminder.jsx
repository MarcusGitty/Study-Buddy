import { Button, Text } from "react-native-paper"
import { Link } from "expo-router"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet, View, Alert } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import Assignment from './Assignment'
import { Icon } from "react-native-elements"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Reminder() {
  const router = useRouter();
  const [reminder, setReminder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  
  async function fetchReminder() {
    setLoading(true);
      const {data} = await supabase
      .from('AssignmentTracker').select('*')
      .eq('completed', false).order('Deadline', { ascending: true });
      console.log(`${data}`);
      setLoading(false);
      setReminder(data);
    
  }
  
  useEffect(() => {
    fetchReminder();
      const channel = supabase
        .channel('schema-db-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
          },
          (payload) => {fetchReminder();}
        )
        .subscribe()
  }, [])

  useEffect(() => {
      if(refresh){
      fetchReminder();
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
          <Text style={styles.title}>Assignment Reminder</Text>
        </View>
        <View style={{alignItems: 'flex-end', marginHorizontal: 15}}>
        <Icon
            name='add-outline'
            type='ionicon'
            color='#517fa4'
            iconProps={{size:35}}
            onPress={() => router.push("/AddAssignment")}
        />
        </View>
        <SafeAreaView style={{marginHorizontal:15, marginBottom: '75%'}}>
            <FlatList 
            data = {reminder}
            renderItem = {({item, index}) => 
            <>
              <Assignment reminder = {item} index = {index}/>
            </>}
            refreshing={refresh}
            onRefresh={() => setRefresh(true) && console.log(`${refresh}`)}
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