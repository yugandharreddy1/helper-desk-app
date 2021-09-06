import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import axios from "axios";
import { NativeBaseProvider, Container, Heading } from "native-base";
import { DataTable } from "react-native-paper";
export default function VolunteerHistoryPage(props) {
  const [tasks, setTasks] = React.useState([]);
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
  useEffect(() => {
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    const apiUrl = "https://spring-boot-helper.herokuapp.com/events/";
    axios.get(apiUrl).then((repos) => {
      console.log(repos.data);
      setTasks(repos.data);
    });
  });
  return (
    <NativeBaseProvider>
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
          Event History
        </Heading>
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
              <DataTable.Cell>{item.activityAllUsers}</DataTable.Cell>
              <DataTable.Cell>{String(item.activityBooked)}</DataTable.Cell>
              <DataTable.Cell>{item.activityBookedUser}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </Container>
    </NativeBaseProvider>
  );
}
