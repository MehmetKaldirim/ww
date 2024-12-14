import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { getWeather } from "../services/weatherService";

const MeinScreen = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await getWeather("Bochum");
        setWeatherData(response.data.forecast.forecastday[0]); // İlk günün verisi
        setLoading(false);
      } catch (err) {
        setError("Hava durumu verileri alınamadı.");
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const { hour } = weatherData; // Günün saatlik hava durumu
  const morningTemp =
    hour.find((h) => h.time.includes("06:00"))?.temp_c || "N/A";
  const noonTemp = hour.find((h) => h.time.includes("12:00"))?.temp_c || "N/A";
  const eveningTemp =
    hour.find((h) => h.time.includes("18:00"))?.temp_c || "N/A";
  const nightTemp = hour.find((h) => h.time.includes("23:00"))?.temp_c || "N/A";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bochum Hava Durumu</Text>
      <View style={styles.section}>
        <Text style={styles.label}>Morning:</Text>
        <Text style={styles.value}>{morningTemp}°C</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Day:</Text>
        <Text style={styles.value}>{noonTemp}°C</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Evening:</Text>
        <Text style={styles.value}>{eveningTemp}°C</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Night:</Text>
        <Text style={styles.value}>{nightTemp}°C</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#000000", // Siyah arka plan
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#ffffff", // Beyaz yazı
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff",
    paddingBottom: 10,
  },
  label: {
    fontSize: 18,
    color: "#ffffff",
  },
  value: {
    fontSize: 18,
    color: "#ffffff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  loadingText: {
    color: "#ffffff",
    marginTop: 10,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  errorText: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default MeinScreen;
