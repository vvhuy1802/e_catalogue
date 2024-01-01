import React, {useEffect} from 'react';
import SplashScreen from './splashScreen';
import OnBoard from './onBoardScreen';
import AppStack from './appStack';
import AuthStack from './authStack';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  selectIsAuthorized,
  selectIsShowOnBoard,
  selectIsShowSplash,
} from '~/redux/reducers/authSlice';
import AdminStore from './adminStoreStack';
import AdminSystem from './adminSystemStack';

const RootNavigation = () => {
  const isAuthorized = useSelector(selectIsAuthorized);
  const isShowSplash = useSelector(selectIsShowSplash);
  const isShowOnBoard = useSelector(selectIsShowOnBoard);

  return (
    <>
      {isShowSplash ? (
        <SplashScreen />
      ) : isShowOnBoard ? (
        <OnBoard />
      ) : (
        <NavigationContainer theme={DarkTheme}>
          {isAuthorized === 'CUSTOMER' ? (
            <AppStack />
          ) : isAuthorized === 'STORE' ? (
            <AdminStore />
          ) : isAuthorized === 'ADMIN' ? (
            <AdminSystem />
          ) : (
            <AuthStack />
          )}
        </NavigationContainer>
      )}
    </>
  );
};

export default RootNavigation;
