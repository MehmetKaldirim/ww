import { Image, StyleSheet, Text, View } from "react-native";
import AuthForm from "../components/AuthForm";
import { signUp } from "../services/authService";
import { Button } from "native-base";

export default SignUpScreen = ({ navigation }) => {
  const handleSubmit = async (values) => {
    await signUp(values).then(() => navigation.navigate("SignIn"));
    console.log(values);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logoIcon.png")} />
      <AuthForm handleSubmit={handleSubmit} type="SignUp" />
      <Text style={styles.text}>If you already have an account, please</Text>
      <Button
        mt="5"
        alignSelf="center"
        w="35%"
        onPress={() => navigation.navigate("SignIn")}
      >
        go to Sign In
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
