import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {SetIsAuthorized} from '~/redux/reducers/authSlice';
import {AppProvider} from '~/app/appProvider';

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Pressable
      onPress={() => {
        dispatch(SetIsAuthorized(false));
        AppProvider.setTokenUser('', '');
      }}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Text>Profile</Text>
    </Pressable>
  );
};

export default Profile;

const styles = StyleSheet.create({});
