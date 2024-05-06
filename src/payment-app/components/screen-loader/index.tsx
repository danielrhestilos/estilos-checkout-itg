import React, { useContext } from 'react';
import SpinnerLoader from '../loader';
import styles from './screen-loader.module.css'
import { LoaderContext } from '../../context/loader.context';

const FullScreenLoader = () => {
  const { showLoader } = useContext(LoaderContext)
  return showLoader ? (
    <div className={styles['fullscreen-loader']}>
      <SpinnerLoader />
    </div>
  ): <></>;
};

export default FullScreenLoader;
