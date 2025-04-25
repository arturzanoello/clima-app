import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { WeatherData } from "./props";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import { styles } from "./styles";

import { APIKEY } from "../../constants/weather";
import { API_BASE_URL } from "../../constants/weather";

import { fetchWeatherByCity, fetchWeatherByCoords } from "../../api/api";

export default function Home() {
    const [city, setCity] = useState<string>('Brasilia');
    const [loading, setLoading] = useState(false);
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [errorMessage, setErrorMessage] = useState<any>(null);

    async function fetchWeather(city: string) {
        setLoading(true);
        setErrorMessage(null);

        try {
            const result = await fetchWeatherByCity(city);
            setWeatherData(result);
        } catch (error: any) {
            setErrorMessage(error.message);
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    }

    async function fetchWeatherFromLocation() {
        setLoadingLocation(true);
        setErrorMessage(null);

        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                throw new Error("Permissão da localização negada!");
            }

            const location = await Location.getCurrentPositionAsync();
            const { latitude, longitude } = location.coords;
            const result = await fetchWeatherByCoords(latitude, longitude);

            setWeatherData(result);
        } catch (error: any) {
            setErrorMessage(error.message);
        } finally {
            setLoadingLocation(false);
        }
    }

    useEffect(() => {
        fetchWeather(city);
    }, []);

    return (
        <View
            style={styles.container}
        >
            <StatusBar style="auto" />

            <View
                style={styles.containerSearch}
            >
                <TextInput
                    placeholder="Cidade"
                    style={styles.TextInput}
                    value={city}
                    onChangeText={setCity}
                />

                <TouchableOpacity
                    onPress={() => fetchWeather(city)}
                    style={{ padding: 10 }}
                >
                    {loading ? (
                        <ActivityIndicator color="#777" size={2} />
                    ) : (
                        <Feather name="search" size={24} color="#777" />
                    )}
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.containerLocation}
                onPress={fetchWeatherFromLocation}
            >
                {loadingLocation ? (
                    <Text style={styles.textLocation}>
                        Carregando...
                    </Text>
                ) : (
                    <Text style={styles.textLocation}>
                        Usar minha Localização
                    </Text>
                )}
            </TouchableOpacity>

            {errorMessage && (
                <Text style={{ color: "#777", marginVertical: 20, fontSize: 16 }}>
                    {errorMessage}
                </Text>
            )}

            {weatherData && (
                <>
                    <Text style={{ fontSize: 16 }}>{weatherData.name}</Text>
                    <Text style={{ fontSize: 25, fontWeight: "700", marginTop: 10 }}>
                        {weatherData.main.temp}º
                    </Text>
                    <Image
                        style={{ width: 100, height: 100 }}
                        source={{
                            uri: `https://openweathermap.org/img/wn/${weatherData?.weather?.[0].icon}@2x.png`,
                        }}
                    />
                </>
            )}

        </View>
    );
}