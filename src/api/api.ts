import { APIKEY, API_BASE_URL } from "../constants/weather";
import { WeatherData } from "../screens/Home/props";

export const fetchWeatherByCity = async (city: string): Promise<WeatherData> => {
    const response = await fetch(
        `${API_BASE_URL}q=${encodeURIComponent(city)}&appid=${APIKEY}&units=metric&lang=pt_br`
    );
    const data = await response.json();

    if (data.cod === "404") {
        throw new Error("Cidade não encontrada");
    } else if (data.cod !== 200 && data.cod !== "200") {
        throw new Error(data.message || "Erro ao buscar dados da cidade");
    }

    return data as WeatherData;
};

export const fetchWeatherByCoords = async (
    lat: number,
    lon: number
): Promise<WeatherData> => {
    const response = await fetch(
        `${API_BASE_URL}lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric&lang=pt_br`
    );
    const data = await response.json();

    if (data.cod !== 200 && data.cod !== "200") {
        throw new Error(data.message || "Erro ao buscar dados por localização");
    }

    return data as WeatherData;
};