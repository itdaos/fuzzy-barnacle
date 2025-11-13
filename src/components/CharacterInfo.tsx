import { Card, Box, Stack, Typography } from '@mui/joy';
import type { Character } from '../services/api';
import { getCharacterImageUrl } from '../services/api';

interface CharacterInfoProps {
  character: Character;
}

/**
 * CharacterInfo Component
 * Display character details with image
 */
export default function CharacterInfo({ character }: CharacterInfoProps) {
  return (
    <Card>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
        <Box sx={{ flex: 1 }}>
          <Typography level="h2">{character.name}</Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: 'wrap' }}>
            <Box>
              <Typography level="body-sm">
                <strong>Gender:</strong> {character.gender}
              </Typography>
              <Typography level="body-sm">
                <strong>Birth Year:</strong> {character.birth_year}
              </Typography>
              <Typography level="body-sm">
                <strong>Height:</strong> {character.height} cm
              </Typography>
            </Box>
            <Box>
              <Typography level="body-sm">
                <strong>Mass:</strong> {character.mass} kg
              </Typography>
              <Typography level="body-sm">
                <strong>Hair Color:</strong> {character.hair_color}
              </Typography>
              <Typography level="body-sm">
                <strong>Eye Color:</strong> {character.eye_color}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
}
