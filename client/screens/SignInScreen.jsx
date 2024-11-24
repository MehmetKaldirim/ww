import { Image, StyleSheet, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import AuthForm from "../components/AuthForm";
import { Button } from "native-base";
import { signIn } from "../services/authService";

const TOKEN_KEY = "TOKEN_KEY";

export default SignInScreen = ({ navigation }) => {
  const handleSubmit = async (values) => {
    if (values.name.includes("@")) {
      const email = values.name;
      delete values.name;
      values.email = email;
    } else {
      delete values.email;
    }
    await signIn(values);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logoIcon.png")} />
      <AuthForm handleSubmit={handleSubmit} type="SignIn" />
      <Text style={styles.text}>In you do nota have an account, please</Text>
      <Button
        mt="5"
        alignSelf="center"
        w="35%"
        onPress={() => navigation.navigate("SignUp")}
      >
        go to Sign Uppp
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282B34",
  },
  logo: {
    alignSelf: "flex-end",
  },
  text: {
    color: "gray",
    textAlign: "center",
  },
});
