import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../telas/home';
import Sobre from '../telas/sobre';
import Sair from '../telas/sair';

//menu
const Drawer = createDrawerNavigator();

export default function RoutesDrawer({route}) {

  //initialParams={route.params.info} usado para passar parametro


  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home}/>
      <Drawer.Screen name="Sobre" component={Sobre}/>
      <Drawer.Screen name="Sair" component={Sair}/>
    </Drawer.Navigator>
  );
}
