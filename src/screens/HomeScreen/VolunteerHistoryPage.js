import * as React from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";

const VolunteerHistoryPage = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={styles.footerHeading}>volunteerConnect</Text>
        <Text style={styles.footerText}>www.volunteerConnect.com</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontSize: 18,
    textAlign: "center",
  },
  footerHeading: {
    fontSize: 18,
    textAlign: "center",
    color: "grey",
  },
  footerText: {
    fontSize: 16,
    textAlign: "center",
    color: "grey",
  },
});

export default VolunteerHistoryPage;
