import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  Pressable,
} from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { useEffect } from "react";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [characters, setAllCharacters] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then((response) => {
        setAllCharacters(response.data.results);
      })
      .catch((e) => {
        console.log("e", e);
      });
    axios
      .get("https://rickandmortyapi.com/api/location")
      .then((response) => {
        setLocations(response.data.results);
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
            <FontAwesome name="child" size={15} color="#7A0BC0" />

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
        >
          <FontAwesome name="user" size={20} color="white" />
        </View>
        {/* https://rickandmortyapi.com/api/character/avatar/19.jpeg */}
      </View>
      <View
        style={styles.search}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      >
        {/* <View
          style={styles.input}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        /> */}
        <TextInput
          style={styles.input}
          onChangeText={() => {}}
          value={""}
          placeholder="Search Characters"
          keyboardType="web-search"
          placeholderTextColor="rgba(206, 206, 206, 0.7)"
        >
          {/* <FontAwesome name="search" size={20} color="white" /> */}
        </TextInput>
        <View
          style={styles.filters}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        >
          <FontAwesome name="sliders" size={30} color="white" />
        </View>
      </View>
      <View
        style={styles.menu}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      >
        <FlatList
          data={locations}
          renderItem={({ item }) => (
            <View
              style={styles.menuList}
              lightColor="#eee"
              darkColor="rgba(255,255,255,0.1)"
            >
              <Pressable
                onPress={() => {
                  setSelected(item.name === selected ? "" : item.name);
                }}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <Text
                  numberOfLines={2}
                  style={[
                    styles.title,
                    item.name === selected ? styles.titleSelected : {},
                  ]}
                >
                  {item.name}
                </Text>
              </Pressable>
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
                style={{
                  ...styles.description,
                  borderColor: item.gender === "Female" ? "#FA58B6" : "#270082",
                }}
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
    backgroundColor: "#1A1A40",
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
    marginBottom: 10,
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
    backgroundColor: "#1A1A40",
    borderColor: "#7A0BC0",
    borderWidth: 1,
    height: 50,
    width: 50,
    borderRadius: 25,
    padding: 15,
    marginRight: 5,
    marginTop: 10,
    alignItems: "center",
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
    backgroundColor: "#1A1A40",
    borderColor: "#7A0BC0",
    borderWidth: 1,
    height: "80%",
    width: "80%",
    padding: 5,
    borderRadius: 20,
    paddingHorizontal: 20,
    color: "white",
  },
  filters: {
    backgroundColor: "#1A1A40",
    borderColor: "#7A0BC0",
    borderWidth: 1,
    height: "80%",
    width: "15%",
    padding: 5,
    borderRadius: 15,
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
    backgroundColor: "#1A1A40",
    height: 50,
    width: 50,
    padding: 5,
    borderRadius: 10,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerImg: {
    width: 240,
    backgroundColor: "transparent",
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
    backgroundColor: "#1A1A40",
    position: "absolute",
    bottom: 0,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 2,
    // borderColor: "#270082",
    borderBottomWidth: 0,
    borderTopWidth: 1,
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
    fontSize: 12,
    color: "white",
    textAlign: "center",
    margin: 2,
  },
  titleSelected: {
    borderBottomWidth: 2,
    borderColor: "#7A0BC0",
    borderBottomRightRadius: 200,
    borderBottomLeftRadius: 200,
    borderEndWidth: 1,
    borderEndColor: "green",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
// #1a2749
