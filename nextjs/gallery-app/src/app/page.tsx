"use client";

import Image from "next/image";
import { useState } from "react";

// Dati finti: una lista di ID immagini da Unsplash
const IMAGES = [
  { id: "1506744038136-46273834b3fb", title: "Montagne" },
  { id: "1470071459604-3b5ec3a7fe05", title: "Foresta" },
  { id: "1441974231531-c6227db76b6e", title: "Alberi" },
  { id: "1501785888041-af3ef285b470", title: "Lago" },
  { id: "1472214103451-9374bd1c798e", title: "Natura" },
  { id: "1532274402811-5a211127c9c2", title: "Tramonto" },
];

export default function GalleryPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
        Focus Gallery 📸
      </h1>

      {/* Griglia Immagini */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {IMAGES.map((img) => (
          <div 
            key={img.id}
            className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg bg-gray-200 aspect-video"
            onClick={() => setSelectedId(img.id)}
          >
            <Image
              src={`https://images.unsplash.com/photo-${img.id}?auto=format&fit=crop&q=80&w=800`}
              alt={img.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <p className="text-white font-bold text-lg">{img.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modale per lo zoom (Lightbox) */}
      {selectedId && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedId(null)}
        >
          <div className="relative w-full max-w-5xl h-[80vh]">
            <Image
              src={`https://images.unsplash.com/photo-${selectedId}?auto=format&fit=crop&q=90&w=1600`}
              alt="Zoom"
              fill
              className="object-contain"
            />
            <button className="absolute top-0 right-0 text-white text-4xl p-4">&times;</button>
          </div>
        </div>
      )}
    </div>
  );
}