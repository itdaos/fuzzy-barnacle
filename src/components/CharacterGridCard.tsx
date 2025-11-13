import { Card, Typography } from '@mui/joy';
import type { Character } from '../services/api';

interface CharacterGridCardProps {
  character: Character;
  onClick: (id: number) => void;
}

/**
 * CharacterGridCard Component
 * Render a character card optimized for grid layout
 */
export default function CharacterGridCard({ character, onClick }: CharacterGridCardProps) {
  return (
    <Card
      sx={{
        cursor: 'pointer',
        height: '100%',
        '&:hover': { boxShadow: 'md' },
        transition: 'all 0.2s',
        display: 'flex',
        flexDirection: 'column',
      }}
      onClick={() => onClick(character.id)}
    >
      <Typography level="title-md">{character.name}</Typography>
      <Typography level="body-xs" sx={{ mt: 1 }}>
        <strong>Gender:</strong> {character.gender}
      </Typography>
      <Typography level="body-xs">
        <strong>Birth Year:</strong> {character.birth_year}
      </Typography>
      <Typography level="body-xs">
        <strong>Height:</strong> {character.height} cm
      </Typography>
      <Typography level="body-xs">
        <strong>Mass:</strong> {character.mass} kg
      </Typography>
    </Card>
  );
}
