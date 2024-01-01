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
import {useEditProfile} from './hooks/useEditProfile';
import PrimaryButton from '~/components/global/primaryButton';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {SetDirectionBottomBar} from '~/redux/reducers/globalSlice';

type EditProfileProps = {
  navigation: StackNavigationProp<ProfileStackParamList, 'EditProfile'>;
};

const EditProfile: React.FC<EditProfileProps> = ({navigation}) => {
  const {
    fullName,
    phone,
    sex,
    birthday,
    open,
    items,
    showDateTimePicker,
    onSave,
  } = useEditProfile();

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
              Edit Profile
            </Text>
          }
        />
        <View
          style={{
            marginTop: HeightSize(10),
          }}>
          <View
            style={{
              marginHorizontal: WidthSize(16),
              marginBottom: HeightSize(32),
            }}>
            <Text style={styles.title}>Full name</Text>
            <TextInput
              style={styles.txtInput}
              placeholderTextColor={'#A5ABB9'}
              placeholder="Enter your full name"
              value={fullName.value}
              onChangeText={text => fullName.setValue(text)}
            />
          </View>
          <View
            style={{
              marginHorizontal: WidthSize(16),
              marginBottom: HeightSize(32),
            }}>
            <Text style={styles.title}>Phone number</Text>
            <TextInput
              style={styles.txtInput}
              placeholderTextColor={'#A5ABB9'}
              placeholder="Enter your phone number"
              value={phone.value}
              keyboardType="decimal-pad"
              onChangeText={text => phone.setValue(text)}
            />
          </View>

          <View
            style={{
              marginHorizontal: WidthSize(16),
              marginBottom: HeightSize(32),
            }}>
            <Text style={styles.title}>Date of birth</Text>
            <Pressable
              onPress={() => {
                showDateTimePicker.setValue(true);
              }}
              style={{
                borderRadius: 16,
                paddingHorizontal: WidthSize(20),
                backgroundColor: '#F2F2F4',
                height: HeightSize(64),
                borderColor: '#D8D2C4',
                borderWidth: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {(showDateTimePicker.value || birthday.value != undefined) && (
                <DateTimePicker
                  testID="datetimePicker"
                  value={birthday.value || new Date()}
                  mode={'date'}
                  display="default"
                  onChange={(event: DateTimePickerEvent, date?: Date) => {
                    birthday.setValue(date);
                  }}
                  themeVariant={'light'}
                  style={{
                    backgroundColor: '#F2F2F4',
                  }}
                />
              )}
              {!showDateTimePicker.value && birthday.value == undefined && (
                <Text
                  style={{
                    ...TextFont.SRegular,
                    color: '#A5ABB9',
                    paddingTop: HeightSize(4),
                  }}>
                  Select your date of birth
                </Text>
              )}
            </Pressable>
          </View>

          <View
            style={{
              marginHorizontal: WidthSize(16),
              marginBottom: HeightSize(32),
            }}>
            <Text style={styles.title}>Sex</Text>
            <DropDownPicker
              open={open.value}
              value={sex.value as ValueType}
              items={items.value}
              setOpen={open.setValue}
              setValue={sex.setValue}
              setItems={items.setValue}
              placeholder={'Select your sex'}
              style={styles.txtInput}
              placeholderStyle={{
                color: '#A5ABB9',
              }}
              listItemContainerStyle={{
                backgroundColor: '#F2F2F4',
              }}
              dropDownContainerStyle={{
                backgroundColor: '#00000000',
                borderColor: '#00000000',
                borderBottomLeftRadius: WidthSize(16),
                borderBottomRightRadius: WidthSize(16),
                position: 'absolute',
              }}
            />
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: HeightSize(40),
            alignSelf: 'center',
            width: '100%',
            paddingHorizontal: WidthSize(32),
          }}>
          <PrimaryButton
            title={'Save changes'}
            handlePress={() => {
              onSave();
              navigation.goBack();
            }}
          />
        </View>
      </View>
    </ContainerImage>
  );
};

export default EditProfile;

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
