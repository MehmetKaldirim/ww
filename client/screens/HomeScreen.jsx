import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Box, TextArea } from "native-base";
import ScreenTitle from "../components/ScreenTitle";
import WeatherSection from "../components/weather/WeatherSection";
import DetailsSection from "../components/details/DetailsSection";
import ButtonIcon from "../components/ButtonIcon";

export default HomeScreen = ({ navigation }) => {
  const weatherData = [
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
  ];

  const detailsData = [
    {
      name: "Location",
      value: "Budapest",
    },
    {
      name: "Sunrise",
      value: "07:00",
    },
    {
      name: "Sunset",
      value: "20:00",
    },
    {
      name: "Pressure",
      value: "1018",
    },
  ];

  return (
    <View style={styles.container}>
      <ScreenTitle title="Hey John, nice to meet you!" />
      <Box flexDir="row">
        <Text style={styles.subtitleText}>It is 19 of May, day!</Text>
        <TouchableOpacity onPress={() => navigation.navigate("ForecastScreen")}>
          <Text style={styles.buttonText}>Check next days!</Text>
        </TouchableOpacity>
      </Box>

      <View style={styles.middleSection}>
        <View>
          <WeatherSection weatherData={weatherData} />
          <DetailsSection detailsData={detailsData} />
        </View>
        <Image
          style={styles.logo}
          source={require("../assets/placeHolderImg.png")}
        />
      </View>
      <Box>
        <Text style={styles.subtitleText}>What do you wear today?</Text>
        <TextArea
          mt="2"
          placeholder="Do you want to remember later in what clothes it was comfortable in this weather? Fill out this form!"
          w="85%"
          alignSelf="center"
          rounded="15"
          totalLines={4}
          fontSize="15"
          color="white"
          backgroundColor="primary.200"
        />
      </Box>
      <Box flexDir="row" justifyContent="space-around" mt="7">
        <ButtonIcon
          handleClick={null}
          iconPath={require("../assets/icons/listIcon.png")}
        />
        <ButtonIcon
          handleClick={null}
          iconPath={require("../assets/icons/cameraIcon.png")}
        />
        <ButtonIcon
          handleClick={null}
          iconPath={require("../assets/icons/saveIcon.png")}
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
  middleSection: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  subtitleText: {
    color: "grey",
    fontSize: 20,
    paddingLeft: "10%",
    paddingRight: "3%",
    paddingTop: "2%",
  },
  buttonText: {
    color: "grey",
    fontSize: 20,
    paddingTop: "2%",
    textDecorationLine: "underline",
  },
});
