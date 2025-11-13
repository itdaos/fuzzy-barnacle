import axios from 'axios';

const API_BASE = 'https://sw-api.starnavi.io';

const api = axios.create({
  baseURL: API_BASE,
});

export interface Character {
  id: number;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: number[];
  species: number[];
  vehicles: number[];
  starships: number[];
  created: string;
  edited: string;
  url: string;
}

export interface Film {
  id: number;
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: number[];
  planets: number[];
  starships: number[];
  vehicles: number[];
  species: number[];
  created: string;
  edited: string;
  url: string;
}

export interface Starship {
  id: number;
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: number[];
  films: number[];
  created: string;
  edited: string;
  url: string;
}

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const getCharacters = async (page: number = 1): Promise<PaginatedResponse<Character>> => {
  const response = await api.get<PaginatedResponse<Character>>('/people/', {
    params: { page },
  });
  return response.data;
};

export const getCharacter = async (id: number): Promise<Character> => {
  const response = await api.get<Character>(`/people/${id}/`);
  return response.data;
};

export const getFilm = async (id: number): Promise<Film> => {
  const response = await api.get<Film>(`/films/${id}/`);
  return response.data;
};

export const getStarship = async (id: number): Promise<Starship> => {
  const response = await api.get<Starship>(`/starships/${id}/`);
  return response.data;
};

export const extractIdFromUrl = (url: string): number => {
  const match = url.match(/\/(\d+)\/?$/);
  return match ? parseInt(match[1], 10) : 0;
};

// Generate character image URL based on character ID
export const getCharacterImageUrl = (characterId: number): string => {
  return `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`;
};
