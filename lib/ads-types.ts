/** Alineado con GET /ads/active del backend FastAPI. */

export type AdPosition = "lateral-izquierdo" | "lateral-derecho";

export type AdTipo = "imagen" | "google-ads" | "personalizado";

export type ActiveAd = {
  id: string;
  posicion: AdPosition;
  tipo: AdTipo;
  content_url: string | null;
  link_destino: string | null;
  activo: boolean;
};

export type ActiveAdsResponse = {
  lateral_izquierdo: ActiveAd | null;
  lateral_derecho: ActiveAd | null;
};
