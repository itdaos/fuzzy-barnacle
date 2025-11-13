import { Stack, Button } from '@mui/joy';

type ViewMode = 'list' | 'grid';

interface ViewToggleProps {
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

/**
 * ViewToggle Component
 * Handle view mode toggling (list/grid)
 */
export default function ViewToggle({ currentMode, onModeChange }: ViewToggleProps) {
  return (
    <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
      <Button
        variant={currentMode === 'list' ? 'solid' : 'outlined'}
        onClick={() => onModeChange('list')}
      >
        List View
      </Button>
      <Button
        variant={currentMode === 'grid' ? 'solid' : 'outlined'}
        onClick={() => onModeChange('grid')}
      >
        Grid View
      </Button>
    </Stack>
  );
}
