import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'

const Stack = createNativeStackNavigator()

export default function StackRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name='home' component={HomeScreen}/>
            <Stack.Screen name='login' component={LoginScreen}/>
        </Stack.Navigator>
    )
}