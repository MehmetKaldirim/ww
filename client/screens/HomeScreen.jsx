import { useEffect, useState } from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Box, TextArea } from "native-base";
import ScreenTitle from "../components/ScreenTitle";
import WeatherSection from "../components/weather/WeatherSection";
import DetailsSection from "../components/details/DetailsSection";
import ButtonIcon from "../components/ButtonIcon";
import * as Location from "expo-location";
import { getUserName } from "../services/apiClient";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData, selectWeatherData } from "../redux/weatherReducer";
import moment from "moment";

export default HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector(selectWeatherData);
  console.log(data);

  const [userName, setUserName] = useState("friend");
  const [location, setLocation] = useState();
  const [locationError, setLocationError] = useState();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let locationData = await Location.getCurrentPositionAsync({});
      setLocation(
        `${locationData.coords.latitude},${locationData.coords.longitude}`
      );
    })();
  }, []);

  useEffect(() => {
    if (location) {
      dispatch(fetchWeatherData(location));
    }
  }, [location]);

  useEffect(() => {
    const handleUserName = async () => {
      try {
        const username = await getUserName();
        setUserName(username);
      } catch (error) {
        console.log("Error fetching username from AsyncStorage:", error);
      }
    };
    handleUserName();
  }, []);

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
      <ScreenTitle title={`Hey ${userName}, nice to meet you!`} />
      {!isLoading ? (
        <>
          <Box flexDir="row">
            <Text style={styles.subtitleText}>
              {`Today is ${moment(new Date()).format("MMM Do")},`}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Forecast", data.forecast)}
            >
              <Text style={styles.buttonText}>Check next days!</Text>
            </TouchableOpacity>
          </Box>

          <View style={styles.middleSection}>
            <View>
              <WeatherSection
                weatherData={data?.currentDay.weatherData || weatherData}
              />
              <DetailsSection
                detailsData={data?.currentDay.details || detailsData}
              />
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
        </>
      ) : (
        <Box>'Waiting for load...'</Box>
      )}
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
