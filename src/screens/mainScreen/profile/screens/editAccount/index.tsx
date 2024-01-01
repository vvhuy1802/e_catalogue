import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProfileStackParamList} from '~/types';
import HeaderProduct from '~/components/global/headerProduct';
import {TextStyle, TextFont} from '~/theme/textStyle';
import {images} from '~/assets';
import ContainerImage from '~/components/global/containerImage';
import CustomScrollView from '~/components/global/customScrollView';
import {HeightSize, WidthSize} from '~/theme/size';
import DropDownPicker, {ValueType} from 'react-native-dropdown-picker';
import {IconSvg} from '~/components/global/iconSvg';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import PrimaryButton from '~/components/global/primaryButton';
import {useEditAccount} from './hooks/useEditAccount';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {SetDirectionBottomBar} from '~/redux/reducers/globalSlice';

type EditAccountProps = {
  navigation: StackNavigationProp<ProfileStackParamList, 'EditProfile'>;
};

const EditAccount: React.FC<EditAccountProps> = ({navigation}) => {
  const {
    username,
    email,
    currentPassword,
    newPassword,
    isChangingPassword,
    isShowPassword,
    accountInfo,
    onUsernameBlur,
    onEmailBlur,
    onSave,
    onReset,
  } = useEditAccount();

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(SetDirectionBottomBar('down'));
  }, []);

  return (
    <ContainerImage
      // isOpacity={true}
      style={{flex: 1}}
      resizeMode="cover"
      source={images.home.BackgroundHome}>
      <View
        style={{
          flex: 1,
        }}>
        <HeaderProduct
          onPressBack={() => navigation.goBack()}
          title=""
          showBag={false}
          children={
            <Text
              style={{
                ...TextStyle.text3XL,
                ...TextFont.GRegular,
                marginTop: HeightSize(12),
              }}>
              Edit Account
            </Text>
          }
        />
        <View
          style={{
            marginTop: HeightSize(10),
          }}>
          {isChangingPassword.value ? (
            <>
              <View
                style={{
                  marginHorizontal: WidthSize(16),
                  marginBottom: HeightSize(32),
                }}>
                <Text style={styles.title}>Current password</Text>
                <TextInput
                  style={styles.txtInput}
                  placeholderTextColor={'#A5ABB9'}
                  placeholder="Enter your current password"
                  value={currentPassword.value}
                  onChangeText={text => currentPassword.setValue(text)}
                  secureTextEntry={!isShowPassword.value}
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: HeightSize(20),
                    right: WidthSize(20),
                  }}>
                  <IconSvg
                    width={WidthSize(16)}
                    height={WidthSize(16)}
                    icon={isShowPassword.value ? 'IconEyeShow' : 'IconEyeHide'}
                    onPress={() =>
                      isShowPassword.setValue(!isShowPassword.value)
                    }
                  />
                </View>
              </View>

              <View
                style={{
                  marginHorizontal: WidthSize(16),
                  marginBottom: HeightSize(32),
                }}>
                <Text style={styles.title}>New password</Text>
                <TextInput
                  style={styles.txtInput}
                  placeholderTextColor={'#A5ABB9'}
                  placeholder="Enter your new password"
                  value={newPassword.value}
                  onChangeText={text => newPassword.setValue(text)}
                  secureTextEntry={!isShowPassword.value}
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: HeightSize(20),
                    right: WidthSize(20),
                  }}>
                  <IconSvg
                    width={WidthSize(16)}
                    height={WidthSize(16)}
                    icon={isShowPassword.value ? 'IconEyeShow' : 'IconEyeHide'}
                    onPress={() =>
                      isShowPassword.setValue(!isShowPassword.value)
                    }
                  />
                </View>
              </View>
            </>
          ) : (
            <>
              <View
                style={{
                  marginHorizontal: WidthSize(16),
                  marginBottom: HeightSize(32),
                }}>
                <Text style={styles.title}>Username</Text>
                <TextInput
                  style={styles.txtInput}
                  placeholderTextColor={'#A5ABB9'}
                  placeholder="Enter your new username"
                  value={username.value}
                  onChangeText={text => username.setValue(text)}
                  onBlur={e => {
                    onUsernameBlur(e.nativeEvent.text);
                  }}
                  secureTextEntry={false}
                />
                {!username.isAvailable ? (
                  <Text style={styles.error}>Username is not available.</Text>
                ) : null}
              </View>

              <View
                style={{
                  marginHorizontal: WidthSize(16),
                  marginBottom: HeightSize(32),
                }}>
                <Text style={styles.title}>Email</Text>
                <TextInput
                  style={styles.txtInput}
                  placeholderTextColor={'#A5ABB9'}
                  placeholder="Enter your new email"
                  value={email.value}
                  onChangeText={text => email.setValue(text)}
                  secureTextEntry={false}
                />
                {!email.isAvailable ? (
                  <Text style={styles.error}>Email is not available.</Text>
                ) : null}
              </View>
            </>
          )}

          <View
            style={{
              alignSelf: 'center',
              width: '100%',
              paddingHorizontal: WidthSize(32),
              marginTop: HeightSize(16),
            }}>
            <PrimaryButton
              title={'Save changes'}
              handlePress={() => {
                onSave();
                navigation.goBack();
              }}
              enable={
                isChangingPassword.value
                  ? currentPassword.value != '' && newPassword.value != ''
                  : username.isAvailable &&
                    email.isAvailable &&
                    (username.value != accountInfo.username ||
                      email.value != accountInfo.email)
              }
            />
          </View>
          <Pressable
            onPress={() => {
              isChangingPassword.setValue(!isChangingPassword.value);
              onReset();
            }}
            style={{
              alignSelf: 'center',
              marginTop: HeightSize(12),
            }}>
            <Text
              style={{
                ...TextStyle.Base,
                ...TextFont.SMedium,
                marginTop: HeightSize(12),
              }}>
              {!isChangingPassword.value ? 'Change Password' : 'Change Info'}
            </Text>
          </Pressable>
        </View>
      </View>
    </ContainerImage>
  );
};

export default EditAccount;

const styles = StyleSheet.create({
  title: {
    ...TextStyle.Base,
    ...TextFont.SMedium,
    fontWeight: 'bold',
    marginBottom: HeightSize(5),
    color: '#525A7F',
  },
  error: {
    ...TextStyle.Base,
    ...TextFont.SMedium,
    fontWeight: 'bold',
    marginBottom: HeightSize(5),
    color: '#BC2424',
  },
  txtInput: {
    ...TextFont.SRegular,
    borderRadius: 16,
    paddingHorizontal: WidthSize(20),
    backgroundColor: '#F2F2F4',
    color: 'black',
    height: HeightSize(64),
    borderColor: '#D8D2C4',
    borderWidth: 1,
  },
});
