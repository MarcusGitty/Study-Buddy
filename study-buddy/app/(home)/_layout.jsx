import { Tabs } from "expo-router"
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";

export default function HomeLayout() {
    return (
    <SafeAreaProvider>
    <Tabs>
        <Tabs.Screen name="index" 
            options={{
                tabBarLabel: "Home", 
                headerTitle:"Home", 
                tabBarIcon: () => <Icon name='home-outline' type='ionicon' color='#517fa4'/>}}/>
        
        <Tabs.Screen name="Calendar"
            options={{
                tabBarLabel: "Calendar", 
                headerTitle:"Calendar",
                tabBarIcon: () => <Icon name='calendar-outline' type='ionicon' color='#517fa4'/>}}/>
        <Tabs.Screen name="Insight"
            options={{
                tabBarLabel: "Quick View", 
                headerTitle:"Quick View",
                tabBarIcon: () => <Icon name='analytics-outline' type='ionicon' color='#517fa4'/>}}/>
        
        <Tabs.Screen name="Profile" 
            options={{
                tabBarLabel: "Profile", 
                headerTitle:"Profile",
                tabBarIcon: () => <Icon name='person-outline' type='ionicon' color='#517fa4'/>}}/>
    </Tabs>
    </SafeAreaProvider>
    );
}