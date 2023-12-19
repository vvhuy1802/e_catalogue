import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {getAllCategories} from '~/redux/actions/productAction';
import {HomeStackParamList} from '~/types';

export const useHomeFacade = () => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  const lastContentOffset = useSharedValue(0);
  const isScrolling = useSharedValue(false);
  const translateY = useSharedValue(0);
  const dispatch = useDispatch<AppDispatch>();
  const [isShowDropDown, setIsShowDropDown] = useState(false);
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  return {
    dispatch,
    navigation,
    lastContentOffset,
    isScrolling,
    translateY,
    isShowDropDown,
    setIsShowDropDown,
  };
};
