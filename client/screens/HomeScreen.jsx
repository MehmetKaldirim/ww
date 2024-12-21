import { useEffect, useState } from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Box, Spinner, TextArea, Toast } from "native-base";
import ScreenTitle from "../components/ScreenTitle";
import WeatherSection from "../components/weather/WeatherSection";
import DetailsSection from "../components/details/DetailsSection";
import ButtonIcon from "../components/ButtonIcon";
import * as Location from "expo-location";
import { getUserName } from "../services/apiClient";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData, selectWeatherData } from "../redux/weatherReducer";
import moment from "moment";
import ErrorSection from "../components/ErrorSection";
import SkeletonLoader from "../components/SceletonLoader";
import { LOADING } from "../constants";
import { postNewRecord, selectNewRecordData } from "../redux/recordReducer";

export default HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector(selectWeatherData);
  const {
    data: newRecordData,
    isLoading: isNewRecordLoading,
    error: newRecordError,
  } = useSelector(selectNewRecordData);

  const [userName, setUserName] = useState("friend");
  const [location, setLocation] = useState();
  const [locationError, setLocationError] = useState();
  const [description, setDescription] = useState("Mantel");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationError(
          "Permission to access location was denied, change this in settings!"
        );
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

  useEffect(() => {
    if (isNewRecordLoading === LOADING.FULFILLED) {
      Toast.show({
        title: newRecordData?.message,
        placement: "top",
        duration: 3000,
      });
    }
    if (isNewRecordLoading === LOADING.REJECTED) {
      Toast.show({
        title: newRecordError,
        placement: "top",
        duration: 3000,
      });
    }
  }, [isNewRecordLoading]);

  const handleCreateNewRecord = () => {
    const currentDayData = data.currentDay;
    const { mintemp, maxtemp, wind } = currentDayData.recordData;
    const params = {
      mintemp,
      maxtemp,
      wind,
      description,
      weatherData: currentDayData.weatherData,
    };

    dispatch(postNewRecord(params));
  };

  return (
    <View style={styles.container}>
      <ScreenTitle title={`Hey ${userName}, nice to meet you!`} />
      {error || locationError ? (
        <ErrorSection errorText={error || locationError} />
      ) : (
        <>
          <Box flexDir="row">
            <Text style={styles.subtitleText}>
              {`Today is ${moment(new Date()).format("MMM Do")},`}
            </Text>
            {isLoading === LOADING.FULFILLED && (
              <TouchableOpacity
                onPress={() => navigation.navigate("Forecast", data?.forecast)}
              >
                <Text style={styles.buttonText}>Check next days!</Text>
              </TouchableOpacity>
            )}
          </Box>

          <View style={styles.middleSection}>
            {isLoading === LOADING.FULFILLED ? (
              <View>
                <WeatherSection weatherData={data?.currentDay.weatherData} />
                <DetailsSection detailsData={data?.currentDay.details} />
              </View>
            ) : (
              <SkeletonLoader />
            )}
            <Image source={require("../assets/placeHolderImg.png")} />
          </View>

          <Box>
            <Text style={styles.subtitleText}>What do you wear today?</Text>
            <TextArea
              mt="2"
              value={description}
              onChangeText={(text) => setDescription(text)}
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
              disabled={isLoading !== LOADING.FULFILLED || error}
              handleClick={null}
              iconPath={require("../assets/icons/listIcon.png")}
            />
            <ButtonIcon
              disabled={isLoading !== LOADING.FULFILLED || error}
              handleClick={null}
              iconPath={require("../assets/icons/cameraIcon.png")}
            />
            {isNewRecordLoading === LOADING.PENDING ? (
              <Spinner color="primary.100" size="lg" />
            ) : (
              <ButtonIcon
                disabled={
                  isLoading !== LOADING.FULFILLED || error || !description
                }
                handleClick={handleCreateNewRecord}
                iconPath={require("../assets/icons/saveIcon.png")}
              />
            )}
          </Box>
        </>
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
