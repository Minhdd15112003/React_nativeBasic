import { Button, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import WebView from "react-native-webview";
import { FlatList } from "react-native";
import { Image } from "react-native";
import { TouchableHighlight } from "react-native";
import { Linking } from "react-native";

const Fb = (props) => {

  const { item } = props.route.params;

const share = async ()=>{
  const supportedURL = "https://www.facebook.com/share.php?u=http://26.92.0.60:3000/tb_post" + item.id;
  await Linking.openURL(supportedURL);

}

  return (
    <View style={styles.container}>
      <View style={styles.Vedit}>
        <Text style={styles.author}>{item.author}</Text>
      </View>
      <View style={styles.baiViet}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.content}>{item.content}</Text>
        </View>
      </View>
      <View style={styles.image}>
        <Image style={styles.img} source={{ uri: item.image }} />
      </View>
      <Text style={styles.createdAt}>{item.createdAt}</Text>

      <Button title="Share" onPress={share}>

      </Button>
    </View>
  );
};

export default Fb;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F1F1FE",
    margin: 15,
    padding: 10,
    justifyContent: "center",
    borderRadius: 10,
  },
  btndd: {
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    paddingHorizontal: 35,
    marginHorizontal: 5,
    borderColor: "#888BF4",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  menu: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
    marginHorizontal: 20,
  },

  Vedit: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingBottom: 10,
  },

  space: {
    justifyContent: "space-between",
    flexDirection: "row",
  },

  baiViet: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    marginTop: 10,
    marginBottom: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 300,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  author: {
    fontWeight: "bold",
    fontSize: 20,
  },

  btnED: {
    borderRadius: 80,
    marginHorizontal: 5,
    width: 61,
    height: 32,
    borderColor: "#888BF4",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    paddingLeft: 20,
    fontWeight: "bold",
    fontSize: 24,
  },
  content: {
    paddingTop: 5,
    paddingLeft: 20,
  },

  VfollowShare: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 5,
    marginStart: 220,
  },
});
