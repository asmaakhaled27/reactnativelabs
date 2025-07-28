import React from "react";
import { View, Text } from "react-native";
import DrawerContent from "../Components/drawer";

export default function Home({ navigation }) {
  const closeDrawer = () => {
    navigation.closeDrawer?.(); 
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>React Native Labs</Text>
      <DrawerContent navigation={navigation} closeDrawer={closeDrawer} />
    </View>
  );
}
