// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import ProfileCard from "./src/Components/profilecard";
// import Lab1 from "./src/pages/Lab1";
// import Lab2 from "./src/pages/Lab2";
// import Lab3 from "./src/pages/Lab3";

// const Drawer = createDrawerNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="Profile">

//         <Drawer.Screen name="Lab 1" component={ProfileCard} />
//         {/* <Drawer.Screen name="Lab 2" component={Lab2} />
//         <Drawer.Screen name="Lab 3" component={Lab3} /> */}
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }
// App.js
import React from 'react';
import "react-native-gesture-handler";

import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/pages/DrawerNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
