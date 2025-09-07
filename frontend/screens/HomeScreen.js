import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../context/authContext";

const { width, height } = Dimensions.get("window");
// Importing local images
import icon1 from "../assets/icon1.png";
import icon2 from "../assets/icon2.png";
import icon3 from "../assets/icon3.png";
import icon4 from "../assets/icon4.png";

const HomeScreen = ({ navigation }) => {
  const [state] = useContext(AuthContext);
  return (
    <View style={styles.mainContainer}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg",
            }}
            style={styles.profileImage}
          />
          <View style={styles.iconsContainer}>
            <Ionicons name="happy-outline" size={30} color="black" />
            <Ionicons
              name="notifications-outline"
              size={30}
              color="black"
              style={{ marginLeft: 10 }}
            />
          </View>
        </View>
        <Text style={styles.greeting}>Good Morning,</Text>
        <Text style={styles.username}>
          {state.user ? state.user.name : ""}!
        </Text>

        <View style={styles.grid}>
          <TouchableOpacity
            style={[styles.card, styles.card1]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("RiskNumConceived")}
          >
            <Text style={styles.cardText}>Track your health with AI</Text>
            <Image source={icon1} style={styles.bottomLeftIcon} />
            <TouchableOpacity
              style={[styles.iconWrapper, styles.card1Icon]}
              activeOpacity={0.7}
              onPress={() => navigation.navigate("RiskNumConceived")}
            >
              <Ionicons
                name="arrow-forward-outline"
                size={30}
                color="rgba(48, 63, 159, 0.7)"
                style={styles.rotatedIcon}
              />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.card, styles.card2]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("History")}
          >
            <Text style={styles.cardText}>History</Text>
            <Image source={icon2} style={styles.bottomLeftIcon} />
            <TouchableOpacity
              style={[styles.iconWrapper, styles.card2Icon]}
              activeOpacity={0.7}
              onPress={() => navigation.navigate("History")}
            >
              <Ionicons
                name="arrow-forward-outline"
                size={30}
                color="rgba(255, 193, 7, 0.7)"
                style={styles.rotatedIcon}
              />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.card, styles.card3]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("MaternalGuide")}
          >
            <Text style={styles.cardText}>Refer the Maternal Guide</Text>
            <Image source={icon3} style={styles.bottomLeftIcon} />
            <TouchableOpacity
              style={[styles.iconWrapper, styles.card3Icon]}
              activeOpacity={0.7}
              onPress={() => navigation.navigate("MaternalGuide")}
            >
              <Ionicons
                name="arrow-forward-outline"
                size={30}
                color="rgba(76, 175, 80, 0.7)"
                style={styles.rotatedIcon}
              />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.card, styles.card4]}
            onPress={() => navigation.navigate("Chatbot")}
            activeOpacity={0.7}
          >
            <Text style={styles.cardText}>Ask MomBuddy anything!</Text>
            <Image source={icon4} style={styles.bottomLeftIcon} />
            <TouchableOpacity
              style={[styles.iconWrapper, styles.card4Icon]}
              onPress={() => navigation.navigate("Chatbot")}
              activeOpacity={0.7}
            >
              <Ionicons
                name="arrow-forward-outline"
                size={30}
                color="rgba(244, 67, 54, 0.7)"
                style={styles.rotatedIcon}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Ionicons name="home-outline" size={25} color="black" />
        <Ionicons name="heart-outline" size={25} color="black" />
        <Ionicons name="people-outline" size={25} color="black" />
        <Ionicons name="book-outline" size={25} color="black" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#E6EFF8",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E6EFF8",
    marginTop: 25,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  iconsContainer: {
    flexDirection: "row",
  },
  greeting: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 5,
  },
  username: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 30,
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    justifyContent: "space-between",
    height: 150,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0.2, height: 2 },
    shadowRadius: 20,
    elevation: 5,
    position: "relative",
  },
  card1: {
    backgroundColor: "#D0E1FF",
  },
  card2: {
    backgroundColor: "#FFECB3",
  },
  card3: {
    backgroundColor: "#D1F2EB",
  },
  card4: {
    backgroundColor: "#FDEDEC",
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  iconWrapper: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  card1Icon: {
    backgroundColor: "rgba(48, 63, 159, 0.2)",
  },
  card2Icon: {
    backgroundColor: "rgba(255, 193, 7, 0.2)",
  },
  card3Icon: {
    backgroundColor: "rgba(76, 175, 80, 0.2)",
  },
  card4Icon: {
    backgroundColor: "rgba(244, 67, 54, 0.2)",
  },
  rotatedIcon: {
    transform: [{ rotate: "-30deg" }],
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingVertical: 15,
    borderRadius: 25,
    position: "absolute",
    bottom: 8,
    width: width,
  },
  bottomLeftIcon: {
    width: 90,
    height: 80,
    position: "absolute",
    bottom: 0,
    left: 10,
    opacity: 0.5,
  },
});

export default HomeScreen;
