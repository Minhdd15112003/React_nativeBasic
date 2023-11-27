import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import * as MailComposer from "expo-mail-composer";
import axios from "axios";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Mailer from "react-native-mail";

const NewPost = ({ navigation }) => {
  const [title, settitle] = useState("");
  const [author, setauthor] = useState("");
  const [content, setcontent] = useState("");
  const [image, setimage] = useState("");
  const [statuss, setstatuss] = useState("");

  const addPost = () => {
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

    if (statuss.length == 0) {
      alert("Chưa nhập statuss");
      return;
    }

    let url = "http://26.92.0.60:3000/tb_post";
    let obj = {
      title: title,
      author: author,
      content: content,
      image: image,
      statuss: statuss,
    };
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => {
        if (res.ok) {
          alert("add compte");
        } else {
          alert("add failed");
        }
      })
      .catch((error) => {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
      });
  };

  const guiEmail = () => {
    const emailData = {
      Username: "minhtit006@gmail.com",
      Password: "AAD4225CBDAC8DDDF171FE027A4B17909745",
      To: "minhtit105@gmail.com",
      From: "minhtit105@gmail.com",
      Subject: "This is the subject",
      Body: "And this is the body",
      Action: "SendEmail",
    };

    axios
      .post("http://smtp.elasticemail.com/", emailData)
      .then((response) => {
        if (response.status === 200) {
          console.log("Email đã được gửi thành công");
        } else {
          console.error("Lỗi khi gửi email, mã trạng thái:", response.status);
        }
      })
      .catch((error) => {
        console.error("Lỗi khi gửi email", error);
      });
  };

  return (
    <ScrollView style={styles.scrollView}>
      <KeyboardAvoidingView style={styles.screen} behavior="padding">
        <View style={styles.container}>
          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>Title</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="Title"
              underlineColorAndroid="transparent"
              value={title}
              onChangeText={(text) => settitle(text)}
            />
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>Content</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="content"
              underlineColorAndroid="transparent"
              value={content}
              onChangeText={(text) => setcontent(text)}
            />
          </View>

          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>Author</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="author"
              underlineColorAndroid="transparent"
              value={author}
              onChangeText={(text) => setauthor(text)}
            />
          </View>

          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>Image</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputs}
              placeholder="image"
              underlineColorAndroid="transparent"
              value={image}
              onChangeText={(text) => setimage(text)}
            />
          </View>

          <View style={styles.labelContainer}>
            <Text style={styles.labelText}>status</Text>
          </View>
          <View style={styles.picker}>
            <Picker selectedValue={statuss} onValueChange={setstatuss}>
              <Picker.Item label="" value="" />
              <Picker.Item label="Trính trị" value="trinhtri" />
              <Picker.Item label="Xã hội" value="xahoi" />
              <Picker.Item label="Đời sống" value="doisong" />
              <Picker.Item label="Thời tiết" value="thoitiet" />
            </Picker>
          </View>

          <TouchableOpacity
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={() => {
              navigation.navigate("DashboardScreen");
              addPost();
              guiEmail();
            }}
          >
            <Text style={styles.loginText}>Post</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default NewPost;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#ffffff0",
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  container: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },

  labelContainer: {
    alignSelf: "flex-start",
    marginLeft: 16,
  },
  labelText: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 5,
    color: "blue",
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    width: 350,
    height: 50,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#808080",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1,
    paddingRight: 15,
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: "transparent",
  },
  loginButton: {
    backgroundColor: "blue",
  },

  loginText: {
    color: "white",
  },
  picker: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: 350,
    height: 50,
    marginBottom: 10,
    shadowColor: "#808080",
    elevation: 5,
  },
});
