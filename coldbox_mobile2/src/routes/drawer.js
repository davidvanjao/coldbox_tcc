import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../telas/home';
import Sobre from '../telas/sobre';
import Sair from '../telas/sair';

//menu
const Drawer = createDrawerNavigator();

export default function RoutesDrawer({route}) {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} initialParams={route.params.info} />
      <Drawer.Screen name="Sobre" component={Sobre} initialParams={route.params.info} />
      <Drawer.Screen name="Sair" component={Sair} initialParams={route.params.info} />
    </Drawer.Navigator>
  );
}
