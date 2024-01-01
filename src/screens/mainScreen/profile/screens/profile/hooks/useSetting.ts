import {StackNavigationProp} from '@react-navigation/stack';
import {ActionSheetIOS} from 'react-native';
import {useDispatch} from 'react-redux';
import {EDIT_ACCOUNT, EDIT_PROFILE} from '~/constants/routeNames';
import {SetDirectionBottomBar} from '~/redux/reducers/globalSlice';
import {ProfileStackParamList} from '~/types';

type useSettingProps = {
  navigation: StackNavigationProp<ProfileStackParamList, 'Profile'>;
};

export const useSetting = ({navigation}: useSettingProps) => {
  const dispatch = useDispatch();
  const onPressSetting = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Edit Profile', 'Edit Account', 'Become a Seller'],
        cancelButtonIndex: 0,
        userInterfaceStyle: 'light',
        title: 'Setting',
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          console.log('Edit Profile');
          navigation.navigate(EDIT_PROFILE);
        } else if (buttonIndex === 2) {
          console.log('Edit Account');
          navigation.navigate(EDIT_ACCOUNT);
        } else if (buttonIndex === 3) {
          console.log('Become a Seller');
          dispatch(SetDirectionBottomBar('down'));
          navigation.navigate('BecomeSeller');
        }
      },
    );

  return {
    onPressSetting,
  };
};
