import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, CircularProgress, Stack, Alert, Typography, Grid } from '@mui/joy';
import type { Character } from '../services/api';
import { getCharacters } from '../services/api';
import { CharacterCard, CharacterGridCard, ViewToggle, Pagination } from '../components';
import './CharactersPage.css';

type ViewMode = 'list' | 'grid';

export default function CharactersPage() {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  useEffect(() => {
    fetchCharacters();
  }, [page]);

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCharacters(page);
      setCharacters(data.results);
      setTotalPages(Math.ceil(data.count / 10));
    } catch (err) {
      setError('Failed to fetch characters. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCharacterClick = (id: number) => {
    navigate(`/character/${id}`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography level="h1" sx={{ mb: 2 }}>
          Star Wars Characters
        </Typography>
        <ViewToggle currentMode={viewMode} onModeChange={setViewMode} />
      </Box>

      {error && (
        <Alert color="danger" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : viewMode === 'list' ? (
        <Stack spacing={2} sx={{ mb: 4 }}>
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} onClick={handleCharacterClick} />
          ))}
        </Stack>
      ) : (
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {characters.map((character) => (
            <Grid key={character.id} xs={12} sm={6} md={4}>
              <CharacterGridCard character={character} onClick={handleCharacterClick} />
            </Grid>
          ))}
        </Grid>
      )}

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </Container>
  );
}
