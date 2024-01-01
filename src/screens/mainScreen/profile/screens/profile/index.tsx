import {View, Text, StyleSheet, ActionSheetIOS, Pressable} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {animations, images} from '~/assets';
import Cart from '~/components/global/cart';
import ContainerImage from '~/components/global/containerImage';
import CustomScrollView from '~/components/global/customScrollView';
import {HeightSize, WidthSize, width} from '~/theme/size';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {SetDirectionBottomBar} from '~/redux/reducers/globalSlice';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamList, ProfileStackParamList} from '~/types';
import {ADDRESS_BOOK, ORDERSTACK} from '~/constants/routeNames';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import HeaderSearch from '~/components/global/headerSearch';
import {IconSvg} from '~/components/global/iconSvg';
import {TextStyle, TextFont} from '~/theme/textStyle';
import * as ImagePicker from 'react-native-image-picker';
import {useCart} from './hooks/useCart';
import {useImagePicker} from './hooks/useImagePicker';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';
import {URL_GET_FILE} from '~/constants/global';
import {SetIsAuthorized, SetUserInforLogin} from '~/redux/reducers/authSlice';
import {AppProvider} from '~/app/appProvider';
import {useSetting} from './hooks/useSetting';
import {getAllUserContact} from '~/redux/actions/contact';
import {getAllOrder, getOrderUser} from '~/redux/actions/orderAction';
import {selectUserInfo} from '~/redux/reducers/userInfo';

type ProfileProps = {
  navigation: StackNavigationProp<ProfileStackParamList, 'Profile'>;
};

const Profile: React.FC<ProfileProps> = ({navigation}) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      dispatch(SetDirectionBottomBar('up'));
    }
  }, [isFocused]);
  const {handlePressCart} = useCart();
  const dispatch = useDispatch<AppDispatch>();

  const {onPressCamera, image, loadingSetProfileImage} = useImagePicker();
  const {onPressSetting} = useSetting({navigation});
  const userInfo = useSelector(selectUserInfo);
  const handleLogout = () => {
    dispatch(
      SetUserInforLogin({
        id: 0,
        username: '',
        role: '',
        email: '',
      }),
    );
    dispatch(SetIsAuthorized(''));
    AppProvider.setTokenUser('', '');
    AppProvider.setAccountInfo(null as any);
  };

  const renderAvatar = () => {
    if (loadingSetProfileImage === 'pending') {
      return (
        <View style={styles.containerAvatar}>
          <LottieView
            source={animations.CircleLoading}
            autoPlay
            loop={true}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
      );
    }
    if (image !== undefined && image !== null) {
      return (
        <FastImage
          source={{uri: `${URL_GET_FILE}${image}`}}
          resizeMode="cover"
          style={{
            width: WidthSize(128),
            height: WidthSize(128),
            borderRadius: WidthSize(999),
          }}
        />
      );
    } else {
      return (
        <View style={styles.containerAvatar}>
          <IconSvg
            icon={'IconUser'}
            width={WidthSize(64)}
            height={WidthSize(64)}
          />
        </View>
      );
    }
  };

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
        <View
          style={{
            marginTop: HeightSize(10),
          }}>
          <Cart onCartPress={handlePressCart} haveDropDownList={false} />
          <HeaderSearch title={'Profile'} haveSearchButton={false} />

          <View style={styles.containerAvatarPart}>
            <View style={styles.containerIcon}>
              <IconSvg icon={'IconCamera'} onPress={onPressCamera} />
            </View>
            <View style={styles.borderAvatar}>{renderAvatar()}</View>
            <View style={styles.containerIcon}>
              <IconSvg icon={'IconSetting'} onPress={onPressSetting} />
            </View>
          </View>

          <Text style={styles.accountName}>{userInfo.fullname || ''}</Text>

          <Pressable
            onPress={() => {
              dispatch(getOrderUser());
              dispatch(SetDirectionBottomBar('down'));
              navigation.navigate('MyPurchases');
            }}
            style={styles.containerOption}>
            <IconSvg icon={'IconCube'} style={styles.iconOption} />
            <Text style={styles.textOption}>My purchases</Text>
          </Pressable>

          <Pressable
            onPress={() => {
              navigation.navigate(ADDRESS_BOOK);
              dispatch(getAllUserContact());
            }}
            style={styles.containerOption}>
            <IconSvg icon={'IconMarker'} style={styles.iconOption} />
            <Text style={styles.textOption}>Address book</Text>
          </Pressable>

          {/* <View style={styles.containerOption}>
            <IconSvg icon={'IconCreditCard'} style={styles.iconOption} />
            <Text style={styles.textOption}>My wallet</Text>
          </View> */}

          <View style={styles.containerSignOutPart}>
            <Pressable
              onPress={() => {
                handleLogout();
              }}
              style={styles.containerIconSignOut}>
              <IconSvg
                icon={'IconSignOut'}
                width={WidthSize(20)}
                height={HeightSize(20)}
              />
            </Pressable>
            <Text style={styles.textOption}>Sign out</Text>
          </View>
        </View>
      </View>
    </ContainerImage>
  );
};

export default Profile;

const styles = StyleSheet.create({
  containerIcon: {
    width: WidthSize(44),
    height: HeightSize(44),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFEFE8',
    borderRadius: WidthSize(12),
  },
  containerAvatarPart: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: HeightSize(24),
    marginBottom: HeightSize(32),
    width: width,
    paddingHorizontal: WidthSize(32),
  },
  borderAvatar: {
    width: WidthSize(144),
    height: WidthSize(144),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: WidthSize(999),
    backgroundColor: '#00000000',
    borderWidth: WidthSize(4),
    borderColor: '#836E44',
  },
  containerAvatar: {
    width: WidthSize(128),
    height: WidthSize(128),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: WidthSize(999),
    backgroundColor: '#EFEFE8',
  },
  accountName: {
    ...TextStyle.XXL,
    ...TextFont.SBold,
    color: '#3B3021',
    alignSelf: 'center',
    marginBottom: HeightSize(40),
  },
  containerOption: {
    height: HeightSize(70),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFE8',
    marginHorizontal: WidthSize(32),
    marginBottom: HeightSize(20),
    paddingHorizontal: WidthSize(28),
    borderRadius: WidthSize(16),
  },
  iconOption: {marginEnd: WidthSize(36)},
  textOption: {
    ...TextStyle.Base,
    ...TextFont.SMedium,
    color: '#3B3021',
  },
  containerSignOutPart: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: WidthSize(32),
  },
  containerIconSignOut: {
    width: WidthSize(52),
    height: HeightSize(52),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#836E44',
    borderRadius: WidthSize(16),
    marginEnd: WidthSize(24),
  },
});
