import { config } from "./config";

export type WeatherState = "clear" | "rain";

export async function getCurrentWeather(): Promise<WeatherState> {
  const { latitude, longitude } = config.weather;
  
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    
    const response = await fetch(url, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch weather: ${response.status}`);
      return "clear";
    }
    
    const data = await response.json();
    const code = data.current_weather?.weathercode;
    
    // WMO Weather interpretation codes
    // Rain/Drizzle/Thunderstorm codes:
    // 51, 53, 55 (Drizzle)
    // 56, 57 (Freezing Drizzle)
    // 61, 63, 65 (Rain)
    // 66, 67 (Freezing Rain)
    // 80, 81, 82 (Rain showers)
    // 95, 96, 99 (Thunderstorm)
    const rainCodes = new Set([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99]);
    
    if (code !== undefined && rainCodes.has(code)) {
      return "rain";
    }
    
    return "clear";
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return "clear";
  }
}
