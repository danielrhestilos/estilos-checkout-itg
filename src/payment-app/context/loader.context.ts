// create global context for the loader
import { createContext } from 'react';
import { LoaderContextType } from '../typings/loader';
const defaultLoader: LoaderContextType =  {
  showLoader: false,
  toggleLoader: () => {}
};
export const LoaderContext = createContext<LoaderContextType>(defaultLoader);

