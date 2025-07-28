import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import DrawerContent from "../Components/drawer";

export default function Home({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const closeDrawer = () => {
    navigation.closeDrawer?.(); 
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
        <Image
          source={{ uri: 'https://img.icons8.com/ios-filled/100/8e24aa/movie-projector.png' }}
          style={styles.logo}
        />
        <Text style={styles.title}>Cinema EG</Text>
      </Animated.View>
      <Animated.Text style={[styles.subtitle, { opacity: fadeAnim }]}>Welcome to Cinema EG, your Egyptian movie blog for the latest in film, reviews, and more!</Animated.Text>
      <Animated.Text style={[styles.desc, { opacity: fadeAnim }]}>Explore popular movies, add your favorites, and join our community of cinema lovers.</Animated.Text>
      <DrawerContent navigation={navigation} closeDrawer={closeDrawer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ede7f6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
    alignSelf: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#6a1b9a',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    color: '#8e24aa',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 16,
    color: '#4a148c',
    textAlign: 'center',
    marginTop: 8,
  },
});
