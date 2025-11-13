import { Handle, Position } from 'reactflow';
import { Box, Typography } from '@mui/joy';

interface CustomNodeData {
  label: string;
}

/**
 * CustomNode Component
 * Custom node type for React Flow graph visualization
 * Replaces default node rendering with styled JoyUI components
 */
export default function CustomNode({ data }: { data: CustomNodeData }) {
  return (
    <Box
      sx={{
        padding: '10px 12px',
        borderRadius: '8px',
        background: '#fff',
        border: '2px solid #e0e0e0',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Handle type="target" position={Position.Top} />
      <Typography level="body-sm" sx={{ fontWeight: 500, textAlign: 'center' }}>
        {data.label}
      </Typography>
      <Handle type="source" position={Position.Bottom} />
    </Box>
  );
}
