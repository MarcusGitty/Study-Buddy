import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text } from 'react-native-paper'
import { supabase } from '../../lib/supabase';
import { Input } from 'react-native-elements'
import { SessionContextProvider, useSession } from '@supabase/auth-helpers-react';

export default function profilePage() {
  return (
    <SessionContextProvider supabaseClient={supabase}>
        <SafeAreaProvider style={styles.container}>
          <SafeAreaView style={styles.textStyle}>
          <Text style={{fontSize: 25}}>My Account</Text>
          </SafeAreaView>
          <Profile />
          <SignOut />
        </SafeAreaProvider>
    </SessionContextProvider>
    )
}

function Profile() {
  const session = useSession();
  
  var users;
  var emailAddress;
  for (var a in session) {
    if(a == "user"){
      users = session[a];
      for (var b in users) {
        if(b == "email") {
          emailAddress = users[b];
        }
      } 
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.verticallySpaced}>
        <Input label="Email" value={emailAddress} disabled style={{textDecorationColor: 'black'}} />
      </View>
    </View>
  )
}

function SignOut() {
    return (
        <SafeAreaView>
            <Button 
                mode='contained-tonal'
                style={{margin: '3%'}}
                onPress={() => supabase.auth.signOut()}>
                  Sign Out
            </Button>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      padding: 12,
      backgroundColor: "#F1F9FF"
    },
    verticallySpaced: {
      paddingTop: 4,
      paddingBottom: 4,
      alignSelf: 'stretch',
    },
    mt20: {
      marginTop: 20,
    },
    textStyle: {
      alignItems: 'center',
      justifyContent: 'center'
    }
  })