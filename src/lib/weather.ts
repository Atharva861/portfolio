import { config } from "./config";

export type WeatherState = "clear" | "rain" | "cloudy" | "sunny" | "windy";

export interface WeatherInfo {
  state: WeatherState;
  temperature: number;
}

export async function getCurrentWeather(): Promise<WeatherInfo> {
  const { latitude, longitude } = config.weather;
  
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    
    const response = await fetch(url, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch weather: ${response.status}`);
      return { state: "clear", temperature: 0 };
    }
    
    const data = await response.json();
    const code = data.current_weather?.weathercode;
    const windspeed = data.current_weather?.windspeed;
    const temperature = data.current_weather?.temperature ?? 0;
    
    // 0: Clear sky
    // 1, 2, 3: Mainly clear, partly cloudy, and overcast
    // 45, 48: Fog
    // Rain/Drizzle/Thunderstorm codes:
    // 51, 53, 55 (Drizzle)
    // 56, 57 (Freezing Drizzle)
    // 61, 63, 65 (Rain)
    // 66, 67 (Freezing Rain)
    // 80, 81, 82 (Rain showers)
    // 95, 96, 99 (Thunderstorm)
    const rainCodes = new Set([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99]);
    const cloudyCodes = new Set([3, 45, 48]);
    
    if (code !== undefined) {
      if (rainCodes.has(code)) {
        return { state: "rain", temperature };
      }
      if (cloudyCodes.has(code)) {
        return { state: "cloudy", temperature };
      }
      if (windspeed !== undefined && windspeed > 20) {
        return { state: "windy", temperature };
      }
      if (code === 0 || code === 1 || code === 2) {
        return { state: "sunny", temperature };
      }
    }
    
    return { state: "clear", temperature };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return { state: "clear", temperature: 0 };
  }
}
