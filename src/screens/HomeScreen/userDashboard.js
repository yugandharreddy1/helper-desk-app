import React, { useEffect, useState } from "react";
import axios from "axios";

import { SafeAreaView, StyleSheet, View } from "react-native";
import { firebase } from "../../firebase/config";
import {
  HStack,
  VStack,
  Stack,
  Center,
  NativeBaseProvider,
  Avatar,
  ScrollView,
  Image,
  Text,
  Checkbox,
  AspectRatio,
  Container,
  FormControl,
  IconButton,
  Button,
  Divider,
  Icon,
  Input,
  Box,
  Heading,
} from "native-base";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import { DataTable } from "react-native-paper";
export default function Userdashboard(props) {
  const [groupValues, setGroupValues] = React.useState([]);

  const getSelectedGroupValue = () => {
    if (groupValues.length === 0) return "[]";
    let arrayString = groupValues.reduce(
      (accumulator, currentValue) => accumulator + ", " + currentValue
    );
    return "[" + arrayString + "]";
  };
  const [Activitys, setActivitys] = React.useState([]);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setdob] = useState("");
  const [city, setcity] = useState("");
  const [aboutme, setaboutme] = useState("");
  const [profession, setprofession] = useState("");
  const [user, setuser] = useState({});
  const HeadTable = [
    "eventId",
    "eventName",
    "activityName",
    "noOfPeople",
    "eventStartDate",
    "eventEndDate",
    "activityTime",
    "activityAllUsers",
    "activityBooked",
    "activityBookedUser",
  ];
  const [tasks, setTasks] = React.useState([]);
  useEffect(() => {
    const eventRef = firebase
      .firestore()
      .collection("Helper-app-data")
      .doc("Events")
      .get()
      .then((snapshot) => {
        const data = snapshot.data();
        console.log("data");
        console.log(snapshot.id, data.eventlist);
        setActivitys(data.teamList.sort());
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });

    const userID = props.route.params.id;
    const usersRef = firebase.firestore().collection("users");
    usersRef
      .doc(userID)
      .get()
      .then((snapshot) => {
        const user = snapshot.data();
        setuser(user);
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });

    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    const apiUrl = "http://localhost:9001/events/";
    axios.get(apiUrl).then((repos) => {
      console.log(repos.data);
      setTasks(repos.data);
    });
  }, []);

  const saveuser = () => {
    const userID = props.route.params.id;
    const usersRef = firebase.firestore().collection("users");
    usersRef.doc(userID).update({
      city: city,
      dob: dob,
      aboutme: aboutme,
      profession: profession,
    });

    alert("user data Saved/Updated");
  };

  return (
    <NativeBaseProvider>
      <Center rounded="lg" p={7} flex={1}>
        <ScrollView>
          <Stack space={3}>
            {/* <Heading>HStack</Heading> */}
            <HStack space={3} divider={<Divider />}>
              <VStack space={3} alignItems="center">
                <Container
                  space={4}
                  p={[4, 4, 8]}
                  bg="white"
                  safeArea
                  minHeight={"80%"}
                  minWidth={"100%"}
                  bg="emerald.50"
                  rounded="md"
                  shadow={3}
                >
                  {" "}
                  <Heading size="lg" color="primary.500">
                    User's Profile
                  </Heading>
                  <Heading color="muted.400" size="xs">
                    Edit/Update Profile
                  </Heading>
                  <VStack>
                    <HStack space={6}>
                      <VStack space={3}>
                        <Text bold>Fill Name</Text>
                        <Input
                          w="100%"
                          mx={3}
                          onChangeText={(v) => setFullName(v)}
                          placeholder={user.fullName}
                          value={user.fullName}
                          _light={{
                            placeholderTextColor: "blueGray.400",
                          }}
                          _dark={{
                            placeholderTextColor: "blueGray.50",
                          }}
                        />
                      </VStack>
                      <VStack space={3}>
                        <Text bold>Email Id</Text>
                        <Input
                          w="100%"
                          mx={3}
                          onChangeText={(v) => setEmail(v)}
                          placeholder={user.email}
                          _light={{
                            placeholderTextColor: "blueGray.400",
                          }}
                          _dark={{
                            placeholderTextColor: "blueGray.50",
                          }}
                        />
                      </VStack>
                      <VStack space={3}>
                        <Text bold>DOB</Text>
                        <Input
                          w="100%"
                          mx={3}
                          onChangeText={(v) => setdob(v)}
                          placeholder={user.dob}
                          _light={{
                            placeholderTextColor: "blueGray.400",
                          }}
                          _dark={{
                            placeholderTextColor: "blueGray.50",
                          }}
                        />
                      </VStack>
                      <VStack space={3}>
                        <Text bold>City</Text>
                        <Input
                          w="100%"
                          mx={3}
                          onChangeText={(v) => setcity(v)}
                          placeholder={user.city}
                          _light={{
                            placeholderTextColor: "blueGray.400",
                          }}
                          _dark={{
                            placeholderTextColor: "blueGray.50",
                          }}
                        />
                      </VStack>
                    </HStack>
                    <VStack space={3}>
                      <Text bold>About Me</Text>
                      <Input
                        minWidth="100%"
                        mx={3}
                        onChangeText={(v) => setaboutme(v)}
                        placeholder={user.aboutme}
                        _light={{
                          placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                          placeholderTextColor: "blueGray.50",
                        }}
                      />
                    </VStack>
                    <VStack space={3}>
                      <Text bold>Profession</Text>
                      <Input
                        minWidth="100%"
                        mx={3}
                        onChangeText={(v) => setprofession(v)}
                        placeholder={user.profession}
                        _light={{
                          placeholderTextColor: "blueGray.400",
                        }}
                        _dark={{
                          placeholderTextColor: "blueGray.50",
                        }}
                      />
                    </VStack>
                    <Divider />
                    <VStack space={3}>
                      <Text bold>
                        Volunteering Activity Interest 's to select
                      </Text>
                      <Container flexWrap="wrap">
                        <Checkbox.Group
                          colorScheme="green"
                          onChange={(values) => {
                            setGroupValues(values || []);
                          }}
                        >
                          {Activitys.map((item) => (
                            <Checkbox value={item} my={1}>
                              {item}
                            </Checkbox>
                          ))}
                        </Checkbox.Group>
                      </Container>
                      {/* <Text fontSize="md" bold>
                          {getSelectedGroupValue()}
                        </Text> */}
                    </VStack>
                  </VStack>
                  <Box alignSelf="flex-end">
                    <Button
                      onPress={() => saveuser()}
                      startIcon={
                        <Icon
                          as={MaterialCommunityIcons}
                          name="email"
                          size={5}
                        />
                      }
                    >
                      Update/Submit
                    </Button>
                  </Box>
                </Container>

                <Container
                  bg="white"
                  safeArea
                  p={2}
                  minHeight={"100%"}
                  minWidth={"100%"}
                  bg="emerald.50"
                  rounded="md"
                  shadow={3}
                >
                  <Heading size={["md", "lg", "md"]} noOfLines={2}>
                    Your Volunteering History
                  </Heading>
                  <ScrollView>
                    <DataTable>
                      <DataTable.Header>
                        {HeadTable.map((item) => (
                          <DataTable.Title>
                            {" "}
                            <Heading color="muted.400" size="xs">
                              {item}
                            </Heading>
                          </DataTable.Title>
                        ))}
                      </DataTable.Header>
                      {tasks.map((item) => (
                        <DataTable.Row>
                          <DataTable.Cell>{item.eventId}</DataTable.Cell>
                          <DataTable.Cell>{item.eventName}</DataTable.Cell>
                          <DataTable.Cell>{item.activityName}</DataTable.Cell>
                          <DataTable.Cell>{item.noOfPeople}</DataTable.Cell>
                          <DataTable.Cell>{item.eventStartDate}</DataTable.Cell>
                          <DataTable.Cell>{item.eventEndDate}</DataTable.Cell>
                          <DataTable.Cell>{item.activityTime}</DataTable.Cell>
                          <DataTable.Cell>
                            {item.activityAllUsers}
                          </DataTable.Cell>
                          <DataTable.Cell>
                            {String(item.activityBooked)}
                          </DataTable.Cell>
                          <DataTable.Cell>
                            {item.activityBookedUser}
                          </DataTable.Cell>
                        </DataTable.Row>
                      ))}
                    </DataTable>
                  </ScrollView>
                </Container>
              </VStack>
              <Center
                bg="emerald.100"
                size={300}
                rounded="md"
                _text={{
                  color: "white",
                }}
                shadow={3}
              >
                <Box bg="white" shadow={2} rounded="lg" maxWidth="90%">
                  <Image
                    source={{
                      uri: "https://sample-example.nativebase.io/static/media/dawki-river.ebbf5434.png",
                    }}
                    alt="image base"
                    resizeMode="cover"
                    height={150}
                    roundedTop="md"
                  />
                  <Center flex={1}>
                    <Avatar size="xl" bg="emerald.100">
                      <Heading size={["md", "lg", "md"]} noOfLines={2}>
                        Y
                      </Heading>
                      <Avatar.Badge bg={"red.200"} />
                    </Avatar>
                  </Center>
                  <Stack space={4} p={[4, 4, 8]}>
                    <Heading size={["md", "lg", "md"]} flex={1}>
                      Yugandhar reddy
                    </Heading>
                    <Text
                      lineHeight={[5, 5, 7]}
                      noOfLines={[4, 4, 2]}
                      color="gray.700"
                    >
                      About Me...
                    </Text>
                  </Stack>
                </Box>
              </Center>
            </HStack>
          </Stack>
        </ScrollView>
      </Center>
    </NativeBaseProvider>
  );
}
