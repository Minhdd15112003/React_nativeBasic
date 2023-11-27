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
import Sigin from "./Sigin";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [username, setusername] = useState("");
  const [passwd, setpasswd] = useState("");

  const doLogin = () => {
    // kiểm tra hợp lệ dữ liệu
    if (username.length == 0) {
      alert("Chưa nhập Username");
      return;
    }
    if (passwd.length == 0) {
      alert("Chưa nhập Password");
      return; // lệnh return để thoát hàm login
    }

    let url_check_login =
      "http://26.92.0.60:3000/tb_users?username=" + username;
    fetch(url_check_login)
      .then((res) => {
        return res.json();
      })
      .then(async (res_login) => {
        if (res_login.length != 1) {
          alert("Sai username hoặc lỗi trùng lặp dữ liệu");
          return;
        } else {
          let obj = res_login[0];
          if (obj.password != passwd) {
            alert("Sai password");
            return;
          } else {
            try {
              await AsyncStorage.setItem("loginInfo", JSON.stringify(obj));
              navigation.navigate("DashboardScreen");
            } catch (e) {
              console.log("====================================");
              console.log(e);
              console.log("====================================");
            }
          }
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Login Account</Text>

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
          secureTextEntry={false}
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
        onPress={doLogin}
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

      <View style={styles.createAccount}>
        <Text onPress={() => navigation.navigate("Sigin")}>
          don't have an Account ?
        </Text>
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
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});

export default Login;
