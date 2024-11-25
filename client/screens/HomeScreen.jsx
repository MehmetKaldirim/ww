import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Box, Button, TextArea } from "native-base";

export default HomeScreen = ({ navigation }) => {
  const WeatherData = ({ time, temp, wind }) => {
    return (
      <Box bgColor="#313135" pl="1" pr="3" mt="2" rounded="20">
        <Text style={styles.weatherText}>{time}</Text>
        <Box flexDir="row" justifyContent="center">
          <Image
            style={styles.weatherIcon}
            source={{ uri: "https://openweathermap.org/img/wn/10d@2x.png" }}
          />
          <Text style={styles.weatherText}>{temp}°C</Text>
          <Image
            style={styles.weatherIcon}
            source={require("../assets/icons/windIcon.png")}
          />
          <Text style={styles.weatherText}>{wind}m/h</Text>
        </Box>
      </Box>
    );
  };

  const DetailsData = ({ name, value }) => {
    return (
      <Box flexDir="row" alignSelf="center">
        <Text style={styles.detailTextName}> {name}: </Text>
        <Text style={styles.detailTextValue}> {value} </Text>
      </Box>
    );
  };

  return (
    <View style={styles.container}>
      <Box
        alignSelf="center"
        rounded="15"
        p="2"
        w="85%"
        _text={{
          fontSize: "25",
          fontWeight: "light",
          color: "warmGray.50",
          letterSpacing: "lg",
          alignSelf: "center",
        }}
        bg="#202021"
      >
        Hey John, nice to see you!
      </Box>
      <Box flexDir="row">
        <Text style={styles.subtitleText}>It is 19 of May, day!</Text>
        <TouchableOpacity onPress={() => null}>
          <Text style={styles.buttonText}>Check next days!</Text>
        </TouchableOpacity>
      </Box>

      <View style={styles.middleSection}>
        <View>
          <Box
            alignSelf="center"
            rounded="15"
            p="2"
            w="100%"
            bg="#202021"
            shadow={9}
            shadowOffset={{ width: 0, height: 0 }}
            shadowOpacity={0.3}
            shadowRadius={4}
          >
            <WeatherData time="Morning" temp="10" wind="15" />
            <WeatherData time="Day" temp="17" wind="15" />
            <WeatherData time="Evening" temp="13" wind="15" />
            <WeatherData time="Night" temp="7" wind="15" />
          </Box>
          <Box
            mt="3"
            alignSelf="center"
            rounded="15"
            p="3"
            w="100%"
            bg="#202021"
            shadow={9}
            shadowOffset={{ width: 0, height: 0 }}
            shadowOpacity={0.3}
            shadowRadius={4}
          >
            <Text style={styles.detailsTextTitle}> Details </Text>
            <DetailsData name="Location" value="Bochum" />
            <DetailsData name="Sunrise" value="07:00" />
            <DetailsData name="Sunset" value="20:00" />
            <DetailsData name="Pressure" value="1016" />
          </Box>
        </View>

        <View>
          <Image
            style={styles.logo}
            source={require("../assets/placeHolderImg.png")}
          />
        </View>
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
          backgroundColor="#207021"
        />
      </Box>
      <Box flexDir="row" justifyContent="space-around" mt="7">
        <TouchableOpacity onPress={() => null}>
          <Image
            style={styles.logo}
            source={require("../assets/icons/listIcon.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => null}>
          <Image
            style={styles.logo}
            source={require("../assets/icons/cameraIcon.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => null}>
          <Image
            style={styles.logo}
            source={require("../assets/icons/saveIcon.png")}
          />
        </TouchableOpacity>
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
  logo: {
    alignSelf: "flex-end",
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
  weatherLine: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  weatherText: {
    color: "white",
    fontSize: 15,
    alignSelf: "center",
  },
  weatherIcon: {
    width: 30,
    height: 30,
  },
  detailsTextTitle: {
    marginBottom: 5,
    textDecorationLine: "underline",
    color: "white",
    fontSize: 17,
    alignSelf: "center",
  },
  detailTextName: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
    alignSelf: "center",
  },
  detailTextValue: {
    color: "white",
    fontSize: 15,
    alignSelf: "center",
    fontWeight: "300",
  },
});
