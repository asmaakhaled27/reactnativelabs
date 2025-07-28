
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite, selectFavorites } from "../store";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

function FavoriteIcon({ isFavorite, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ marginLeft: 10 }}>
      <Text style={{ fontSize: 24 }}>
        {isFavorite ? '💜' : '🤍'}
      </Text>
    </TouchableOpacity>
  );
}

export default function MovieListScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem('user').then(data => {
        if (data) setUser(JSON.parse(data));
      });
    }, [])
  );

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=aa6fc65fcedb7431af3ac2fbe6484cd0&language=en-US&page=1"
      )
      .then((response) => setMovies(response.data.results))
      .catch((error) => console.error(error));
  }, []);

  const isFavorite = (movie) => favorites.some((fav) => fav.id === movie.id);

  const toggleFavorite = (movie) => {
    if (isFavorite(movie)) {
      dispatch(removeFavorite(movie));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Details", { id: item.id })}
        style={{ flex: 1 }}
      >
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          style={styles.image}
        />
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
      <FavoriteIcon
        isFavorite={isFavorite(item)}
        onPress={() => toggleFavorite(item)}
      />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Movies</Text>
        <TouchableOpacity
          style={styles.favCountContainer}
          onPress={() => navigation.navigate('Favorites')}
        >
          <Text style={styles.favIcon}>💜</Text>
          <Text style={styles.favCount}>{favorites.length}</Text>
        </TouchableOpacity>
      </View>
      {user && (
        <View style={styles.profileHeader}>
          <Text style={styles.profileText}>Welcome, {user.username}!</Text>
          <Text style={styles.profileText}>Favorites: {favorites.length}</Text>
        </View>
      )}
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: { height: 100, width: 70, borderRadius: 10 },
  title: { marginLeft: 10, fontWeight: "bold", fontSize: 16, flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#ede7f6',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6a1b9a',
  },
  favCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#b39ddb',
  },
  favIcon: {
    fontSize: 20,
    marginRight: 4,
    color: '#8e24aa',
  },
  favCount: {
    fontSize: 16,
    color: '#6a1b9a',
    fontWeight: 'bold',
  },
  profileHeader: {
    backgroundColor: '#b39ddb',
    padding: 10,
    alignItems: 'center',
  },
  profileText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
