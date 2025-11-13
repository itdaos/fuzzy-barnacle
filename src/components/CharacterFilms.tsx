import { Card, Typography, Stack, Box } from '@mui/joy';
import type { Film } from '../services/api';

interface CharacterFilmsProps {
  films: Film[];
}

/**
 * CharacterFilms Component
 * Display character's films
 */
export default function CharacterFilms({ films }: CharacterFilmsProps) {
  if (!films || films.length === 0) {
    return null;
  }

  return (
    <Card>
      <Typography level="h3" sx={{ mb: 2 }}>
        Films
      </Typography>
      <Stack spacing={2}>
        {films.map((film) => (
          <Box
            key={film.id}
            sx={{
              p: 2,
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
            }}
          >
            <Typography level="title-md">
              Episode {film.episode_id}: {film.title}
            </Typography>
            <Typography level="body-sm">
              <strong>Release Date:</strong> {film.release_date}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Card>
  );
}
