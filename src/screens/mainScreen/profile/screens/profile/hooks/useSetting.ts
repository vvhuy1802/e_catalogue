import {StackNavigationProp} from '@react-navigation/stack';
import {ActionSheetIOS} from 'react-native';
import {EDIT_ACCOUNT, EDIT_PROFILE} from '~/constants/routeNames';
import {ProfileStackParamList} from '~/types';

type useSettingProps = {
  navigation: StackNavigationProp<ProfileStackParamList, 'Profile'>;
};

export const useSetting = ({navigation}: useSettingProps) => {
  const onPressSetting = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Edit Profile', 'Edit Account'],
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
        }
      },
    );

  return {
    onPressSetting,
  };
};
