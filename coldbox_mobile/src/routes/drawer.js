import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text} from 'react-native';

import Home from '../pages/Home'; 
import Sobre from '../pages/Sobre';
import Menu from '../pages/Menu';
import Configuracao from '../pages/Configuracao';

const Drawer = createDrawerNavigator();

export default function RoutesDrawer() {
  return (

      <Drawer.Navigator initialRouteName="Home" drawerContent={Menu}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Configuracao" component={Configuracao} />
        <Drawer.Screen name="Sobre" component={Sobre} />
      </Drawer.Navigator>

      

  );
}