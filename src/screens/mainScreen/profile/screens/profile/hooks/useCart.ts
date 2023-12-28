import {View, Text} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {ORDERSTACK} from '~/constants/routeNames';
import {SetDirectionBottomBar} from '~/redux/reducers/globalSlice';
import {HomeStackParamList} from '~/types';

export const useCart = () => {
  const homeNavigation =
    useNavigation<StackNavigationProp<HomeStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  const handlePressCart = () => {
    dispatch(SetDirectionBottomBar('down'));
    homeNavigation.navigate(ORDERSTACK, {
      screen: 'MyBag',
      params: {
        isShowBottomBarWhenBack: true,
      },
    });
  };
  return {
    handlePressCart,
  };
};
