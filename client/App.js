import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DefaultScreen from "./screens/DefaultScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SignInScreen from "./screens/SignInScreen";
import { NativeBaseProvider } from "native-base";
import HomeScreen from "./screens/HomeScreen";
import theme from "./theme/theme";
import ForecastScreen from "./screens/ForecastScreen";
import MeinScreen from "./screens/MeinScreen.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";

const Stack = createNativeStackNavigator();

export default App = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Default">
            <Stack.Screen name="Default" component={DefaultScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ForecastScreen" component={ForecastScreen} />
            <Stack.Screen name="MeinScreen" component={MeinScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  );
};
