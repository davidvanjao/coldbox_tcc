import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../telas/login";
import Home from "../telas/home";

const  Stack = createNativeStackNavigator();

export default function RoutesStack() {

    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    )
}