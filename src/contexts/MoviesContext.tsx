import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

type MoviesProviderProps = {
  children: ReactNode
}

type MoviesContextData = {
  movies: MovieProps[];
  selectedGenre: GenreResponseProps;
  selectGenre: (id: number) => void;
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export const MoviesContext = createContext({} as MoviesContextData)

export function MoviesProvider({ children }: MoviesProviderProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })

    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });
  }, [selectedGenreId]);

  return (
    <MoviesContext.Provider value={{
      movies,
      selectedGenre,
      selectGenre: setSelectedGenreId
    }}>
      {children}
    </MoviesContext.Provider>
  )
}