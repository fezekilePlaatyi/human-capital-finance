import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


const CollapsibleItem = ({identifier, title, children, index, activeIndex, setActiveIndex }) => {
    const isExpanded = index === activeIndex;

    const handleToggle = () => {
      setActiveIndex(isExpanded ? null : index);
    };

  return (
    <div className="collapsible-item">
      <button onClick={handleToggle}><span className='identifier'>{identifier}</span><h4>{title}</h4> <span className='collapsed-icon'>{isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}</span></button>
      {isExpanded && <div className={`collapse-content ${isExpanded ? 'fade-in' : 'fade-out'}`}>{children}</div>}
    </div>
  );
};

export default CollapsibleItem;