import { Box, Button } from '@mui/joy';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * Pagination Component
 * Handle pagination controls
 */
export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
      <Button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        Previous
      </Button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? 'solid' : 'outlined'}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
      <Button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        Next
      </Button>
    </Box>
  );
}
