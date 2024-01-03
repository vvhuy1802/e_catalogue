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

export const useImagePicker = () => {
  const userInfo = useSelector(selectUserInfo);
  const onPressCamera = () => {
    console.log('useInfo: ', JSON.stringify(userInfo, null, 2));
    const isEmpty = Object.values(userInfo).every(x => x === null || x === '');
    if (!isEmpty) {
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
    } else {
      dispatch(
        AddPopupMessage({
          title: 'Warning!',
          type: 'warning',
          message: 'User must set profile before using this feature',
          size: 'small',
          time: 'long',
        }),
      );
    }
  };

  const dispatch = useDispatch<AppDispatch>();
  const image = useSelector(selectUserInfo).profile_image;
  const loadingSetProfileImage = useSelector(selectLoadingProfileImageState);
  const onSetImage = async (img: ImagePicker.Asset) => {
    if (img !== undefined) {
      await dispatch(
        uploadProfileImage({
          uri: img.uri || '',
          type: img.type || '',
          fileName: img.fileName || '',
        }),
      );
      dispatch(
        AddPopupMessage({
          title: 'Success',
          type: 'success',
          message: 'Upload profile successfully!',
          size: 'small',
          time: 'long',
        }),
      );
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
    loadingSetProfileImage,
  };
};
