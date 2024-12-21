import apiClient from "./apiClient";

export const createRecord = ({
  description,
  mintemp,
  maxtemp,
  wind,
  weatherData,
}) => {
  const params = {
    description,
    mintemp,
    maxtemp,
    wind,
    weatherData,
  };

  return apiClient.post("record/", params);
};
