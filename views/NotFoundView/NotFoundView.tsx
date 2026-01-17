'use client';

import React from 'react';
import ErrorView from '@/views/ErrorView/ErrorView';

export default function NotFoundView() {
  return (
    <ErrorView
      statusCode={404}
      title="UPS, NEŠTO JE POŠLO PO ZLU!"
      message="Ove stranice nema. Nestala je. Sakrila se. Pokušaj pronaći nešto drugo što ti se sviđa (tražilica) ili pogledaj preporuke koje ti nudimo na naslovnici."
      emoji="🍽️"
    />
  );
}
