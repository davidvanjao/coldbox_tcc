import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import RoutesStack from './src/routes/stack';

export default function App() {
  return (
    <NavigationContainer>
      <RoutesStack/>
    </NavigationContainer>
  );
}