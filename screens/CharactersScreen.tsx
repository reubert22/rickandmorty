import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  ScrollView,
  Pressable,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { RootTabScreenProps } from "../types";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import { useGetCharacters } from "../hooks/useGetCharacters";
import { useGetLocation } from "../hooks/useGetLocation";
import { usePagination } from "../hooks/usePagination";

export default function CharactersScreen({
  navigation,
}: RootTabScreenProps<"CharactersTab">) {
  const [selected, setSelected] = useState<number>(0);
  const [saved, setSaved] = useState(false);
  const { characters, info, fetchCharacters } = useGetCharacters();
  const { locations, fetchLocation } = useGetLocation();
  const { page, increasePage } = usePagination();

  const getCharacters = (page: number) =>
    fetchCharacters(
      `https://rickandmortyapi.com/api/character?page=${page}&name=`
    );

  const getLocations = () =>
    fetchLocation("https://rickandmortyapi.com/api/location");

  useEffect(() => {
    getCharacters(page);
    // getLocations();
  }, [page]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.greetings}>
            <View style={styles.eyebrow}>
              {/* <FontAwesome
                name="child"
                size={15}
                color={Colors.paletteOne.purple}
              /> */}
              <Text style={styles.eyebrowTitle}>Rick and Morty</Text>
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

        {/* <View style={styles.menu}>
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
                    numberOfLines={1}
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
        </View> */}

        {/* <View style={styles.eyebrow}>
          <FontAwesome
            name="child"
            size={15}
            color={Colors.paletteOne.purple}
          />
          <Text style={styles.eyebrowTitle}>Characters</Text>
        </View> */}

        <View style={styles.containerCharacters}>
          <FlatList
            data={characters}
            onEndReachedThreshold={0.1}
            onEndReached={() => increasePage()}
            ListFooterComponent={() => (
              <View style={styles.characterFooter}>
                <ActivityIndicator color={Colors.paletteOne.purple} />
              </View>
            )}
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
                  <Image
                    style={styles.img}
                    source={{ uri: item.image || "" }}
                  />
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: Colors.paletteOne.navy,
    height: "80%",
  },
  header: {
    backgroundColor: Colors.transparent,
    height: 180,
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 30,
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
    height: 80,
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 15,
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
    height: 50,
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 15,
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
    height: 450,
    width: "100%",
    paddingVertical: 5,
    paddingRight: 0,
  },
  characterFooter: {
    backgroundColor: Colors.transparent,
    width: 100,
    height: 350,
    alignItems: "center",
    justifyContent: "center",
  },
  listItems: {
    backgroundColor: Colors.transparent,
    height: "80%",
    position: "relative",
    alignItems: "center",
    marginLeft: 15,
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
    // marginLeft: 10,
    fontFamily: Fonts.shadowsInto,
    letterSpacing: 1,
    lineHeight: 20,
  },
  title: {
    fontSize: 12,
    color: Colors.white,
    textAlign: "center",
    letterSpacing: 0.3,
  },
  titleSelected: {
    fontWeight: "600",
    textDecorationStyle: "solid",
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
