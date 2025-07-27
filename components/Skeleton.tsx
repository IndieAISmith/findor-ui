import React from 'react';

const Skeleton: React.FC = () => {
  return (
    <div className="skeleton-loader">
      <div className="skeleton-sidebar"></div>
      <div className="skeleton-content"></div>
    </div>
  );
};

export default Skeleton;