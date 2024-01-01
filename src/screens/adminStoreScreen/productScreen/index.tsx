import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {images} from '~/assets';
import ContainerImage from '~/components/global/containerImage';
import HeaderAdmin from '~/components/global/headerAdmin';
import {WidthSize, HeightSize} from '~/theme/size';
import {TextStyle, TextFont} from '~/theme/textStyle';
import * as ImagePicker from 'react-native-image-picker';

const ProductScreen = () => {
  const [isAdding, setAdding] = useState(false);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<number>();
  const [image, setImage] = useState<ImagePicker.Asset>();
  return (
    <ContainerImage
      // isOpacity={true}
      style={{flex: 1}}
      resizeMode="cover"
      source={images.home.BackgroundHome}>
      <HeaderAdmin title="Product" />

      {isAdding ? (
        <View>
          <View
            style={{
              marginHorizontal: WidthSize(16),
              marginBottom: HeightSize(32),
            }}>
            <Text style={styles.title}>Name</Text>
            <TextInput
              style={styles.txtInput}
              placeholderTextColor={'#A5ABB9'}
              placeholder="Enter product name"
              value={name}
              onChangeText={text => setName(text)}
            />
          </View>
          <View
            style={{
              marginHorizontal: WidthSize(16),
              marginBottom: HeightSize(32),
            }}>
            <Text style={styles.title}>Description</Text>
            <TextInput
              style={styles.txtInput}
              placeholderTextColor={'#A5ABB9'}
              placeholder="Enter product description"
              value={description}
              onChangeText={text => setDescription(text)}
            />
          </View>
        </View>
      ) : null}
      <Pressable
        onPress={() => {
          setAdding(!isAdding);
        }}
        style={{
          alignSelf: 'center',
          marginTop: 100,
        }}>
        <Text
          style={{
            color: '#836E44',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          {!isAdding ? 'Add new Product' : 'Back'}
        </Text>
      </Pressable>
    </ContainerImage>
  );
};

export default ProductScreen;
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
