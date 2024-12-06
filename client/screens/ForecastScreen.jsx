import { StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Box, FlatList } from "native-base";
import ScreenTitle from "../components/ScreenTitle";
import WeatherSection from "../components/weather/WeatherSection";
import SectionTitle from "../components/weather/SectionTitle";
import ButtonIcon from "../components/ButtonIcon";

const ForecastScreen = ({ navigation }) => {
  const forecastData = useRoute().params;
  const weatherData = [
    {
      date: "25 of May",
      data: [
        {
          time: "Morning",
          temp: "10",
          wind: "5",
        },
        {
          time: "Day",
          temp: "15",
          wind: "3",
        },
        {
          time: "Evening",
          temp: "13",
          wind: "7",
        },
        {
          time: "Night",
          temp: "8",
          wind: "3",
        },
      ],
    },
    {
      date: "25 of May",
      data: [
        {
          time: "Morning",
          temp: "10",
          wind: "5",
        },
        {
          time: "Day",
          temp: "15",
          wind: "3",
        },
        {
          time: "Evening",
          temp: "13",
          wind: "7",
        },
        {
          time: "Night",
          temp: "8",
          wind: "3",
        },
      ],
    },
    {
      date: "25 of May",
      data: [
        {
          time: "Morning",
          temp: "10",
          wind: "5",
        },
        {
          time: "Day",
          temp: "15",
          wind: "3",
        },
        {
          time: "Evening",
          temp: "13",
          wind: "7",
        },
        {
          time: "Night",
          temp: "8",
          wind: "3",
        },
      ],
    },
    {
      date: "25 of May",
      data: [
        {
          time: "Morning",
          temp: "10",
          wind: "5",
        },
        {
          time: "Day",
          temp: "15",
          wind: "3",
        },
        {
          time: "Evening",
          temp: "13",
          wind: "7",
        },
        {
          time: "Night",
          temp: "8",
          wind: "3",
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <ScreenTitle title="Forecast for next  four days:" />

      <FlatList
        data={forecastData}
        renderItem={({ item }) => {
          return (
            <Box p="4">
              <SectionTitle date={item.date} />
              <WeatherSection weatherData={item.data} />
            </Box>
          );
        }}
        numColumns="2"
      />

      <Box alignSelf="center" mb="7%">
        <ButtonIcon
          handleClick={() => navigation.navigate("HomeScreen")}
          iconPath={require("../assets/icons/homeIcon.png")}
        />
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282B34",
  },
});

export default ForecastScreen;
