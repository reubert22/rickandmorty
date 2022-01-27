import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";

import { RootTabScreenProps } from "../types";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import { CharactersType } from "../types/Characters";
import { LocationsType } from "../types/Locations";
import Fonts from "../constants/Fonts";

export default function CharactersScreen({
  navigation,
}: RootTabScreenProps<"CharactersTab">) {
  const [characters, setAllCharacters] = useState<CharactersType[]>([]);
  const [locations, setLocations] = useState<LocationsType[]>([]);
  const [selected, setSelected] = useState<number>(0);
  const [saved, setSaved] = useState(false);

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
      <View style={styles.header}>
        <View style={styles.greetings}>
          <View style={styles.eyebrow}>
            <FontAwesome
              name="child"
              size={15}
              color={Colors.paletteOne.purple}
            />
            <Text style={styles.eyebrowTitle}>Characters</Text>
          </View>
          <View style={styles.seeAllContainer}>
            <Text style={styles.see}>See,</Text>
            <Text style={styles.all}>All here!</Text>
          </View>
        </View>
        <View style={styles.profilePicture}>
          <FontAwesome name="user" size={20} color="white" />
        </View>
      </View>

      <View style={styles.search}>
        <TextInput
          style={styles.input}
          onChangeText={() => {}}
          value={""}
          placeholder="Search Characters"
          keyboardType="web-search"
          placeholderTextColor={Colors.whiteOpacity}
        />
        <View style={styles.filters}>
          <FontAwesome name="sliders" size={30} color="white" />
        </View>
      </View>

      <View style={styles.menu}>
        <FlatList
          data={locations}
          renderItem={({ item }) => (
            <View style={styles.menuList}>
              <Pressable
                onPress={() => {
                  setSelected(item.id === selected ? 0 : item.id);
                }}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <Text
                  numberOfLines={2}
                  style={[
                    styles.title,
                    item.id === selected ? styles.titleSelected : {},
                  ]}
                >
                  {item.name}
                </Text>
              </Pressable>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.containerCharacters}>
        <FlatList
          data={characters}
          renderItem={({ item }) => (
            <View style={styles.listItems}>
              <Pressable
                onPress={() => setSaved(!saved)}
                style={{
                  ...styles.bookmark,
                  opacity: saved ? 1 : 0.7,
                }}
              >
                <FontAwesome
                  name={saved ? "bookmark" : "bookmark-o"}
                  size={20}
                  color="white"
                />
              </Pressable>
              <View style={styles.containerStatus}>
                <Text
                  style={{
                    ...styles.status,
                    color: item.status === "Alive" ? "green" : "red",
                  }}
                >
                  {item.status}
                </Text>
              </View>
              <View style={styles.containerImg}>
                <Image style={styles.img} source={{ uri: item.image || "" }} />
              </View>
              <View
                style={{
                  ...styles.description,
                  borderColor:
                    item.gender === "Female"
                      ? Colors.paletteOne.pink
                      : Colors.paletteOne.lightNavy,
                }}
              >
                <Text numberOfLines={1} style={styles.name}>
                  {item.name}
                </Text>
                <View style={styles.containerSpeciesGender}>
                  <Text style={styles.species}>{item.species}, </Text>
                  <Text style={styles.gender}>{item.gender}</Text>
                </View>
                <View style={styles.containerLocation}>
                  <Text numberOfLines={1} style={styles.location}>
                    From: {item.origin.name}
                  </Text>
                  <Text numberOfLines={1} style={styles.location}>
                    Location: {item.location.name}
                  </Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: Colors.paletteOne.navy,
    padding: 10,
  },
  header: {
    backgroundColor: Colors.transparent,
    height: "25%",
    width: "100%",
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 30,
    marginBottom: 10,
  },
  greetings: {
    backgroundColor: Colors.transparent,
    height: "100%",
    width: "50%",
    paddingTop: 15,
    borderRadius: 5,
  },
  eyebrow: {
    backgroundColor: Colors.transparent,
    flexDirection: "row",
    marginBottom: 10,
  },
  seeAllContainer: {
    backgroundColor: Colors.transparent,
  },
  see: {
    fontSize: 32,
    color: "#cecece",
    fontFamily: Fonts.shadowsInto,
    letterSpacing: 1,
  },
  all: {
    fontSize: 32,
    color: Colors.white,
    fontFamily: Fonts.permanentMarker,
    letterSpacing: 2,
  },
  profilePicture: {
    backgroundColor: Colors.paletteOne.navy,
    borderColor: Colors.paletteOne.purple,
    borderWidth: 1,
    height: 50,
    width: 50,
    borderRadius: 25,
    padding: 15,
    marginTop: 10,
    alignItems: "center",
  },
  search: {
    backgroundColor: Colors.transparent,
    height: "10%",
    width: "100%",
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    backgroundColor: Colors.paletteOne.navy,
    borderColor: Colors.paletteOne.purple,
    borderWidth: 1,
    height: "80%",
    width: "80%",
    padding: 5,
    borderRadius: 20,
    paddingHorizontal: 20,
    color: Colors.white,
    fontFamily: Fonts.robotoLight,
  },
  filters: {
    backgroundColor: Colors.paletteOne.navy,
    borderColor: Colors.paletteOne.purple,
    borderWidth: 1,
    height: "80%",
    width: "15%",
    padding: 5,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  menu: {
    backgroundColor: Colors.transparent,
    height: "10%",
    width: "100%",
    padding: 5,
    paddingRight: 0,
  },
  menuList: {
    backgroundColor: Colors.transparent,
    height: "100%",
    width: 100,
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  containerCharacters: {
    backgroundColor: Colors.transparent,
    height: "55%",
    width: "100%",
    padding: 5,
    paddingRight: 0,
    marginTop: 10,
  },
  listItems: {
    backgroundColor: Colors.transparent,
    marginRight: 20,
    height: "80%",
    position: "relative",
    alignItems: "center",
  },
  bookmark: {
    position: "absolute",
    top: 10,
    right: 15,
    backgroundColor: Colors.paletteOne.navy,
    height: 40,
    width: 40,
    padding: 5,
    borderRadius: 10,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerStatus: {
    position: "absolute",
    top: 5,
    left: 10,
    backgroundColor: Colors.transparent,
    padding: 5,
    borderRadius: 10,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  status: {
    fontSize: 14,
    fontFamily: Fonts.spaceMono,
  },
  containerImg: {
    width: 240,
    backgroundColor: Colors.transparent,
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
    backgroundColor: Colors.paletteOne.navy,
    position: "absolute",
    justifyContent: "center",
    bottom: -5,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingTop: 3,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  name: {
    fontSize: 16,
    color: Colors.white,
    fontFamily: Fonts.robotoLight,
    fontWeight: "bold",
  },
  containerSpeciesGender: {
    backgroundColor: Colors.transparent,
    flexDirection: "row",
    alignItems: "center",
  },
  gender: {
    fontSize: 14,
    color: Colors.whiteOpacity,
    fontFamily: Fonts.robotoLight,
  },
  species: {
    fontSize: 14,
    color: Colors.whiteOpacity,
    fontFamily: Fonts.robotoLight,
  },
  containerLocation: {
    marginTop: 5,
    backgroundColor: Colors.transparent,
  },
  location: {
    fontSize: 12,
    color: Colors.whiteOpacity,
    fontFamily: Fonts.robotoLight,
  },
  eyebrowTitle: {
    fontSize: 14,
    color: Colors.whiteOpacity,
    marginLeft: 10,
    fontFamily: Fonts.shadowsInto,
    letterSpacing: 1,
    lineHeight: 20,
  },
  title: {
    fontSize: 12,
    color: Colors.white,
    textAlign: "center",
    margin: 2,
    fontFamily: Fonts.robotoLight,
    letterSpacing: 0.5,
  },
  titleSelected: {
    borderBottomWidth: 2,
    borderColor: Colors.paletteOne.purple,
    borderBottomRightRadius: 200,
    borderBottomLeftRadius: 200,
    borderEndWidth: 1,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});