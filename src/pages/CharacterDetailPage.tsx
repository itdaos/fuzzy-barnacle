import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, CircularProgress, Stack, Alert } from '@mui/joy';
import type { Character, Film, Starship } from '../services/api';
import { getCharacter, getFilm, getStarship } from '../services/api';
import { CharacterInfo, CharacterFilms, CharacterStarships, CharacterGraph } from '../components';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithRateLimit = async <T,>(
  ids: number[],
  fetchFn: (id: number) => Promise<T>,
  delayMs: number = 100
): Promise<T[]> => {
  const results: T[] = [];
  for (const id of ids) {
    const result = await fetchFn(id);
    results.push(result);
    await delay(delayMs);
  }
  return results;
};

export default function CharacterDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character | null>(null);
  const [films, setFilms] = useState<Film[]>([]);
  const [starships, setStarships] = useState<Starship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!id) throw new Error('Character ID not found');

      const characterId = parseInt(id, 10);
      const charData = await getCharacter(characterId);
      setCharacter(charData);

      const filmsData = await fetchWithRateLimit(charData.films, getFilm, 150);
      setFilms(filmsData);

      // Fetch starships associated with the character's films by intersecting film `starships` and character `starships`
      const starshipIds = new Set<number>();
      filmsData.forEach((film: Film) => {
        film.starships.forEach((shipId: number) => {
          if (shipId > 0 && charData.starships.includes(shipId)) starshipIds.add(shipId);
        });
      });

      const starshipList = Array.from(starshipIds);
      const starshipsData = await fetchWithRateLimit(starshipList, getStarship, 150);
      setStarships(starshipsData);
    } catch (err) {
      setError('Failed to fetch character data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !character) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert color="danger" sx={{ mb: 2 }}>
          {error || 'Character not found'}
        </Alert>
        <Button onClick={() => navigate('/')}>Back to Characters</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button onClick={() => navigate('/')} sx={{ mb: 2 }}>
        ← Back to Characters
      </Button>

      <Stack spacing={3}>
        <CharacterInfo character={character} />
        <CharacterGraph character={character} films={films} starships={starships} />
        <CharacterFilms films={films} />
        <CharacterStarships starships={starships} />
      </Stack>
    </Container>
  );
}
