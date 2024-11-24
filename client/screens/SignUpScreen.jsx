import { Image, StyleSheet, Text, View } from "react-native";
import AuthForm from "../components/AuthForm";

export default SignUpScreen = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logoIcon.png")} />
      <AuthForm handleSubmit={handleSubmit} type="SignUp" />
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
});
