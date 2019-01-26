import React from 'react';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import DragNDropScreen from '../screens/DragNDropScreen';
import AboutScreen from '../screens/AboutScreen';
import WinScreen from '../screens/WinScreen';

export default createStackNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: HomeScreen,
  DragNDrop: DragNDropScreen,
  About: AboutScreen,
  Win: WinScreen,
});