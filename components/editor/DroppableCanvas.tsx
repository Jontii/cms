'use client';

import { useDroppable } from '@dnd-kit/core';

interface DroppableCanvasProps {
  id: string;
  children: React.ReactNode;
}

export function DroppableCanvas({ id, children }: DroppableCanvasProps) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return <div ref={setNodeRef}>{children}</div>;
}

