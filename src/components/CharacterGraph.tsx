import React, { useMemo } from 'react';
import { Card, Typography, Box } from '@mui/joy';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import type { Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import type { Character, Film, Starship } from '../services/api';
import CustomNode from './CustomNode';

interface CharacterGraphProps {
  character: Character;
  films: Film[];
  starships: Starship[];
}

const nodeTypes = {
  custom: CustomNode,
};

/**
 * CharacterGraph Component
 * Display and manage character relationship graph
 * Follows React Flow best practices: memoize nodes/edges to prevent unnecessary re-renders
 */
function CharacterGraph({ character, films, starships }: CharacterGraphProps) {
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

  // Memoize graph data to prevent unnecessary recalculations
  const { graphNodes, graphEdges } = useMemo(() => {
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];

    // Main character node
    const characterNode: Node = {
      id: `character-${character.id}`,
      data: { label: character.name },
      position: { x: 0, y: 0 },
      type: 'custom',
      style: {
        background: '#ef4444',
        color: '#fff',
        border: '2px solid #dc2626',
        padding: '10px',
        borderRadius: '8px',
      },
    };
    newNodes.push(characterNode);

    // Film nodes
    films.forEach((film, index) => {
      const angle = (index / Math.max(films.length, 1)) * (Math.PI * 2);
      const radius = 150;
      const node: Node = {
        id: `film-${film.id}`,
        data: { label: `${film.title} (Ep. ${film.episode_id})` },
        position: {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
        },
        type: 'custom',
        style: {
          background: '#14b8a6',
          color: '#fff',
          border: '2px solid #0d9488',
          padding: '10px',
          borderRadius: '8px',
          fontSize: '12px',
          maxWidth: '120px',
        },
      };
      newNodes.push(node);
      newEdges.push({
        id: `character-${character.id}-film-${film.id}`,
        source: `character-${character.id}`,
        target: `film-${film.id}`,
        animated: true,
      });
    });

    // Starship nodes
    starships.forEach((starship, index) => {
      const angle = (index / Math.max(starships.length, 1)) * (Math.PI * 2) + Math.PI / 4;
      const radius = 250;
      const node: Node = {
        id: `starship-${starship.id}`,
        data: { label: starship.name },
        position: {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
        },
        type: 'custom',
        style: {
          background: '#86efac',
          color: '#000',
          border: '2px solid #4ade80',
          padding: '10px',
          borderRadius: '8px',
          fontSize: '12px',
          maxWidth: '120px',
        },
      };
      newNodes.push(node);

      if (films.length > 0) {
        newEdges.push({
          id: `film-${films[0].id}-starship-${starship.id}`,
          source: `film-${films[0].id}`,
          target: `starship-${starship.id}`,
        });
      }
    });

    return { graphNodes: newNodes, graphEdges: newEdges };
  }, [character, films, starships]);

  React.useEffect(() => {
    setNodes(graphNodes);
    setEdges(graphEdges);
  }, [graphNodes, graphEdges, setNodes, setEdges]);

  return (
    <Card sx={{ height: '600px' }}>
      <Typography level="h3" sx={{ mb: 2 }}>
        Character Relations Graph
      </Typography>
      <Box sx={{ height: '550px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
        <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </Box>
    </Card>
  );
}

export default React.memo(CharacterGraph);
