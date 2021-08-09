import * as React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
//import { SecondPage, ThirdPage } from "./src/screens/";
import Home from "./Home";
import VolunteerHistoryPage from "./VolunteerHistoryPage";
import SendCoustomEmail from "./SendCoustomEmail";
import logo from "./Capture.JPG";
// Import Custom Sidebar
import CustomSidebarMenu from "./CustomSidebarMenu";

export default function HomeScreen(props) {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  const NavigationDrawerStructure = (props) => {
    //Structure for the navigatin Drawer
    const toggleDrawer = () => {
      //Props to open/close the drawer
      props.navigationProps.toggleDrawer();
    };

    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={toggleDrawer}>
          {/*Donute Button Image */}
          <Image
            source={{
              uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png",
            }}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  function homeScreenStack({ navigation }) {
    return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Admin Dashboard"
          component={Home}
          options={{
            title: "Admin Dashboard", //Set Header Title
            headerMode: "none",
            navigationOptions: {
              headerVisible: false,
            },
            headerStyle: {
              backgroundColor: "#f4511e", //Set Header color
            },
            headerTintColor: "#fff", //Set Header text color
            headerTitleStyle: {
              fontWeight: "bold", //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
    );
  }

  function VolunteerHistoryScreenStack({ navigation }) {
    return (
      <Stack.Navigator
        initialRouteName="Volunteer History"
        screenOptions={{
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),

          headerStyle: {
            backgroundColor: "#f4511e", //Set Header color
          },
          headerTintColor: "#fff", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      >
        <Stack.Screen
          name="Volunteer History"
          component={VolunteerHistoryPage}
          options={{
            title: "Volunteer History", //Set Header Title
            headerMode: "none",
            navigationOptions: {
              headerVisible: false,
            },
          }}
        />
      </Stack.Navigator>
    );
  }

  function SendCoustomEmailScreenStack({ navigation }) {
    return (
      <Stack.Navigator
        initialRouteName="SendCoustomEmail"
        screenOptions={{
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: "#f4511e", //Set Header color
          },
          headerTintColor: "#fff", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      >
        <Stack.Screen
          name="Send Coustom Email"
          component={SendCoustomEmail}
          options={{
            title: "Send Coustom Email", //Set Header Title
            headerMode: "none",
            navigationOptions: {
              headerVisible: false,
            },
          }}
        />
      </Stack.Navigator>
    );
  }

  function ActionBarIcon() {
    return (
      <Image
        source={{
          uri: "https://secure.gravatar.com/avatar/dbbab0050db2dbd84d4e2c844196ee0c?s=60&d=mm&r=g",
        }}
        style={{ width: 40, height: 40, borderRadius: 40 / 2, marginLeft: 15 }}
      />
    );
  }
  const userID = props.extraData.id;
  return (
    <NavigationContainer independent={true}>
      {userID == "OhgawOXViSfOCwYucryAgouIGWm1" ? (
        <Drawer.Navigator
          // For setting Custom Sidebar Menu
          drawerContent={(props) => <CustomSidebarMenu {...props} />}
        >
          <Drawer.Screen
            name="Admin Dashboard"
            options={{
              drawerLabel: "Admin Dashboard",
              activeTintColor: "#e91e63",
            }}
            component={homeScreenStack}
          />
          <Drawer.Screen
            name="Volunteer History"
            options={{
              drawerLabel: "Volunteer History",
              // Section/Group Name
              activeTintColor: "#e91e63",
            }}
            component={VolunteerHistoryScreenStack}
          />
          <Drawer.Screen
            name="Send Coustom Email"
            options={{
              drawerLabel: "Send Coustom Email",
              // Section/Group Name
              activeTintColor: "#e91e63",
            }}
            component={SendCoustomEmailScreenStack}
          />
        </Drawer.Navigator>
      ) : (
        <Drawer.Navigator
          // For setting Custom Sidebar Menu
          drawerContent={(props) => <CustomSidebarMenu {...props} />}
        >
          <Drawer.Screen
            name="User d"
            options={{
              drawerLabel: "Admin Dashboard",
              activeTintColor: "#e91e63",
            }}
            component={homeScreenStack}
          />
          <Drawer.Screen
            name="Volunteer History"
            options={{
              drawerLabel: "Volunteer History",
              // Section/Group Name
              activeTintColor: "#e91e63",
            }}
            component={VolunteerHistoryScreenStack}
          />
          <Drawer.Screen
            name="Send Coustom Email"
            options={{
              drawerLabel: "Send Coustom Email",
              // Section/Group Name
              activeTintColor: "#e91e63",
            }}
            component={SendCoustomEmailScreenStack}
          />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
}
