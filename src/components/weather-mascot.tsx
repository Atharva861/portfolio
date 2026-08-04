"use client";

import { useEffect, useState } from "react";
import { PixelCharacter } from "./pixel-character";
import { getAnimationForWeather } from "@/lib/spriteManager";

export function WeatherMascot({ className }: { className?: string }) {
  const [weather, setWeather] = useState<"clear" | "rain">("clear");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch("/api/weather");
        if (!res.ok) return;
        const data = await res.json();
        setWeather(data.weather);
      } catch (err) {
        console.error("Failed to fetch weather state from API:", err);
      }
    };

    fetchWeather();
  }, []);

  const animation = getAnimationForWeather(weather);

  return <PixelCharacter key={animation} className={className} animation={animation} />;
}
