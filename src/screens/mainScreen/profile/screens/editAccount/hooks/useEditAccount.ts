import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {ORDERSTACK} from '~/constants/routeNames';
import {SetDirectionBottomBar} from '~/redux/reducers/globalSlice';
import {HomeStackParamList} from '~/types';
import {userService} from '~/services/service/user.service';
import {setUserInfo} from '~/redux/actions/userInfoAction';
import {selectAccountInfo} from '~/redux/reducers/authSlice';
import {selectUserInfo} from '~/redux/reducers/userInfo';
import {AddPopupMessage} from '~/redux/reducers/popupMessageSlice';
import {setNewEmail, setNewUsername} from '~/redux/actions/authAction';
import {setNewPassword as SetNewPassword} from '~/redux/actions/authAction';

export const useEditAccount = () => {
  const accountInfo = useSelector(selectAccountInfo);
  console.log('accountInfo: ', JSON.stringify(accountInfo));
  const [username, setUsername] = useState<string>(accountInfo.username || '');
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean>(true);
  const [email, setEmail] = useState<string>(accountInfo.email || '');
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean>(true);
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const [isChangingPassword, setIsChangingPassword] = useState<boolean>(false);
  const onReset = () => {
    setUsername(accountInfo.username);
    setEmail(accountInfo.email);
    setCurrentPassword('');
    setNewPassword('');
  };

  const dispatch = useDispatch<AppDispatch>();

  const onUsernameBlur = (text: string) => {
    if (text == '' || text == accountInfo.username) {
      setIsUsernameAvailable(true);
      return;
    }
    userService.checkUsername({username: text}).then(res => {
      console.log('res check username: ', JSON.stringify(res));
      if (res.data) {
        setIsUsernameAvailable(true);
      } else {
        setIsUsernameAvailable(false);
      }
    });
  };
  const onEmailBlur = (text: string) => {
    if (text == '' || text == accountInfo.email) {
      setIsEmailAvailable(true);
      return;
    }
    userService.checkEmail({email: text}).then(res => {
      console.log('res check email: ', JSON.stringify(res));
      if (res.data) {
        setIsEmailAvailable(true);
      } else {
        setIsEmailAvailable(false);
      }
    });
  };

  const onSave = async () => {
    if (isChangingPassword) {
      console.log(
        'params set password: ',
        JSON.stringify(
          {
            old: currentPassword,
            new: newPassword,
          },
          null,
          2,
        ),
      );
      if (currentPassword != newPassword)
        dispatch(
          SetNewPassword({
            oldPassword: currentPassword,
            newPassword: newPassword,
          }),
        );
    } else {
      console.log(
        'params set info: ',
        JSON.stringify(
          {
            username: username,
            email: email,
          },
          null,
          2,
        ),
      );
      if (username != accountInfo.username) {
        await dispatch(setNewUsername({username: username}));
      }
      if (email != accountInfo.email) {
        await dispatch(setNewEmail({email: email}));
      }
    }

    dispatch(
      AddPopupMessage({
        title: 'Success',
        type: 'success',
        message: 'Save profile successfully!',
        size: 'small',
        time: 'long',
      }),
    );
  };
  return {
    username: {
      value: username,
      setValue: setUsername,
      isAvailable: isUsernameAvailable,
    },
    email: {value: email, setValue: setEmail, isAvailable: isEmailAvailable},
    currentPassword: {value: currentPassword, setValue: setCurrentPassword},
    newPassword: {value: newPassword, setValue: setNewPassword},
    isChangingPassword: {
      value: isChangingPassword,
      setValue: setIsChangingPassword,
    },
    isShowPassword: {value: isShowPassword, setValue: setIsShowPassword},
    onUsernameBlur,
    onEmailBlur,
    onSave,
    onReset,
    accountInfo,
  };
};
