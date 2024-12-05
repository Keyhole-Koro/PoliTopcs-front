import React, { useState } from 'react';
import './Tooltip.css';
interface TooltipProps {
  term: string;
  definition: string;
}

const Tooltip: React.FC<TooltipProps> = ({ term, definition }) => (
  <span className="tooltip-term">
    {term}
    <div className="tooltip-box">
      <strong className="tooltip-title">{term}</strong>
      <p className="tooltip-content">{definition}</p>
    </div>
  </span>
);

export default Tooltip;