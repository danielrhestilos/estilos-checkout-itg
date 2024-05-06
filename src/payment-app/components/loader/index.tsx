import React from 'react';
import styles from './loader.module.css'

const SpinnerLoader = () => {
  return (
    <div className={styles['loader-container']}>
    <div className={styles['loader-spinner']}><div></div><div></div><div></div><div></div></div>
    </div>
  );
};

export default SpinnerLoader;