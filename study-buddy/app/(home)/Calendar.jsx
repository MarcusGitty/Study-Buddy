import { StyleSheet, TouchableOpacity, View} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text } from 'react-native-paper'
import {Agenda} from 'react-native-calendars';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Card } from 'react-native-elements';

export default function Calendars() {
    const [loading, setLoading] = useState(false);
    const [reminder, setReminder] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [date, setDate] = useState([])



    async function fetchReminder() {
        setLoading(true);
          let {data} = await supabase.from('Reminder').select('course, assignment, due_time')
          console.log(`${data}`);
          setLoading(false);
          setReminder(data);
      }

      async function fetchDate() {
        setLoading(true);
          let {data} = await supabase.from('Reminder').select('due_date');
          console.log(`${data}`);
          setLoading(false);
          setDate(data);
      }

    
    
      useEffect(() => {
        fetchReminder();
        fetchDate();
          const channel = supabase
            .channel('schema-db-changes')
            .on(
              'postgres_changes',
              {
                event: '*',
                schema: 'public',
                table: 'Reminder'
              },
              (payload) => {fetchDate();}
            )
            .subscribe()
      }, [])
    
      useEffect(() => {
          if(refresh){
          fetchDate();
          setRefresh(false);
          }
      }, [refresh])
    
    
    return (
        <SafeAreaProvider>
            <View style={{flex:1}}>
            <Agenda
  // The list of items that have to be displayed in agenda. If you want to render item as empty date
  // the value of date key has to be an empty array []. If there exists no value for date key it is
  // considered that the date in question is not yet loaded
  items={{
    '2023-05-22': [],
  }}
  
  // Specify how each item should be rendered in agenda
  renderItem={(item, firstItemInDay) => {

    return (
      <TouchableOpacity
        style={[styles.item, {height: item.height}]}
        onPress={() => Alert.alert(item.assignment)}
      >
        <Text style={{fontSize: 16, color: 'black'}}>{item.assignment}</Text>
        <Text style={{fontSize: 14, color:'#43515c'}}>{item.course}</Text>
      </TouchableOpacity>
    );
  }}
  showOnlySelectedDayItems={true}
  // Specify how empty date content with no items should be rendered
    renderEmptyDate = {() => {
        return (
            <View style={styles.item}>
            </View>
        )
    }}
  // Specify what should be rendered instead of ActivityIndicator
  renderEmptyData={() => {
    return (
        <View style={{justifyContent: 'center', alignItems:'center', flex: 1, backgroundColor: '#F19FF'}}>
            <Text style={{fontSize: 35, alignItems: 'center'}}>No due assignments</Text>
            <Text style={{fontSize: 35, alignItems: 'center'}}>on this date!</Text>
        </View>
    )
  }}
  // Specify your item comparison function for increased performance
  rowHasChanged={(r1, r2) => {
    return r1.text !== r2.text;
  }}

  // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
  disabledByDefault={true}
  // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
  onRefresh={() => console.log('refreshing...')}
  // Set this true while waiting for new data from a refresh
  refreshing={false}
  // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
  refreshControl={null}
  // Agenda theme
  theme={{
    agendaDayTextColor: 'black',
    agendaDayNumColor: 'black',
    agendaTodayColor: 'blue',
    agendaKnobColor: 'grey'
  }}
/>
            </View>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F1F9FF',
        flex: 1,
        flexWrap: 'stretch',
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
      },
      emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
      },
      customDay: {
        margin: 10,
        fontSize: 24,
        color: 'green'
      },
      dayItem: {
        marginLeft: 34
      }
});