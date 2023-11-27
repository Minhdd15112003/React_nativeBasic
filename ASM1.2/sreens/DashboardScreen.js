import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  ActivityIndicator,
  Modal,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import stylesDialogEdit from "../Styles/diaLogEdit";
import Mailer from "react-native-mail";

const DashboardScreen = (props) => {
  const [feed, setFeed] = useState([]);
  const [loginInfo, setloginInfo] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [role, setRole] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isFollow, setisFollow] = useState(false);

  const [title, settitle] = useState("");
  const [author, setauthor] = useState("");
  const [content, setcontent] = useState("");
  const [image, setimage] = useState("");

  const getListFeed = async () => {
    var url = "http://26.92.0.60:3000/tb_post";
    try {
      const response = await fetch(url);
      const json = await response.json();
      setFeed(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getListFeedTrinhtri = async () => {
    var url = "http://26.92.0.60:3000/tb_post?statuss=trinhtri";
    try {
      const response = await fetch(url);
      const json = await response.json();
      setFeed(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getListFeedXahoi = async () => {
    var url = "http://26.92.0.60:3000/tb_post?statuss=xahoi";
    try {
      const response = await fetch(url);
      const json = await response.json();
      setFeed(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getListFeedDoisong = async () => {
    var url = "http://26.92.0.60:3000/tb_post?statuss=doisong";
    try {
      const response = await fetch(url);
      const json = await response.json();
      setFeed(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getListFeedThoitiet = async () => {
    var url = "http://26.92.0.60:3000/tb_post?statuss=thoitiet";
    try {
      const response = await fetch(url);
      const json = await response.json();
      setFeed(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getLoginInfo = async () => {
    try {
      const value = await AsyncStorage.getItem("loginInfo");
      if (value !== null) {
        setloginInfo(JSON.parse(value));
        const loginData = JSON.parse(value);
        setRole(loginData.role); // Lưu trữ quyền của người dùng
        setloginInfo(loginData);
      }
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };

  const editFeed = (item) => {
    if (title.length == 0) {
      alert("Chưa nhập title");
      return;
    }
    if (author.length == 0) {
      alert("Chưa nhập author");
      return;
    }
    if (content.length == 0) {
      alert("Chưa nhập content");
      return;
    }
    if (image.length == 0) {
      alert("Chưa nhập image");
      return;
    }

    let obj = {
      title: title,
      author: author,
      content: content,
      image: image,
    };
    let url = "http://26.92.0.60:3000/tb_post/" + item.id;

    fetch(url, {
      method: "PUT", // or PATCH
      headers: { "content-type": "application/json" },
      body: JSON.stringify(obj),
    })
      .then((res) => {
        if (res.ok) {
          setModalVisible(!modalVisible);
          alert("Edit compte");
        } else {
          alert("Edit failed");
        }
      })
      .catch((error) => {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      });
  };

  const deleteFeed = async (item) => {
    let urlDele = "http://26.92.0.60:3000/tb_post/" + item.id;
    fetch(urlDele, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("delete compte");
          getListFeed();
        } else {
          alert("delete failed");
        }
        // handle error
      })
      .catch((error) => {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      });
  };

  const follow = () => {
    setisFollow(!isFollow);
    if (isFollow) {
      Alert.alert("Follow", "Bạn đã UnFollow");
    }
    
  }
  
  const getChiTiet = async (item) =>{
    console.log(item);
    var url = "http://26.92.0.60:3000/tb_post" + item.id;
    try {
      const response = await fetch(url);
      const json = await response.json();
      setFeed(json);
      props.navigation.navigate("Fb", { item }); 
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      // khi màn hình được active thì lệnh trong này hoạt động
      getListFeed();
      getLoginInfo();
    });

    return unsubscribe;
  }, [props.navigation]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <View style={stylesDialogEdit.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={stylesDialogEdit.centeredView}>
              <View style={stylesDialogEdit.modalView}>
                <View style={stylesDialogEdit.labelContainer}>
                  <Text style={stylesDialogEdit.labelText}>Title</Text>
                </View>
                <View style={stylesDialogEdit.inputContainer}>
                  <TextInput
                    style={stylesDialogEdit.inputs}
                    placeholder="Title"
                    underlineColorAndroid="transparent"
                    value={title}
                    onChangeText={(text) => settitle(text)}
                  />
                </View>
                <View style={stylesDialogEdit.labelContainer}>
                  <Text style={stylesDialogEdit.labelText}>Content</Text>
                </View>
                <View style={stylesDialogEdit.inputContainer}>
                  <TextInput
                    style={stylesDialogEdit.inputs}
                    placeholder="content"
                    underlineColorAndroid="transparent"
                    value={content}
                    onChangeText={(text) => setcontent(text)}
                  />
                </View>

                <View style={stylesDialogEdit.labelContainer}>
                  <Text style={stylesDialogEdit.labelText}>Author</Text>
                </View>
                <View style={stylesDialogEdit.inputContainer}>
                  <TextInput
                    style={stylesDialogEdit.inputs}
                    placeholder="author"
                    underlineColorAndroid="transparent"
                    value={author}
                    onChangeText={(text) => setauthor(text)}
                  />
                </View>

                <View style={stylesDialogEdit.labelContainer}>
                  <Text style={stylesDialogEdit.labelText}>Image</Text>
                </View>
                <View style={stylesDialogEdit.inputContainer}>
                  <TextInput
                    style={stylesDialogEdit.inputs}
                    placeholder="image"
                    underlineColorAndroid="transparent"
                    value={image}
                    onChangeText={(text) => setimage(text)}
                  />
                </View>

                <View style={{ flexDirection: "row" }}>
                  <Pressable
                    style={[
                      stylesDialogEdit.button,
                      stylesDialogEdit.buttonClose,
                    ]}
                    onPress={() => editFeed(item)}
                  >
                    <Text style={stylesDialogEdit.textStyle}>Edit Feed</Text>
                  </Pressable>

                  <Pressable
                    style={[
                      stylesDialogEdit.button,
                      stylesDialogEdit.buttonClose,
                    ]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={stylesDialogEdit.textStyle}>Exit</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>

        

        <View style={styles.Vedit}>
          <Text style={styles.author}>{item.author}</Text>

          <View style={styles.space}>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#888BF4"
              onPress={() => setModalVisible(true)}
              style={styles.btnED}
            >
              <Text style={{ color: "#888BF4" }}>Edit</Text>
            </TouchableHighlight>

            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#888BF4"
              onPress={() => deleteFeed(item)}
              style={styles.btnED}
            >
              <Text style={{ color: "#888BF4" }}>Delete</Text>
            </TouchableHighlight>
          </View>
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

        <View style={styles.VfollowShare}>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#888BF4"

            style={styles.btnED}
          >
            <Text style={{ color: "#888BF4" }}>Coment</Text>
          </TouchableHighlight>

          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#888BF4"
            onPress={() => {
              getChiTiet(item);
            }}
            style={styles.btnED}
          >
            <Text style={{ color: "#888BF4" }}>Chi tiết </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.bkg}>
      <View style={styles.Vadd}>
        {role === "admin" && (
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#888BF4"
            onPress={() => props.navigation.navigate("NewPost")}
            style={styles.btndd}
          >
            <Text style={{ color: "#888BF4" }}>Bạn đang nghĩ gì??</Text>
          </TouchableHighlight>
        )}

        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#888BF4"
          style={{...styles.btndd, backgroundColor: isFollow ? "blue" : null}}
          onPress={follow}
        >
          <Text style={{ color: "#888BF4" }}>follow</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.menu}>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#888BF4"
          onPress={() => getListFeed()}
          style={styles.btnED}
        >
          <Text style={{ color: "#888BF4" }}>Tất cả</Text>
        </TouchableHighlight>

        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#888BF4"
          onPress={() => getListFeedTrinhtri()}
          style={styles.btnED}
        >
          <Text style={{ color: "#888BF4" }}>Trính trị</Text>
        </TouchableHighlight>

        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#888BF4"
          onPress={() => getListFeedXahoi()}
          style={styles.btnED}
        >
          <Text style={{ color: "#888BF4" }}>Xã hội </Text>
        </TouchableHighlight>

        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#888BF4"
          onPress={() => getListFeedDoisong()}
          style={styles.btnED}
        >
          <Text style={{ color: "#888BF4" }}>Đời sống</Text>
        </TouchableHighlight>

        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#888BF4"
          onPress={() => getListFeedThoitiet()}
          style={styles.btnED}
        >
          <Text style={{ color: "#888BF4" }}>Thời tiết</Text>
        </TouchableHighlight>
      </View>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={feed}
          renderItem={renderItem}
          keyExtractor={(item_bv) => {
            return item_bv.id;
          }}
        />
      )}
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  bkg: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  Vadd: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  container: {
    backgroundColor: "#F1F1FE",
    margin: 15,
    padding: 10,
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
