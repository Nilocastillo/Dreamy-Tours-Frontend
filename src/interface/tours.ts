import type { Imagen } from "./common";

export interface Badge {
  titulo: string;
  content: string;
  icono: Imagen;
}``

export interface Timeline {
  day: string;
  titulo: string;
  itemsDay: string;
}
export interface Acordeon {
  titulo: string;
  content: string;
}

export interface Overview {
  titulo: string;
  timeline: Timeline[];
}
export interface Itinerary {
  titulo: string;
  acordeon: Acordeon[];
}
export interface Included {
  titulo: string;
  content: string;
}
export interface Information {
  titulo: string;
  acordeon: Acordeon[];
}
export interface Price {
  titulo: string;
  content: string;
}

export interface Tab {
  overview: Overview;
  itinerary: Itinerary;
  included: Included;
  information: Information;
  price: Price;
}

export interface Tour {
  id: number;
  documentId: string;
  titulo: string;
  content: string;
  slug: string;
  imagenDestacada: Imagen;
  badge: Badge[];
  tab: Tab;
}
