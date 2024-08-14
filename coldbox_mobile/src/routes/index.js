import { createNativeStackNavigator } from "@react-navigation/native-stack";



import Login from '../pages/Login'
import Home from '../pages/Home'
import Inicio from "../pages/Inicio";

const  Stack = createNativeStackNavigator();

export default function Routes() {
    return(
        <Stack.Navigator>    

            <Stack.Screen
                name="Home"
                component={Home}
                options={{headerShown: false}}
                
            />

            <Stack.Screen
                name="Login"
                component={Login}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name="Inicio"
                component={Inicio}
            />


        </Stack.Navigator>
    )
}