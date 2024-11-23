import { Image, StyleSheet, Text, View } from "react-native";
import SignUpForm from "../components/SignUpForm";

export default SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logoIcon.png")} />
      <View style={styles.greenElm}>
        <Text>First view</Text>
      </View>
      <View style={styles.blueElm}>
        <Text>Second view</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282B34",
  },
  greenElm: {
    flex: 1,
    backgroundColor: "green",
  },
  blueElm: {
    flex: 1,
    backgroundColor: "blue",
  },

  logo: {
    alignSelf: "flex-end",
  },
});
