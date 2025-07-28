import React from 'react';
import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/pages/DrawerNavigator';
import { Provider } from 'react-redux';
import store from './src/store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </Provider>
  );
}
