import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function RoutesTab() {
  return (
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name="Pendentes" component={PendentesScreen} />
            <Tab.Screen name="Historico" component={HistoricoScreen} />
        </Tab.Navigator>
    </NavigationContainer>
  );
}