import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { Box, TextArea, Button } from "native-base";
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

  const [userName, setUserName] = useState("friend");
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [manualLocation, setManualLocation] = useState("");
  const [isManualLocation, setIsManualLocation] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setLocationError("Permission to access location was denied.");
          Alert.alert(
            "Permission Denied",
            "Please enable location permissions in your device settings."
          );
          setIsManualLocation(true);
          return;
        }

        let locationData = await Location.getCurrentPositionAsync({});
        const locationString = `${locationData.coords.latitude},${locationData.coords.longitude}`;
        setLocation(locationString);
        console.log("Location retrieved:", locationString);
      } catch (error) {
        setLocationError("Error retrieving location.");
        console.error("Location error:", error);
        setIsManualLocation(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (location || manualLocation) {
      const loc = manualLocation || location;
      dispatch(fetchWeatherData(loc));
      console.log("is loading both " + isLoading);
    }
  }, [location, manualLocation, dispatch]);

  useEffect(() => {
    const handleUserName = async () => {
      try {
        const username = await getUserName();
        setUserName(username);
      } catch (error) {
        console.log("Error fetching username:", error);
      }
    };
    handleUserName();
  }, []);

  const handleManualLocationSubmit = () => {
    if (manualLocation) {
      console.log("is loading handle manual location " + isLoading);
      dispatch(fetchWeatherData(manualLocation));

      setIsManualLocation(false);
    }
  };

  const fallbackWeatherData = [
    { time: "Mocked Morning", temp: "10", wind: "5" },
    { time: "Mocked Day", temp: "15", wind: "3" },
    { time: "Mocked Evening", temp: "13", wind: "7" },
    { time: "Mocked Night", temp: "8", wind: "3" },
  ];

  const fallbackDetailsData = [
    { name: "Mocked Location", value: "Bochum" },
    { name: "Mocked Sunrise", value: "07:00" },
    { name: "Mocked Sunset", value: "20:00" },
    { name: "Mocked Pressure", value: "1018" },
  ];

  console.log(
    "is icon pass here ",
    data?.currentDay.weatherData || fallbackWeatherData
  );
  // console.log(
  //   "details data which send as a props ",
  //   data?.currentDay.details || fallbackDetailsData
  // );

  console.log("is loading son " + isLoading);
  return (
    <View style={styles.container}>
      <ScreenTitle title={`Hey ${userName}, nice to meet you!`} />

      {!isLoading || !isManualLocation ? (
        <>
          <Box flexDir="row">
            <Text style={styles.subtitleText}>
              {`Today is ${moment(new Date()).format("MMM Do")},`}
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ForecastScreen", data.forecast)
              }
            >
              <Text style={styles.buttonText}>Check next days!</Text>
            </TouchableOpacity>
          </Box>

          <View style={styles.middleSection}>
            <View>
              <WeatherSection weatherData={data?.currentDay.weatherData} />
              <DetailsSection detailsData={data?.currentDay.details} />
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
      ) : !isManualLocation ? (
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
              <WeatherSection weatherData={fallbackWeatherData} />
              <DetailsSection detailsData={fallbackDetailsData} />
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
        <Box>
          <TextInput
            placeholder="Enter your city name"
            value={manualLocation}
            onChangeText={setManualLocation}
            style={styles.manualInput}
          />
          <Button onPress={handleManualLocationSubmit}>
            <Text>Submit</Text>
          </Button>
        </Box>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  manualInput: {
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    width: 200,
    height: 40,
  },
});
