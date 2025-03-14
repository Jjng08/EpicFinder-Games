export interface FiltersType {
  year: string
  genre: string
  platform: string
  tag: string
  developer: string
  [key: string]: string
}

export interface Platform {
  platform: {
    id: number
    name: string
    slug: string
  }
  released_at?: string
}

export interface Genre {
  id: number
  name: string
  slug: string
}

export interface Developer {
  id: number
  name: string
  slug: string
}

export interface Publisher {
  id: number
  name: string
  slug: string
}

export interface Tag {
  id: number
  name: string
  slug: string
}

export interface Game {
  id: number
  slug: string
  name: string
  released: string
  background_image: string
  rating: number
  metacritic: number
  platforms: Platform[]
  genres: Genre[]
  developers?: Developer[]
  publishers?: Publisher[]
  tags?: Tag[]
  description_raw?: string
  parent_platforms?: { platform: { id: number; name: string } }[];
}

export interface Trailer {
  id: number
  name: string
  preview: string
  data: {
    480: string
    max: string
  }
}
