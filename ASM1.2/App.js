import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./sreens/Login";
import NewPost from "./sreens/NewPost";
import DashboardScreen from "./sreens/DashboardScreen";
import Sigin from "./sreens/Sigin";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import imagePath from "./imagePath";
import Profile from "./sreens/Profile";
import Fb from "./sreens/Fb";

export default function App() {
  const Stack = createNativeStackNavigator();

  const Tab = createBottomTabNavigator();

  function HomeStackScreen() {
    return (
      <Stack.Navigator initialRouteName="DashboardScreen">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="NewPost"
          component={NewPost}
          options={{ title: "Create Post" }}
        />
        <Stack.Screen
          name="DashboardScreen"
          component={DashboardScreen}
          options={{ title: "Dashboard" }}
        />
        <Stack.Screen
          name="Sigin"
          component={Sigin}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="Fb" component={Fb} />
      </Stack.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <StatusBar style="auto" />

      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return <Image source={imagePath.icHome} />;
            },
          }}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) => {
              return <Image source={imagePath.icProfile} />;
            },
          }}
        />

        <Tab.Screen
          name="Login"
          component={Login}
          options={{
            tabBarIcon: ({ focused }) => {
              return <Image source={imagePath.icLogin} />;
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
