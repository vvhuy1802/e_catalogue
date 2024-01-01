import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {AppProvider} from '~/app/appProvider';
import {AppDispatch} from '~/app/store';
import {getUserInfo} from '~/redux/actions/userInfoAction';

export const useGetUserInfo = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getData = async () => {
      const accountInfo = await AppProvider.getAccountInfo();
      if (accountInfo != undefined) {
        dispatch(getUserInfo({id: accountInfo?.id.toString()}));
      }
    };
    getData();
  }, []);

  return {};
};
