import React, {Suspense, useEffect} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {State} from './store/types';
import {initAppState} from './store/init.action.creators';
import MainWrapper from './components/main-wrapper/main-wrapper';
import './main.scss';

const Main: React.FC = () => {

    const dispatch = useDispatch();
    const hasGeneralError = useSelector((state: State) => {
        return state.init && state.init.generalError;
    });

    const pageNotFound = useSelector((state: State) => {
        return state.init && state.init.pageNotFound;
    });

    const contentNotAvailable = useSelector((state: State) => {
        return state.init && state.init.contentNotAvailable;
    });

    const isLoading = useSelector((state: State) => {
      return state.init && state.init.showInitLoader;
    });

   useEffect(() => {
       dispatch(initAppState());
   }, [dispatch]);

  return (
      <main style={{display: !isLoading ? 'grid' : 'none'}}  className="main">
          <Suspense fallback={<div className={'loader-app'}><p>{'Loader...'}</p><img src={"/assets/img/loader.svg"} alt={'Loding... The First Clicks'} /></div>}>
        <Router basename="/">
          <MainWrapper 
            hasError={!!hasGeneralError} 
            pageNotFound={pageNotFound} 
            contentNotAvailable={contentNotAvailable} />
        </Router>
        </Suspense>
    </main>
  );
};

export default Main;
