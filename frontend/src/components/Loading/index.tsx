import React from 'react';
import Loader from 'react-loading';

import './styles.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <Loader type="spin" color="var(--primary-color)" />
    </div>
  )
}

export default Loading;
