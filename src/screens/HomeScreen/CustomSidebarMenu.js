import React, { useEffect } from "react";
import { SafeAreaView, View, StyleSheet, Text } from "react-native";

import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
//import { Text } from "native-base";
const CustomSidebarMenu = (props) => {
  const { state, descriptors, navigation } = props;
  let lastGroupName = "";
  let newGroup = true;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text bold position="absolute" color="white" top={0} m={[4, 4, 8]}>
        Volunteer Connect
      </Text>
      <DrawerContentScrollView {...props}>
        {state.routes.map((route) => {
          const { drawerLabel, activeTintColor, groupName } =
            descriptors[route.key].options;
          if (lastGroupName !== groupName) {
            newGroup = true;
            lastGroupName = groupName;
          } else newGroup = false;
          return (
            <>
              {newGroup ? (
                <View style={styles.sectionContainer}>
                  <Text key={groupName} style={{ marginLeft: 16 }}>
                    {groupName}
                  </Text>
                  <View style={styles.sectionLine} />
                </View>
              ) : null}
              <DrawerItem
                key={route.key}
                label={({ color }) => (
                  <Text style={{ color }}>{drawerLabel}</Text>
                )}
                focused={
                  state.index ===
                  state.routes.findIndex((e) => e.name === route.name)
                }
                activeTintColor={activeTintColor}
                onPress={() => navigation.navigate(route.name)}
              />
            </>
          );
        })}
      </DrawerContentScrollView>
      <Text style={{ fontSize: 16, textAlign: "center", color: "grey" }}>
        www.volunteerConnect.com
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  sectionLine: {
    backgroundColor: "gray",
    flex: 1,
    height: 1,
    marginLeft: 10,
    marginRight: 20,
  },
});

export default CustomSidebarMenu;
