
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import axios from "axios";

export default function MovieDetailsScreen({ route }) {
  const { id } = route.params;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=aa6fc65fcedb7431af3ac2fbe6484cd0`
      )
      .then((response) => setMovie(response.data))
      .catch((error) => console.error(error));
  }, []);

  if (!movie) return <Text>Loading...</Text>;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.image}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
      <Text style={styles.info}>Release Date: {movie.release_date}</Text>
      <Text style={styles.info}>Rating: {movie.vote_average}/10</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  image: { height: 400, borderRadius: 10, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  overview: { fontSize: 16, marginBottom: 10 },
  info: { fontSize: 14, color: "gray" },
});
