import { WeatherState } from "./weather";

export const SpriteRegistry = {
  idle: "/sprites/atharva-sprite.png",
  umbrella: "/sprites/rain.png",
  cloudy: "/sprites/cloudy.png",
  sunny: "/sprites/sunny.png",
  windy: "/sprites/windy.png",
} as const;

export type AnimationType = keyof typeof SpriteRegistry;

export function getAnimationForWeather(weather: WeatherState): AnimationType {
  switch (weather) {
    case "rain":
      return "umbrella";
    case "cloudy":
      return "cloudy";
    case "sunny":
      return "sunny";
    case "windy":
      return "windy";
    case "clear":
    default:
      return "idle";
  }
}
