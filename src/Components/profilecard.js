import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ScrollView } from "react-native-web";
import { MaterialIcons } from "@expo/vector-icons";


export default function ProfileCard() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOJBFfUZIEE_2pHywraXZ77hD1lQHLNfKnBGJ0XGf6Vo9r95FbACA_xxOi-nct6pXK7kM&usqp=CAU",
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Asmaa Khaled</Text>
        <Text style={styles.title}>Front-End & Cross-Platform Developer</Text>
        <View style={styles.socialContainer}>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://facebook.com")}
          >
            <FontAwesome
              name="facebook"
              size={24}
              color="#4267B2"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://twitter.com")}
          >
            <FontAwesome
              name="twitter"
              size={24}
              color="#1DA1F2"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://instagram.com")}
          >
            <FontAwesome
              name="instagram"
              size={24}
              color="#C13584"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <Text style={styles.item}>
            <Text style={styles.label}>Age:</Text> 27
          </Text>
          <Text style={styles.item}>
            <Text style={styles.label}>Residence:</Text> Egypt
          </Text>
          <Text style={styles.item}>
            <Text style={styles.label}>Freelancer:</Text> Available
          </Text>
          <Text style={styles.item}>
            <Text style={styles.label}>Address:</Text> Zagazig, Egypt
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Languages</Text>
          {renderLanguage("Arabic", 100)}
          {renderLanguage("English", 85)}
          {renderLanguage("Spanish", 50)}
          {renderLanguage("German", 35)}
        </View>
        <TouchableOpacity
          style={styles.downloadButton}
          onPress={() =>
            Linking.openURL(
              "https://drive.google.com/file/d/12hWSAK6SsAxODJMNHZAyzn4dkBEVD1_J/view?usp=drive_link/download"
            )
          }
        >
          <View style={{ flexDirection: "row" }}>
            <MaterialIcons name="download" size={20} color="pink" />
            <Text style={{ color: "pink", fontSize: 20 }}>Download CV</Text>
          </View>
        </TouchableOpacity>
        );
      </View>
    </ScrollView>
  );
}

const renderLanguage = (language, percentage) => (
  <View style={{ marginBottom: 8 }}>
    <Text style={styles.languageText}>{language}</Text>
    <View style={styles.barBackground}>
      <View style={[styles.barFill, { width: `${percentage}%` }]} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#1c1c1c",
    flex: 1,
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  title: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 15,
  },
  socialContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  icon: {
    marginHorizontal: 10,
  },
  card: {
    width: "100%",
    backgroundColor: "#2c2c2c",
    borderRadius: 8,
    padding: 16,
    marginTop: 15,
  },
  item: {
    color: "#fff",
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
    color: "#aaa",
  },
  sectionTitle: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  languageText: {
    color: "#eee",
    marginBottom: 4,
  },
  barBackground: {
    height: 6,
    backgroundColor: "#555",
    borderRadius: 3,
  },
  barFill: {
    height: 6,
    backgroundColor: "#ff5c8d",
    borderRadius: 3,
  },
  downloadButton: {
    backgroundColor: "#1c1c1c",
    padding: 20,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },

});
