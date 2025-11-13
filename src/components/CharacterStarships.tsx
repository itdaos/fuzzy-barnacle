import { Card, Typography, Stack, Box } from '@mui/joy';
import type { Starship } from '../services/api';

interface CharacterStarshipsProps {
  starships: Starship[];
}

/**
 * CharacterStarships Component
 * Display character's starships
 */
export default function CharacterStarships({ starships }: CharacterStarshipsProps) {
  if (!starships || starships.length === 0) {
    return null;
  }

  return (
    <Card>
      <Typography level="h3" sx={{ mb: 2 }}>
        Starships
      </Typography>
      <Stack spacing={2}>
        {starships.map((starship) => (
          <Box
            key={starship.id}
            sx={{
              p: 2,
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
            }}
          >
            <Typography level="title-md">{starship.name}</Typography>
            <Typography level="body-sm">
              <strong>Model:</strong> {starship.model}
            </Typography>
            <Typography level="body-sm">
              <strong>Class:</strong> {starship.starship_class}
            </Typography>
            <Typography level="body-sm">
              <strong>Manufacturer:</strong> {starship.manufacturer}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Card>
  );
}
