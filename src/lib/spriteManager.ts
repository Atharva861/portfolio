export const SpriteRegistry = {
  idle: "/sprites/atharva-sprite.png",
  umbrella: "/sprites/umbrella.png",
} as const;

export type AnimationType = keyof typeof SpriteRegistry;

export function getAnimationForWeather(weather: "clear" | "rain"): AnimationType {
  switch (weather) {
    case "rain":
      return "umbrella";
    case "clear":
    default:
      return "idle";
  }
}
