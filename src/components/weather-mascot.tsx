"use client";

import { useEffect, useState } from "react";
import { PixelCharacter } from "./pixel-character";
import { getAnimationForWeather } from "@/lib/spriteManager";
import { WeatherState } from "@/lib/weather";
import { Pixelify_Sans } from "next/font/google";

const pixelify = Pixelify_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export function WeatherMascot({ className }: { className?: string }) {
  const [weather, setWeather] = useState<WeatherState>("clear");
  const [temperature, setTemperature] = useState<number | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch("/api/weather");
        if (!res.ok) return;
        const data = await res.json();
        setWeather(data.weather);
        setTemperature(data.temperature);
      } catch (err) {
        console.error("Failed to fetch weather state from API:", err);
      }
    };

    fetchWeather();
  }, []);

  const animation = getAnimationForWeather(weather);

  return (
    <div className={`flex flex-col items-center ${className || ""}`}>
      <PixelCharacter key={animation} className="w-full" animation={animation} />
      {temperature !== null && (
        <div className={`md:hidden mt-2 ${pixelify.className} text-sm text-foreground/60 tracking-wider flex items-center gap-1.5`}>
          <span>{Math.round(temperature)}°C</span>
          <span className="capitalize">{weather},</span>
          <span>Pune</span>
        </div>
      )}
    </div>
  );
}
