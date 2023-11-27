import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const Profile = () => {
  const [loginInfo, setloginInfo] = useState({});


  // const getLoginInfo = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("loginInfo");
  //     if (value !== null) {
  //       setloginInfo(JSON.parse(value));
  //       const loginData = JSON.parse(value);
  //       setRole(loginData.role); // Lưu trữ quyền của người dùng
  //       setloginInfo(loginData);
  //     }
  //   } catch (error) {
  //     console.log("====================================");
  //     console.log(error);
  //     console.log("====================================");
  //   }
  // };

  //  React.useEffect(() => {
  //      const unsubscribe = props.navigation.addListener('focus', () => {
  //          // khi màn hình được active thì lệnh trong này hoạt động
  //         getLoginInfo();
  //      });
  
  //      return unsubscribe;
  //    }, [props.navigation]);


  return (
    <View style={styles.container}>
      <Text style={styles.name}>Họ và tên: [Đào Duy Minh]</Text>
      <Text style={styles.email}>Mã Sinh Viên: [Minhddph25260]</Text>
      <Text style={styles.phone}>Số điện thoại: [0988885990]</Text>
      {/* Các thông tin khác */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 18,
  },
  phone: {
    fontSize: 18,
  },
});

export default Profile
