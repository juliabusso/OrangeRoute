import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {AntDesign} from '@expo/vector-icons'

import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'

const Tab = createBottomTabNavigator()

export default function TabRoutes(){
    return(
        <Tab.Navigator screenOptions={{headerShown:false}}>
            <Tab.Screen name='Home' component={HomeScreen} 
                options={{tabBarIcon:()=><AntDesign name='home' />}}
            />
            <Tab.Screen name='Login' component={LoginScreen}/>
        </Tab.Navigator>
    )
}