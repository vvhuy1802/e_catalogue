import {View, Text} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {ORDERSTACK} from '~/constants/routeNames';
import {SetDirectionBottomBar} from '~/redux/reducers/globalSlice';
import {HomeStackParamList} from '~/types';

export const useFavorite = () => {
  return {};
};
