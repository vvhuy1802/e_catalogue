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

export const useEditProfile = () => {
  const userInfo = useSelector(selectUserInfo);
  const [fullName, setFullName] = useState<string>(userInfo.fullname || '');
  const [phone, setPhone] = useState<string>(userInfo.phone || '');
  const [sex, setSex] = useState<'male' | 'female' | 'unknown' | undefined>(
    userInfo.sex || undefined,
  );
  const [birthday, setBirthday] = useState<Date>(
    userInfo.dob ? new Date(userInfo.dob) : new Date(),
  );

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
    {label: 'Other', value: 'unknown'},
  ]);

  const [showDateTimePicker, setShowDateTimePicker] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const onSave = () => {
    // console.log(
    //   'param save: ',
    //   JSON.stringify(
    //     {
    //       fullname: fullName,
    //       phone: phone,
    //       sex: sex,
    //       birthday: birthday
    //         ? birthday.getFullYear() +
    //           '-' +
    //           (birthday.getMonth() + 1).toString() +
    //           '-' +
    //           birthday.getDate()
    //         : '',
    //     },
    //     null,
    //     2,
    //   ),
    // );
    dispatch(
      setUserInfo({
        fullname: fullName,
        phone: phone,
        sex: sex,
        dob: birthday
          ? birthday.getFullYear() +
            '-' +
            (birthday.getMonth() + 1).toString() +
            '-' +
            birthday.getDate()
          : '',
      }),
    );
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
    fullName: {
      value: fullName,
      setValue: setFullName,
    },
    phone: {value: phone, setValue: setPhone},
    sex: {value: sex, setValue: setSex},
    birthday: {value: birthday, setValue: setBirthday},
    open: {value: open, setValue: setOpen},
    items: {value: items, setValue: setItems},
    showDateTimePicker: {
      value: showDateTimePicker,
      setValue: setShowDateTimePicker,
    },
    onSave,
  };
};
