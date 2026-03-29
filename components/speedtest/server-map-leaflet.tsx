"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";

type Props = {
  lat: number;
  lng: number;
  label: string;
};

export default function ServerMapLeaflet({ lat, lng, label }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const map = L.map(el, { zoomControl: true }).setView([lat, lng], 11);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap",
      maxZoom: 19,
    }).addTo(map);

    const marker = L.circleMarker([lat, lng], {
      radius: 11,
      fillColor: "#2dd4bf",
      color: "#f8fafc",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.92,
    }).addTo(map);
    marker.bindPopup(`<strong>Servidor</strong><br/>${escapeHtml(label)}`);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [lat, lng, label]);

  return (
    <div
      ref={containerRef}
      className="isolate z-0 h-[min(42vh,340px)] w-full max-w-lg rounded-xl border border-slate-700/80 bg-slate-900/50"
    />
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
