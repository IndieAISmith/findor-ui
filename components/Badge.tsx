
import React from 'react';
import { HttpMethod } from '../types';

interface BadgeProps {
  method: HttpMethod;
}

const methodColors: Record<HttpMethod, string> = {
  GET: 'text-green-400 bg-green-900/50 border border-green-700/50',
  POST: 'text-blue-400 bg-blue-900/50 border border-blue-700/50',
  PUT: 'text-yellow-400 bg-yellow-900/50 border border-yellow-700/50',
  PATCH: 'text-orange-400 bg-orange-900/50 border border-orange-700/50',
  DELETE: 'text-red-400 bg-red-900/50 border border-red-700/50',
};

export const Badge: React.FC<BadgeProps> = ({ method }) => {
  const colorClasses = methodColors[method] || 'text-gray-400 bg-gray-900/50 border border-gray-700/50';

  return (
    <span className={`w-16 text-center px-2 py-1 text-xs font-semibold rounded-md ${colorClasses}`}>
      {method}
    </span>
  );
};
