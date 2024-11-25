import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import AuthForm from "../components/AuthForm";
import { signUp } from "../services/authService";
import { Button, useToast } from "native-base";

export default function SignUpScreen({ navigation }) {
  const toast = useToast(); // Initialize NativeBase toast

  const handleSubmit = async (values) => {
    try {
      const response = await signUp(values);
      if (response.status === 201) {
        navigation.navigate("SignIn");
      }
    } catch (error) {
      console.log(
        "Error:",
        error.response?.data?.message || "Something went wrong"
      );
      toast.show({
        title: error.response?.data?.message || "Signup failed!",
        status: "error", // NativeBase status (success, error, warning, info)
        placement: "top", // Placement of the toast on the screen
        duration: 3000, // Duration of toast visibility in milliseconds
      });
    }
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
        Go to Sign In
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282B34",
    justifyContent: "center", // Center content vertically
    paddingHorizontal: 20, // Add some horizontal padding
  },
  logo: {
    alignSelf: "center", // Center the logo horizontally
    marginBottom: 20, // Add space below the logo
  },
  text: {
    color: "gray",
    textAlign: "center",
    marginTop: 20, // Add space above the text
  },
});
