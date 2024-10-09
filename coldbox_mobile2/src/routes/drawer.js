import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../telas/home';
import Sobre from '../telas/sobre';
import Sair from '../telas/sair';

//menu
const Drawer = createDrawerNavigator();

export default function RoutesDrawer({route}) {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Início" component={Home}/>
      <Drawer.Screen name="Sobre" component={Sobre}/>
      <Drawer.Screen name="Sair" component={Sair}/>
    </Drawer.Navigator>
  );
}
