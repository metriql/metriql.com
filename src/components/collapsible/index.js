import React, {useState} from 'react';

import styles from './styles.module.css';

function Collapsible({children, header, expand}) {

  const [expanded, setExpanded] = useState(expand);
  const toggleExpanded = function() {
      setExpanded(!expanded);
  }

  return (
    <>
        <h4 onClick={toggleExpanded} style={{cursor:'pointer'}}>
            { expanded ?  '➖'  : '➕' }
            {header}
        </h4>
        { expanded ? children : '' }
    </>
  );
}

export default Collapsible;