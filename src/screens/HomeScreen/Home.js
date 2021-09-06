import React, { useEffect, useState } from "react";
import { firebase } from "../../firebase/config";
import { StyleSheet } from "react-native";
import axios from "axios";
import {
  NativeBaseProvider,
  Container,
  VStack,
  Select,
  CheckIcon,
  IconButton,
  Divider,
  HStack,
  Box,
  Heading,
  Checkbox,
  Text,
  Button,
  Icon,
  Input,
  useToast,
} from "native-base";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { DataTable } from "react-native-paper";
import logo from "./Capture.JPG";
export default function Home(props) {
  const HeadTable = [
    "eventId",
    "activityName",
    "activityDate",
    "activityTime",
    "activityAllUsers",
    "activityBooked",
    "activityBookedUser",
  ];
  const quantityValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const [noOfPeople, setnoOfPeople] = React.useState("");
  const [tasks, setTasks] = React.useState([]);
  const [eventName, seteventName] = React.useState("");
  const [Events, setEvents] = React.useState([]);
  const [activityName, setactivityName] = React.useState("");
  const [Activitys, setActivitys] = React.useState([]);
  const emailIds = [];
  const [eventStartDate, seteventStartDate] = useState("");
  const [eventEndDate, seteventEndDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [list, setList] = React.useState(emailIds);
  const [inputValue, setInputValue] = React.useState("");
  const addItem = (title: string) => {
    setList([
      ...list,
      {
        title: title,
      },
    ]);
    emailIds.concat({ title });
    console.log(emailIds);
  };
  const handleDelete = (index: number) => {
    const temp = list.filter((_, itemI) => itemI !== index);
    setList(temp);
  };
  useEffect(() => {
    const eventRef = firebase
      .firestore()
      .collection("Helper-app-data")
      .doc("Events")
      .get()
      .then((snapshot) => {
        const data = snapshot.data();
        console.log(snapshot.id, data.eventlist);
        setEvents(data.eventlist.sort());
        setActivitys(data.teamList.sort());
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });

    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    const apiUrl = "https://spring-boot-helper.herokuapp.com/events/";
    axios.get(apiUrl).then((repos) => {
      console.log(repos.data);
      setTasks(repos.data);
    });
  }, []);

  let getEvents = () => {
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    const apiUrl = "https://spring-boot-helper.herokuapp.com/events/";
    axios.get(apiUrl).then((repos) => {
      console.log(repos.data);
      setTasks(repos.data);
      setShowModal(true);
    });
  };

  const sendEvents = () => {
    for (let i = 0; i < groupValue.length; i++) {
      let json = JSON.stringify({
        eventName: eventName,
        activityName: activityName,
        noOfPeople: noOfPeople.valueOf(),
        eventStartDate: eventStartDate,
        eventEndDate: eventEndDate,
        activityTime: groupValue[i],
        activityAllUsers: JSON.stringify(list),
      });
      console.log(json.valueOf());
      // axios.defaults.headers.post["Content-Type"] = "application/json";
      // const apiUrl = "http://localhost:9001/events/setEvent";
      // axios.post(apiUrl, json).then((repos) => {
      //   console.log(repos.data);
      // });
      axios.defaults.headers.post["Content-Type"] = "application/json";
      axios({
        method: "post",
        url: "https://spring-boot-helper.herokuapp.com/events/setEvent",
        data: json,
        headers: {
          Accept: "application/json ,text/plain, */*",
        },
      });
    }
    alert("Sucessfuly sent");
  };

  const [groupValue, setGroupValue] = React.useState([]);

  const getSelectedGroupValue = () => {
    if (groupValue.length === 0) return "[]";
    let arrayString = groupValue.reduce(
      (accumulator, currentValue) => accumulator + ", " + currentValue
    );
    return "[" + arrayString + "]";
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      paddingTop: 30,
      backgroundColor: "#fff",
    },
    head: { height: 40, backgroundColor: "#f1f8ff" },
    text: { margin: 6 },
  });
  return (
    <NativeBaseProvider>
      <Heading mt={3} bg="emerald.50">
        Create Event Notification
      </Heading>
      <Container
        alignItems="center"
        space={4}
        p={[4, 4, 8]}
        bg="white"
        safeArea
        minHeight={"100%"}
        minWidth={"100%"}
        bg="emerald.50"
        rounded="md"
        shadow={3}
      >
        <VStack space={4}>
          <HStack space={3} alignItems="center">
            <Select
              bg="primary.300"
              selectedValue={eventName}
              maxWidth={400}
              accessibilityLabel="Select your Event"
              placeholder="Select your Event"
              onValueChange={(itemValue) => seteventName(itemValue)}
              _selectedItem={{
                bg: "cyan.600",
                endIcon: <CheckIcon size={4} />,
              }}
            >
              {Events.map((item) => (
                <Select.Item label={item} value={item} />
              ))}
            </Select>
            <Input
              variant="filled"
              width="100%"
              InputRightElement={
                <IconButton
                  icon={<Icon as={FontAwesome5} name="plus" size={4} />}
                  colorScheme="emerald"
                  ml={1}
                  onPress={() => {
                    Events.push(eventName);
                    var Ref = firebase
                      .firestore()
                      .collection("Helper-app-data")
                      .doc("Events");
                    Ref.update({
                      eventlist:
                        firebase.firestore.FieldValue.arrayUnion(eventName),
                    });
                    seteventName("");
                  }}
                  mr={1}
                />
              }
              onChangeText={(v) => seteventName(v)}
              value={eventName}
              placeholder="Add new events to the exisitng list"
            />
          </HStack>
          <Divider></Divider>
          <HStack space={3} alignItems="center">
            <Select
              bg="primary.300"
              selectedValue={activityName}
              maxWidth={400}
              accessibilityLabel="Select your Activity/team"
              placeholder="Select your Activity/team"
              onValueChange={(itemValue) => setactivityName(itemValue)}
              _selectedItem={{
                bg: "cyan.600",
                endIcon: <CheckIcon size={4} />,
              }}
            >
              {Activitys.map((item) => (
                <Select.Item label={item} value={item} />
              ))}
            </Select>
            <Input
              variant="filled"
              width="100%"
              InputRightElement={
                <IconButton
                  icon={<Icon as={FontAwesome5} name="plus" size={4} />}
                  colorScheme="emerald"
                  ml={1}
                  onPress={() => {
                    Activitys.push(activityName);
                    var Ref = firebase
                      .firestore()
                      .collection("Helper-app-data")
                      .doc("Events");
                    Ref.update({
                      teamList:
                        firebase.firestore.FieldValue.arrayUnion(activityName),
                    });
                    setactivityName("");
                  }}
                  mr={1}
                />
              }
              onChangeText={(v) => setactivityName(v)}
              value={activityName}
              placeholder="Add new Activity/team to the exisitng list"
            />
          </HStack>
          <Divider></Divider>
          <HStack mb={3} space={3}>
            <Heading size="md">
              Number of People Requred for this activity/Team :
            </Heading>
            <Select
              bg="primary.300"
              selectedValue={noOfPeople}
              maxWidth={400}
              accessibilityLabel="Select a number"
              placeholder="Select a number"
              onValueChange={(itemValue) => setnoOfPeople(itemValue)}
              _selectedItem={{
                bg: "cyan.600",
                endIcon: <CheckIcon size={4} />,
              }}
            >
              {quantityValues.map((item) => (
                <Select.Item label={item} value={item} />
              ))}
            </Select>
          </HStack>
          <Divider></Divider>
          <HStack mb={3} space={3}>
            <Heading size="md">Event Start Date :</Heading>

            <input
              type="date"
              name="date"
              onChange={(event) => seteventStartDate(event.target.value)}
            />
            <Heading size="md">Event End Date :</Heading>

            <input
              type="date"
              name="date"
              onChange={(event) => seteventEndDate(event.target.value)}
            />
          </HStack>

          <Box alignItems="center">
            <Box>
              <Checkbox.Group
                colorScheme="green"
                defaultValue={groupValue}
                onChange={(values) => {
                  setGroupValue(values || []);
                }}
              >
                <VStack space={3} alignItems="left">
                  <Checkbox value="Early Morning" my={1}>
                    Early Morning (05:00 AM to 09:00 AM)
                  </Checkbox>
                  <Checkbox value="Morning" my={1}>
                    Morning (09:00 AM to 12:00 PM)
                  </Checkbox>
                  <Checkbox value="Afternoon" my={1}>
                    Afternoon (12:00 PM to 03:00 PM)
                  </Checkbox>
                  <Checkbox value="Evening" my={1}>
                    Evening (03:00 PM to 06:00 PM)
                  </Checkbox>
                  <Checkbox value="Late Evening" my={1}>
                    Late Evening (06:00 PM to 09:00 PM)
                  </Checkbox>
                </VStack>
              </Checkbox.Group>
            </Box>
          </Box>

          <Divider></Divider>
          <HStack mb={3}>
            <Heading size="md">Add Emails to send</Heading>
          </HStack>
          <VStack space={4} flex={1} w="90%" mt={4}>
            <Input
              variant="filled"
              InputRightElement={
                <IconButton
                  icon={<Icon as={FontAwesome5} name="plus" size={4} />}
                  colorScheme="emerald"
                  ml={1}
                  onPress={() => {
                    addItem(inputValue);
                    setInputValue("");
                  }}
                  mr={1}
                />
              }
              onChangeText={(v) => setInputValue(v)}
              value={inputValue}
              placeholder="Add Email id"
            />
            <VStack>
              {list.map((item, itemI) => (
                <HStack
                  w="100%"
                  justifyContent="space-between"
                  alignItems="center"
                  key={item.title + itemI.toString()}
                >
                  <Text mx={2} strikeThrough={item.isCompleted}>
                    {item.title}
                  </Text>
                  <IconButton
                    colorScheme="emerald"
                    icon={<Icon as={FontAwesome5} name="trash" size={5} />}
                    onPress={() => handleDelete(itemI)}
                  />
                </HStack>
              ))}
            </VStack>
            <Divider></Divider>
            <Button
              onPress={() => {
                sendEvents();
              }}
              startIcon={
                <Icon as={MaterialCommunityIcons} name="email" size={5} />
              }
            >
              Send volunteer's Email Notification!
            </Button>
          </VStack>
        </VStack>
      </Container>
    </NativeBaseProvider>
  );
}
