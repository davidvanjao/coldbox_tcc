import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from '../pages/Login'
import Equipamento from '../pages/equipamento';
import RoutesDrawer from "./drawer";

const  Stack = createNativeStackNavigator();

export default function Routes() {

    return(
        <Stack.Navigator>    

            <Stack.Screen
                name="Login"
                component={Login}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name="Home"
                component={RoutesDrawer}
                options={{headerShown: false}}                
            />

            <Stack.Screen
                name="Equipamento"
                component={Equipamento}                
            />

        </Stack.Navigator>
    )
}


