import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'

import TabRoutes from "./tab.routes";

const Drawer = createDrawerNavigator()

export default function DrawerRoutes(){
    return(
        <Drawer.Navigator>
            <Drawer.Screen name='home' component={TabRoutes}/>
            <Drawer.Screen name='login' component={TabRoutes} initialParams={{screen:"Login"}}/>
        </Drawer.Navigator>
    )
}