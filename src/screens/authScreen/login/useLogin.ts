import {useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useRef, useState} from 'react';
import {Animated} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {
  SetIsAuthorized,
  SetUserInforLogin,
  selectAuthLoadingState,
} from '~/redux/reducers/authSlice';
import {AuthenticationStackParamList} from '~/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {LoginParams, RegisterParams} from '~/types/auth';
import {getUserById, register} from '~/redux/actions/authAction';
import axios from 'axios';
import {apiUrl} from '~/services/paths';
import {Methods} from '~/services/method';
import {authService} from '~/services/service/auth.service';
import {AppProvider} from '~/app/appProvider';
import {checkRole} from '~/utils';
import {setUserInfo} from '~/redux/actions/userInfoAction';
import {AddPopupMessage} from '~/redux/reducers/popupMessageSlice';
import {userService} from '~/services/service/user.service';

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authLoadingState = useSelector(selectAuthLoadingState);
  const [toggle, setToggle] = useState(false);
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowPasswordSignIn, setIsShowPasswordSignIn] =
    useState<boolean>(false);

  const {navigate} =
    useNavigation<StackNavigationProp<AuthenticationStackParamList>>();

  const [userNameSignIn, setUserNameSignIn] = useState<string>('');
  const [passwordSignIn, setPasswordSignIn] = useState<string>('');

  const [fullNameSignUp, setFullNameSignUp] = useState<string>('');
  const [emailSignUp, setEmailSignUp] = useState<string>('');
  const [passwordSignUp, setPasswordSignUp] = useState<string>('');

  const changeLayoutRef = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (authLoadingState === 'fulfilled') {
      authService
        .login({
          username: fullNameSignUp,
          password: passwordSignUp,
        } as LoginParams)
        .then(async res => {
          if (res.status === 201) {
            await AppProvider.setTokenUser(
              res.data.access_token,
              res.data.refresh_token,
            );
            authService.me().then(async res => {
              console.log('res me', res);
              await AppProvider.setAccountInfo({
                id: res.data.id,
                username: res.data.username,
                role: res.data.role,
                email: res.data.email,
              });
              dispatch(getUserById({id: res.data.id.toString()}));
              dispatch(
                SetUserInforLogin({
                  id: res.data.id,
                  username: res.data.username,
                  role: res.data.role,
                  email: res.data.email,
                }),
              );
            });
          }
        });
      navigate('Survey');
    }
  }, [authLoadingState]);

  useEffect(() => {
    const isSetDataLogin = async () => {
      const dataLogin = await AppProvider.getDataLogin();
      console.log('dataLogin', dataLogin);
      if (dataLogin) {
        setUserNameSignIn(dataLogin.username);
        setPasswordSignIn(dataLogin.password);
      }
    };
    isSetDataLogin();
  }, []);

  const handleChangeLayout = useCallback(() => {
    Animated.timing(changeLayoutRef, {
      toValue: isSignIn ? 0 : 1,
      duration: 500,
      useNativeDriver: false,
    }).start(async () => {
      setIsSignIn(prev => !prev);
    });
  }, [changeLayoutRef, isSignIn]);

  const handleLogin = useCallback(async () => {
    // dispatch(SetIsAuthorized(true));
    authService
      .login({
        username: userNameSignIn,
        password: passwordSignIn,
      } as LoginParams)
      .then(res => {
        console.log('res Login', res);
        if (res.status === 201) {
          AppProvider.setTokenUser(
            res.data.access_token,
            res.data.refresh_token,
          );
          if (toggle) {
            AppProvider.setDataLogin({
              username: userNameSignIn,
              password: passwordSignIn,
            });
          }
          authService.me().then(res => {
            console.log('res me', res);
            dispatch(SetIsAuthorized(checkRole(res.data.role)));
            dispatch(
              SetUserInforLogin({
                id: res.data.id,
                username: res.data.username,
                role: res.data.role,
                email: res.data.email,
              }),
            );
            dispatch(getUserById({id: res.data.id.toString()}));
          });
        } else {
          dispatch(
            AddPopupMessage({
              title: 'Error!',
              type: 'warning',
              message: res.data.message,
              size: 'small',
              time: 'long',
            }),
          );
        }
      });
  }, [userNameSignIn, passwordSignIn, toggle]);
  const handleRegister = useCallback(() => {
    const dataRegister: RegisterParams = {
      username: fullNameSignUp,
      email: emailSignUp,
      password: passwordSignUp,
    };
    console.log('Params create user : ', JSON.stringify(dataRegister, null, 2));
    dispatch(register(dataRegister));
  }, [fullNameSignUp, emailSignUp, passwordSignUp]);

  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean>(true);
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean>(true);
  const onSetIsUsernameAvailable = (i: boolean) => {
    setIsUsernameAvailable(i);
  };
  const onSetIsEmailAvailable = (i: boolean) => {
    setIsEmailAvailable(i);
  };
  const onUserNameBlur = (text: string) => {
    if (text == '') {
      onSetIsUsernameAvailable(true);
      return;
    }
    userService.checkUsername({username: text}).then(res => {
      console.log('res check: ', JSON.stringify(res));
      if (res.data) {
        onSetIsUsernameAvailable(true);
      } else {
        onSetIsUsernameAvailable(false);
      }
    });
  };
  const onEmailBlur = (text: string) => {
    if (text == '') {
      onSetIsEmailAvailable(true);
      return;
    }
    userService.checkEmail({email: text}).then(res => {
      console.log('res check email: ', JSON.stringify(res));
      if (res.data) {
        onSetIsEmailAvailable(true);
      } else {
        onSetIsEmailAvailable(false);
      }
    });
  };

  return {
    toggle,
    setToggle,
    isSignIn,
    isShowPassword,
    setIsShowPassword,
    isShowPasswordSignIn,
    setIsShowPasswordSignIn,
    changeLayoutRef,
    handleChangeLayout,
    handleLogin,
    handleRegister,
    userNameSignIn,
    setUserNameSignIn,
    passwordSignIn,
    setPasswordSignIn,
    fullNameSignUp,
    setFullNameSignUp,
    emailSignUp,
    setEmailSignUp,
    passwordSignUp,
    setPasswordSignUp,
    isUsernameAvailable,
    isEmailAvailable,
    onUserNameBlur,
    onEmailBlur,
  };
};
