
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import MovieDetailsScreen from "./moviecard";
import ProfileCard from "../Components/profilecard";
import MovieListScreen from "./movielist";
import TodoList from "../Todolist/todolist";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Movies">
        <Drawer.Screen name="profile" component={ProfileCard} />
      <Drawer.Screen name="Movies" component={MovieListScreen} />
      <Drawer.Screen name="todos" component={TodoList} />
      <Drawer.Screen
        name="Details"
        component={MovieDetailsScreen}
        options={{ drawerItemStyle: { display: "none" } }}
      />
    </Drawer.Navigator>
  );
}
