import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";

export default DefaultScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Defaut Screen</Text>
      <Button
        title="Go to SignIn"
        onPress={() => navigation.navigate("SignIn")}
      />
      <Button
        title="Go to SignUp"
        onPress={() => navigation.navigate("SignUp")}
      />
      <Button
        title="Go to HomeScreen"
        onPress={() => navigation.navigate("HomeScreen")}
      />
      <Button
        title="Go to ForecastScreen"
        onPress={() => navigation.navigate("ForecastScreen")}
      />
      <Button
        title="Go to Mein Screen"
        onPress={() => navigation.navigate("MeinScreen")}
      />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
