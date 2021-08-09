import React, { useEffect, useState } from "react";
import { firebase } from "../../firebase/config";
import { StyleSheet, View } from "react-native";
import axios from "axios";
import {
  NativeBaseProvider,
  Container,
  VStack,
  Stack,
  Select,
  CheckIcon,
  IconButton,
  Center,
  Divider,
  HStack,
  Box,
  Heading,
  Checkbox,
  Text,
  Button,
  Icon,
  Input,
  Fab,
  Modal,
} from "native-base";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
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
  const [tasks, setTasks] = React.useState([]);
  const emailIds = [];
  const [date, setDate] = useState("");
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

  const [selectedActVal, setSelectedActVal] = useState("");
  useEffect(() => {
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    const apiUrl = "http://localhost:9001/events/";
    axios.get(apiUrl).then((repos) => {
      console.log(repos.data);
      setTasks(repos.data);
    });
  }, []);

  let getEvents = () => {
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    const apiUrl = "http://localhost:9001/events/";
    axios.get(apiUrl).then((repos) => {
      console.log(repos.data);
      setTasks(repos.data);
      setShowModal(true);
    });
  };

  const sendEvents = () => {
    for (let i = 0; i < groupValue.length; i++) {
      let json = JSON.stringify({
        activityName: selectedActVal,
        activityDate: date,
        activityTime: groupValue[i],
        activityAllUsers: JSON.stringify(list),
      });
      console.log(json.toString);
      // axios.defaults.headers.post["Content-Type"] = "application/json";
      // const apiUrl = "http://localhost:9001/events/setEvent";
      // axios.post(apiUrl, json).then((repos) => {
      //   console.log(repos.data);
      // });
      axios.defaults.headers.post["Content-Type"] = "application/json";
      axios({
        method: "post",
        url: "http://localhost:9001/events/setEvent",
        data: json,
        headers: {
          Accept: "application/json ,text/plain, */*",
        },
      });
    }
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
      <Container alignItems="center">
        <Center>
          <VStack alignItems="center" space={4}>
            <Divider></Divider>
            <Select
              bg="primary.200"
              selectedValue={selectedActVal}
              minWidth={200}
              accessibilityLabel="Select your Activity"
              placeholder="Select your Activity"
              onValueChange={(itemValue) => setSelectedActVal(itemValue)}
              _selectedItem={{
                bg: "cyan.600",
                endIcon: <CheckIcon size={4} />,
              }}
            >
              <Select.Item label="Cooking" value="Cooking" />
              <Select.Item label="Driving" value="Driving" />
              <Select.Item label="Cleaning" value="Cleaning" />
              <Select.Item label="Sorting" value="Sorting" />
              <Select.Item label="Searching" value="Searching" />
            </Select>
            <Divider></Divider>
            <HStack mb={3}>
              <Heading mt={3}>Select Date and Timings </Heading>
            </HStack>
            <HStack space={3} alignItems="center">
              <Heading size="md">Date :</Heading>

              <input
                type="date"
                name="date"
                onChange={(event) => setDate(event.target.value)}
              />
            </HStack>
          </VStack>
          <Box justifyContent="center">
            <Box>
              <Checkbox.Group
                colorScheme="green"
                defaultValue={groupValue}
                onChange={(values) => {
                  setGroupValue(values || []);
                }}
              >
                <HStack space={3} alignItems="center">
                  <Checkbox value="00:00-01:00" my={1}>
                    00:00-01:00
                  </Checkbox>
                  <Checkbox value="01:00-02:00" my={1}>
                    01:00-02:00
                  </Checkbox>
                  <Checkbox value="02:00-03:00" my={1}>
                    02:00-03:00
                  </Checkbox>
                  <Checkbox value="03:00-04:00" my={1}>
                    03:00-04:00
                  </Checkbox>
                  <Checkbox value="04:00-05:00" my={1}>
                    04:00-05:00
                  </Checkbox>
                  <Checkbox value="05:00-06:00" my={1}>
                    05:00-06:00
                  </Checkbox>
                </HStack>
                <HStack space={3} alignItems="center">
                  <Checkbox value="06:00-07:00" my={1}>
                    06:00-07:00
                  </Checkbox>

                  <Checkbox value="07:00-08:00" my={1}>
                    07:00-08:00
                  </Checkbox>
                  <Checkbox value="08:00-09:00" my={1}>
                    08:00-09:00
                  </Checkbox>
                  <Checkbox value="09:00-10:00" my={1}>
                    09:00-10:00
                  </Checkbox>
                  <Checkbox value="10:00-11:00" my={1}>
                    10:00-11:00
                  </Checkbox>
                  <Checkbox value="11:00-12:00" my={1}>
                    11:00-12:00
                  </Checkbox>
                </HStack>
                <HStack space={3} alignItems="center">
                  <Checkbox value="12:00-13:00" my={1}>
                    12:00-13:00
                  </Checkbox>

                  <Checkbox value="13:00-14:00" my={1}>
                    13:00-14:00
                  </Checkbox>
                  <Checkbox value="14:00-15:00" my={1}>
                    14:00-15:00
                  </Checkbox>
                  <Checkbox value="15:00-16:00" my={1}>
                    15:00-16:00
                  </Checkbox>
                  <Checkbox value="16:00-17:00" my={1}>
                    16:00-17:00
                  </Checkbox>
                  <Checkbox value="17:00-18:00" my={1}>
                    17:00-18:00
                  </Checkbox>
                </HStack>
                <HStack space={3} alignItems="center">
                  <Checkbox value="18:00-19:00" my={1}>
                    18:00-19:00
                  </Checkbox>

                  <Checkbox value="19:00-20:00" my={1}>
                    19:00-20:00
                  </Checkbox>
                  <Checkbox value="20:00-21:00" my={1}>
                    20:00-21:00
                  </Checkbox>
                  <Checkbox value="21:00-22:00" my={1}>
                    21:00-22:00
                  </Checkbox>
                  <Checkbox value="22:00-23:00" my={1}>
                    22:00-23:00
                  </Checkbox>
                  <Checkbox value="23:00-24:00" my={1}>
                    23:00-24:00
                  </Checkbox>
                </HStack>
              </Checkbox.Group>
            </Box>
          </Box>
          <Divider></Divider>

          <Text fontSize="md" bold>
            {getSelectedGroupValue()}
          </Text>

          <Divider></Divider>
          <HStack mb={3}>
            <Heading mt={3}>Add Emails to send</Heading>
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
        </Center>
        <Fab
          onPress={() => getEvents()}
          placement="top-right"
          icon={<Icon color="white" as={<AntDesign name="plus" />} size={4} />}
          label={
            <Text color="white" fontSize="sm">
              Get Event Details
            </Text>
          }
        />

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="800px">
            <Modal.CloseButton />
            <Modal.Header>Event Details</Modal.Header>
            <Modal.Body>
              <DataTable>
                <DataTable.Header>
                  {HeadTable.map((item) => (
                    <DataTable.Title>{item}</DataTable.Title>
                  ))}
                </DataTable.Header>
                {tasks.map((item) => (
                  <DataTable.Row>
                    <DataTable.Cell>{item.eventId}</DataTable.Cell>
                    <DataTable.Cell>{item.activityName}</DataTable.Cell>
                    <DataTable.Cell>{item.activityDate}</DataTable.Cell>
                    <DataTable.Cell>{item.activityTime}</DataTable.Cell>
                    <DataTable.Cell>{item.activityAllUsers}</DataTable.Cell>
                    <DataTable.Cell>
                      {String(item.activityBooked)}
                    </DataTable.Cell>
                    <DataTable.Cell>{item.activityBookedUser}</DataTable.Cell>
                  </DataTable.Row>
                ))}
              </DataTable>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group variant="ghost" space={2}>
                <Button
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  Close
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Container>
    </NativeBaseProvider>
  );
}
