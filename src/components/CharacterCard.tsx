import { Card, Box, Typography } from '@mui/joy';
import type { Character } from '../services/api';

interface CharacterCardProps {
  character: Character;
  onClick: (id: number) => void;
}

/**
 * CharacterCard Component
 * Render a single character card with image and basic info
 */
export default function CharacterCard({ character, onClick }: CharacterCardProps) {
  return (
    <Card
      sx={{
        cursor: 'pointer',
        '&:hover': { boxShadow: 'md' },
        transition: 'all 0.2s',
        display: 'flex',
        gap: 2,
      }}
      onClick={() => onClick(character.id)}
    >
      <Box sx={{ flex: 1 }}>
        <Typography level="title-lg">{character.name}</Typography>
        <Typography level="body-sm" sx={{ mt: 1 }}>
          <strong>Gender:</strong> {character.gender} | <strong>Birth Year:</strong>{' '}
          {character.birth_year}
        </Typography>
        <Typography level="body-sm">
          <strong>Height:</strong> {character.height} cm | <strong>Mass:</strong>{' '}
          {character.mass} kg
        </Typography>
      </Box>
    </Card>
  );
}
