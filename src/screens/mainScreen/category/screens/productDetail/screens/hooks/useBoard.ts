import {useEffect, useState} from 'react';
import {ActionSheetIOS} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as ImagePicker from 'react-native-image-picker';
import {AppDispatch} from '~/app/store';
import {uploadProfileImage} from '~/redux/actions/userInfoAction';
import {
  selectLoadingProfileImageState,
  selectUserInfo,
} from '~/redux/reducers/userInfo';
import {AddPopupMessage} from '~/redux/reducers/popupMessageSlice';

export const useBoard = () => {
  const [image, setImage] = useState<ImagePicker.Asset>();
  const onPressCamera = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Camera', 'Photos'],
        cancelButtonIndex: 0,
        userInterfaceStyle: 'light',
        title: 'Edit Profile Picture',
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          console.log('Launch camera');
          launchCamera();
        } else if (buttonIndex === 2) {
          launchImageLibrary();
        }
      },
    );
  };

  const dispatch = useDispatch<AppDispatch>();
  const onSetImage = async (img: ImagePicker.Asset) => {
    if (img !== undefined) {
      setImage(img);
    }
  };
  const launchCamera = () => {
    let options: ImagePicker.CameraOptions = {
      mediaType: 'photo',
    };
    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      }
      // else if (response) {
      //   console.log('User tapped custom button: ', response.customButton);
      //   alert(response.customButton);
      // }
      else {
        console.log('response', JSON.stringify(response));

        if (response.assets) {
          onSetImage(response.assets[0]);
        }
        //setFlag(!flag);
      }
    });
  };

  const launchImageLibrary = () => {
    let options: ImagePicker.ImageLibraryOptions = {
      selectionLimit: 1,
      mediaType: 'photo',
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      }
      // else if (response.customButton) {
      //   console.log('User tapped custom button: ', response.customButton);
      //   alert(response.customButton);
      // }
      else {
        console.log('response', JSON.stringify(response));

        if (response.assets) {
          onSetImage(response.assets[0]);
        }
      }
    });
  };
  return {
    onPressCamera,
    image,
  };
};
