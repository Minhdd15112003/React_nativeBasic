import BouncyCheckbox from "react-native-bouncy-checkbox";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Image,
  Pressable,
  TouchableHighlight,
} from "react-native";

const Sigin = ({ navigation }) => {
  const [username, setusername] = useState("");
  const [passwd, setpasswd] = useState("");
  const [passwdA, setpasswdA] = useState("");
  const doLogin = () => {
    // kiểm tra hợp lệ dữ liệu
    if (username.length == 0) {
      alert("Chưa nhập Username");
      return navigation.navigate("Sigin");
    }
    if (passwd.length == 0) {
      alert("Chưa nhập Password");
      return navigation.navigate("Sigin"); // lệnh return để thoát hàm login
    }
    if (passwdA != passwd) {
      alert("Yêu cầu nhập đúng Password");
      return navigation.navigate("Sigin");
    }

      let obj = { username: username, password: passwd };
      let url_api = "http://26.92.0.60:3000/tb_users";
  
      fetch(url_api, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          if (res.ok) {
            alert("Đăng kí thành công");
            navigation.navigate("Login");
          } else {
            alert("Đăng kí thành công");
          }
        })
        .catch((ex) => {
          console.log("====================================");
          console.log(ex);
          console.log("====================================");
        });
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}> Sigin Account</Text>
      <View style={styles.edText}>
        <Text style={styles.inputTitte}> Tài Khoản</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setusername}
        />
      </View>

      <View style={styles.EdText}>
        <Text style={styles.inputTitte}> Mật khẩu </Text>
        <TextInput
          style={styles.input}
          value={passwd}
          onChangeText={setpasswd}
          textContentType="password"
          secureTextEntry={true}
        />
      </View>

      <View style={styles.EdText}>
        <Text style={styles.inputTitte}>Nhập Lại Mật khẩu </Text>
        <TextInput
          style={styles.input}
          onChangeText={(txt) => {
            setpasswdA(txt);
          }}
          textContentType="password"
          secureTextEntry={true}
        />
      </View>

      <View style={[styles.policy, { justifyContent: "space-between" }]}>
        <View style={styles.policy}>
          <BouncyCheckbox
            fillColor="blue"
            unfillColor="#FFFFFF"
            iconStyle={{ borderColor: "red" }}
            innerIconStyle={{ borderWidth: 2 }}
            textStyle={{ color: "black" }}
          />
          <Text>Remeber me</Text>
        </View>
        <Text>Forgot the password?</Text>
      </View>

      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#ffffff"
        onPress={() => {
          doLogin();
        }}
      >
        <View style={styles.BtnLogin}>
          <Text style={styles.textLogin}>Login Account</Text>
        </View>
      </TouchableHighlight>

      <View
        style={{ alignItems: "center", margin: 22, justifyContent: "center" }}
      >
        <Text>Or continue with</Text>
      </View>

      <View style={styles.btnFlex}>
        <View style={styles.btnSocial}>
          <Pressable>
            <Image style={styles.imgScoial} source={require("../img/fb.png")} />
          </Pressable>
          <Text>Facebook</Text>
        </View>

        <View style={styles.btnSocial}>
          <Pressable>
            <Image
              style={styles.imgScoial}
              source={require("../img/google.png")}
            />
          </Pressable>
          <Text>Google</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: 'center'
  },
  title: {
    marginBottom: 24,
    fontSize: 30,
    fontWeight: "bold",
  },

  EdText: {
    color: "back",
  },

  input: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
  },

  policy: {
    flexDirection: "row",
    marginVertical: 8,
    alignItems: "center",
    color: "black",
  },

  BtnLogin: {
    height: 48,
    backgroundColor: "purple",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  textLogin: {
    color: "#ffff",
    fontSize: 22,
    fontWeight: "bold",
  },
  imgScoial: {
    width: 21,
    height: 21,
    marginEnd: 10,
  },
  btnFlex: {
    flexDirection: "row",
  },
  btnSocial: {
    marginEnd: 10,
    flexDirection: "row",
    width: 174,
    height: 48,
    backgroundColor: "#EEF1F4",
    marginTop: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  createAccount: {
    textAlign: "center",
    marginTop: 22,
  },
});

export default Sigin;
