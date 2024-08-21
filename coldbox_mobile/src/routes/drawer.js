import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text} from 'react-native';

import Home from '../pages/Home'; 
import Sobre from '../pages/Sobre';
import Logoff from '../pages/Logoff';

const Drawer = createDrawerNavigator();

export default function RoutesDrawer() {
  return (

      <Drawer.Navigator initialRouteName="Home" drawerContent={Logoff}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Sobre" component={Sobre} />
      </Drawer.Navigator>

      

  );
}