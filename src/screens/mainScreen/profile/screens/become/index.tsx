import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import {images} from '~/assets';
import ContainerImage from '~/components/global/containerImage';
import HeaderProduct from '~/components/global/headerProduct';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamList, ProfileStackParamList} from '~/types';
import {HeightSize} from '~/theme/size';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';

const Become = () => {
  const navigation =
    useNavigation<StackNavigationProp<ProfileStackParamList>>();
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [logo, setLogo] = React.useState('');

  const openImagePicker = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      selectionLimit: 0,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode == 'camera_unavailable') {
        console.log('Camera not available on device');
      } else if (response.errorCode == 'permission') {
        console.log('Permission not satisfied');
      } else if (response.errorCode == 'others') {
        console.log(response.errorMessage);
      } else if (response.assets) {
        response.assets.map(item => {
          setListImageMore(listImageMore => [...listImageMore, item]);
        });
      } else {
        console.log('error');
      }
    });
  };
  return (
    <ContainerImage
      // isOpacity={true}
      style={{flex: 1}}
      resizeMode="cover"
      source={images.home.BackgroundHome}>
      <HeaderProduct
        isShowBottomBarWhenBack={true}
        title="Become a seller"
        onPressBack={() => {
          navigation.goBack();
        }}
        showBag={false}
      />
      <Pressable
        onPress={() => {
          Keyboard.dismiss();
        }}
        style={{
          paddingHorizontal: HeightSize(16),
          flex: 1,
        }}>
        <View
          style={{
            marginTop: HeightSize(16),
          }}>
          <Text>Name</Text>
          <TextInput
            style={{
              marginTop: HeightSize(8),
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: HeightSize(8),
              paddingHorizontal: HeightSize(8),
              paddingVertical: HeightSize(16),
            }}
            placeholder="Enter your name"
          />
        </View>
        <View
          style={{
            marginTop: HeightSize(16),
          }}>
          <Text>Description</Text>
          <TextInput
            style={{
              marginTop: HeightSize(8),
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: HeightSize(8),
              paddingHorizontal: HeightSize(8),
              paddingVertical: HeightSize(16),
              height: HeightSize(128),
            }}
            placeholder="Enter your description"
          />
        </View>
        <View
          style={{
            marginTop: HeightSize(16),
          }}>
          <Text>Logo</Text>
        </View>
      </Pressable>
    </ContainerImage>
  );
};

export default Become;

const styles = StyleSheet.create({});
