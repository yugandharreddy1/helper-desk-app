import * as React from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  IconButton,
  HStack,
  Divider,
} from "native-base";
import { View } from "react-native";
import { useState } from "react";
import { firebase } from "../../firebase/config";

export default function RegistrationScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          fullName,
        };
        const usersRef = firebase.firestore().collection("users");
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            navigation.navigate("Home", { user: data });
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <NativeBaseProvider>
      <Box safeArea flex={1} p={2} w="90%" mx="auto">
        <Heading size="lg" color="primary.500">
          Welcome
        </Heading>
        <Heading color="muted.400" size="xs">
          Sign up to continue!
        </Heading>

        <VStack space={2} mt={5}>
          <FormControl>
            <FormControl.Label
              _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
            >
              Name
            </FormControl.Label>
            <Input
              onChangeText={(text) => setFullName(text)}
              value={fullName}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
            >
              Email
            </FormControl.Label>
            <Input onChangeText={(text) => setEmail(text)} value={email} />
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
            >
              Password
            </FormControl.Label>
            <Input
              type="password"
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
            >
              Confirm Password
            </FormControl.Label>
            <Input
              type="password"
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
            />
          </FormControl>
          <VStack space={2} mt={5}>
            <Button
              colorScheme="cyan"
              _text={{ color: "white" }}
              onPress={() => onRegisterPress()}
            >
              SignUp
            </Button>
            <View>
              <Text>
                Already got an account?{" "}
                <Text onPress={onFooterLinkPress}>Log in</Text>
              </Text>
            </View>
            <HStack justifyContent="center" alignItem="center">
              <IconButton
                variant="unstyled"
                startIcon={
                  <Icon
                    as={<MaterialCommunityIcons name="facebook" />}
                    color="muted.700"
                    size="sm"
                  />
                }
              />
              <IconButton
                variant="unstyled"
                startIcon={
                  <Icon
                    as={<MaterialCommunityIcons name="google" />}
                    color="muted.700"
                    size="sm"
                  />
                }
              />
              <IconButton
                variant="unstyled"
                startIcon={
                  <Icon
                    as={<MaterialCommunityIcons name="github" />}
                    color="muted.700"
                    size="sm"
                  />
                }
              />
            </HStack>
          </VStack>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}
