import {useNavigation} from '@react-navigation/native';
import {useCallback, useRef, useState} from 'react';
import {Animated} from 'react-native';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {SetIsAuthorized} from '~/redux/reducers/authSlice';
import {AuthenticationStackParamList} from '~/types';
import {StackNavigationProp} from '@react-navigation/stack';

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [toggle, setToggle] = useState(false);
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const {navigate} =
    useNavigation<StackNavigationProp<AuthenticationStackParamList>>();

  const changeLayoutRef = useRef(new Animated.Value(1)).current;
  const handleChangeLayout = useCallback(() => {
    Animated.timing(changeLayoutRef, {
      toValue: isSignIn ? 0 : 1,
      duration: 500,
      useNativeDriver: false,
    }).start(async () => {
      setIsSignIn(prev => !prev);
    });
  }, [changeLayoutRef, isSignIn]);

  const handleLogin = useCallback(() => {
    dispatch(SetIsAuthorized(true));
  }, []);
  const handleRegister = useCallback(() => {
    navigate('Survey');
  }, []);

  return {
    toggle,
    setToggle,
    isSignIn,
    isShowPassword,
    setIsShowPassword,
    changeLayoutRef,
    handleChangeLayout,
    handleLogin,
    handleRegister,
  };
};
