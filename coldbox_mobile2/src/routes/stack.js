import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../telas/login";
import RoutesDrawer from "./drawer";

import InfoEquipamento from "../telas/infoEquipamento";

//telas
const  Stack = createNativeStackNavigator();

export default function RoutesStack() {

    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="Home" component={RoutesDrawer} options={{headerShown: false}}/>
            <Stack.Screen name="InfoEquipamento" component={InfoEquipamento}/>
        </Stack.Navigator>
    )
}