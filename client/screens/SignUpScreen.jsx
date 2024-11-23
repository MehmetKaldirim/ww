import { Image, StyleSheet, Text, View } from "react-native";
import SignUpForm from "../components/SignUpForm";

export default SignUpScreen = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logoIcon.png")} />
      <SignUpForm handleSubmit={handleSubmit} />
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
