import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function Home() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const moveAnim1 = useRef(new Animated.Value(-width)).current;
  const moveAnim2 = useRef(new Animated.Value(-width)).current;

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

  useEffect(() => {
    const animateLine = (anim, delay) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: width,
            duration: 4000,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: -width,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };
    animateLine(moveAnim1, 0);
    animateLine(moveAnim2, 2000);
  }, [moveAnim1, moveAnim2]);

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
      <View style={{ height: 60, marginTop: 30, width: '100%', overflow: 'hidden' }}>
        <Animated.Text
          style={[styles.marquee, { transform: [{ translateX: moveAnim1 }] }]}
        >
          🎬 Discover. Review. Enjoy. | السينما تجمعنا 🎬
        </Animated.Text>
        <Animated.Text
          style={[styles.marquee, { transform: [{ translateX: moveAnim2 }], top: 30 }]}
        >
          ⭐️ Latest Movies | أفضل الأفلام الجديدة ⭐️
        </Animated.Text>
      </View>
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
  marquee: {
    position: 'absolute',
    left: 0,
    width: width * 2,
    fontSize: 18,
    color: '#6a1b9a',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
});
