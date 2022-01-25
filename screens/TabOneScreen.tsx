import React, { useState } from "react";
import { StyleSheet, FlatList, Image } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { useEffect } from "react";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [characters, setAllCharacters] = useState([]);
  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then((response) => {
        console.log("response", response);
        setAllCharacters(response.data.results);
      })
      .catch((e) => {
        console.log("e", e);
      });
  }, []);

  return (
    <View style={styles.container}>
      {/*  */}
      <View
        style={styles.header}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      >
        <View
          style={styles.greetings}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        >
          <View
            style={styles.eyebrow}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          >
            <FontAwesome name="child" size={15} color="white" />
            <Text style={styles.eyebrowTitle}>Characters</Text>
          </View>
          <View
            style={styles.seeAllContainer}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          >
            <Text style={styles.see}>See,</Text>
            <Text style={styles.all}>All here!</Text>
          </View>
        </View>
        <View
          style={styles.profilePicture}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        {/* https://rickandmortyapi.com/api/character/avatar/19.jpeg */}
      </View>
      <View
        style={styles.search}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      >
        <View
          style={styles.input}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <View
          style={styles.filters}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        >
          <FontAwesome name="sliders" size={40} color="white" />
        </View>
      </View>
      <View
        style={styles.menu}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      >
        <FlatList
          data={[
            {
              id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
              title: "First ",
            },
            {
              id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
              title: "Second ",
            },
            {
              id: "58694a0f-3da1-471f-bd96-145571e29d72",
              title: "Third ",
            },
          ]}
          renderItem={({ item }) => (
            <View
              style={styles.menuList}
              lightColor="#eee"
              darkColor="rgba(255,255,255,0.1)"
            >
              <Text style={styles.title}>{item.title}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View
        style={styles.list}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      >
        <FlatList
          data={characters}
          renderItem={({ item }) => (
            <View
              style={styles.listItems}
              lightColor="#eee"
              darkColor="rgba(255,255,255,0.1)"
            >
              <View
                style={styles.bookmark}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
              >
                <FontAwesome name="bookmark" size={25} color="white" />
              </View>
              <View
                style={styles.containerImg}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
              >
                <Image style={styles.img} source={{ uri: item.image || "" }} />
              </View>
              <View
                style={styles.description}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
              >
                <Text numberOfLines={1} style={styles.name}>
                  {item.name}
                </Text>
                <View
                  style={styles.containerSpecieGender}
                  lightColor="#eee"
                  darkColor="rgba(255,255,255,0.1)"
                >
                  <Text style={styles.species}>{item.species}, </Text>
                  <Text style={styles.gender}>{item.gender}</Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "rgba(26, 39, 73, 0.95)",
    padding: 10,
  },
  header: {
    backgroundColor: "transparent",
    height: "25%",
    width: "100%",
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 30,
  },
  greetings: {
    backgroundColor: "transparent",
    height: "100%",
    width: "50%",
    padding: 15,
    borderRadius: 5,
  },
  eyebrow: {
    backgroundColor: "transparent",
    flexDirection: "row",
    marginBottom: 10,
  },
  seeAllContainer: {
    backgroundColor: "transparent",
  },
  see: {
    fontSize: 32,
    color: "#cecece",
  },
  all: {
    fontSize: 32,
    color: "white",
  },
  profilePicture: {
    backgroundColor: "rgba(26, 39, 73, 0.5)",
    height: 50,
    width: 50,
    borderRadius: 25,
    padding: 15,
    marginRight: 5,
    marginTop: 10,
  },
  search: {
    backgroundColor: "transparent",
    height: "10%",
    width: "100%",
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    backgroundColor: "rgba(26, 39, 73, 0.5)",
    height: "80%",
    width: "70%",
    padding: 5,
    borderRadius: 20,
  },
  filters: {
    backgroundColor: "#536EFA",
    height: "80%",
    width: "17%",
    padding: 5,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  menu: {
    backgroundColor: "transparent",
    height: "10%",
    width: "100%",
    padding: 5,
    paddingRight: 0,
  },
  menuList: {
    backgroundColor: "transparent",
    height: "100%",
    width: 100,
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    backgroundColor: "transparent",
    height: "55%",
    width: "100%",
    padding: 5,
    paddingRight: 0,
    marginTop: 10,
  },
  listItems: {
    backgroundColor: "transparent",
    marginRight: 20,
    height: "80%",
    position: "relative",
    alignItems: "center",
  },
  bookmark: {
    position: "absolute",
    top: 10,
    right: 15,
    backgroundColor: "rgba(26, 39, 73, 1)",
    height: 50,
    width: 50,
    padding: 5,
    borderRadius: 10,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerImg: {
    width: 250,
    backgroundColor: "rgba(26, 39, 73, 0.5)",
    height: "90%",
    borderRadius: 50,
  },
  img: {
    height: "100%",
    width: "100%",
    resizeMode: "stretch",
    borderRadius: 10,
  },
  description: {
    height: "30%",
    width: "90%",
    backgroundColor: "rgba(26, 39, 73, 1)",
    position: "absolute",
    bottom: 0,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  name: {
    fontSize: 14,
    color: "white",
  },
  containerSpecieGender: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
  },
  gender: {
    fontSize: 14,
    color: "rgba(206, 206, 206, 0.7)",
  },
  species: {
    fontSize: 14,
    color: "rgba(206, 206, 206, 0.7)",
  },
  eyebrowTitle: {
    fontSize: 14,
    color: "rgba(206, 206, 206, 0.7)",
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    color: "white",
    borderRadius: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
// #1a2749
