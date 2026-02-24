"use client";

import { useState } from "react";

export default function MeteoPage() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    
    setLoading(true);
    setError("");
    setWeather(null);

    const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    
    try {
      // Usiamo l'endpoint 'weather' per i dati attuali
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=it&appid=${API_KEY}`
      );

      if (!res.ok) {
        throw new Error("Città non trovata");
      }

      const data = await res.json();
      setWeather(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Meteo OpenWeather 🌤️</h1>
        
        <div className="flex gap-2 mb-8">
          <input
            type="text"
            placeholder="Cerca città (es. Roma)..."
            className="flex-1 border-b-2 border-gray-200 p-2 outline-none focus:border-orange-400 transition-colors text-gray-700"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
          />
          <button
            onClick={fetchWeather}
            className="bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600 transition shadow-md active:scale-95"
          >
            Cerca
          </button>
        </div>

        {loading && <p className="text-center text-gray-500 animate-pulse">Consultando i satelliti...</p>}
        {error && <p className="text-red-500 text-center font-semibold">{error}</p>}

        {weather && (
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">{weather.name}, {weather.sys.country}</h2>
            
            <div className="flex flex-col items-center">
              {/* Icona dinamica di OpenWeather */}
              <img 
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                alt="meteo icon"
                className="w-32 h-32"
              />
              <p className="text-6xl font-black text-gray-900">{Math.round(weather.main.temp)}°C</p>
              <p className="text-xl text-gray-500 capitalize">{weather.weather[0].description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">
              <div className="text-center">
                <p className="text-gray-400 text-sm italic">Umidità</p>
                <p className="font-bold text-gray-700">{weather.main.humidity}%</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm italic">Vento</p>
                <p className="font-bold text-gray-700">{weather.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}