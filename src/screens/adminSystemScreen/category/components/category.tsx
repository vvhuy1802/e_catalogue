import {
  Image,
  Keyboard,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import {HeightSize, WidthSize, width} from '~/theme/size';
import {TextStyle, TextFont} from '~/theme/textStyle';
import {getUrl} from '~/utils';
import {CategoryRequest, RootCategory} from '~/types/category';
import {IconSvg} from '~/components/global/iconSvg';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import navigation from '~/navigation';
import FullWidthImage from '~/components/global/fullWidthImage';
import PrimaryButton from '~/components/global/primaryButton';
import {categoryService} from '~/services/service/category.service';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {updateCategory} from '~/redux/actions/categoryAction';

type Props = {
  category: RootCategory;
  height?: number;
  marginLeft?: number;
  level?: number;
  parentId?: number;
};
const CategoryItem = ({
  category,
  height = HeightSize(110),
  marginLeft = 0,
  level = 0,
  parentId,
}: Props) => {
  const [isShowItem, setIsShowItem] = React.useState(false);
  const [isShowModal, setIsShowModal] = React.useState(false);

  const [name, setName] = React.useState(category.name);
  const [description, setDescription] = React.useState(category.description);
  const [image, setImage] = React.useState(category.image);

  const openImagePicker = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
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
        console.log(response.assets[0].uri);
        setImage(response);
      } else {
        console.log('error');
      }
    });
  };
  //   images.forEach(image => {
  //     pros.push(ProtectedUploadImage("personal/post/new/image", image, token));
  // });
  // console.log("Uploading post images");
  // const imageResponses = await Promise.all(pros);
  // console.log("Image responses: " + JSON.stringify(imageResponses));
  const dispatch = useDispatch<AppDispatch>();
  return (
    <View>
      <Pressable
        onPress={() => setIsShowModal(!isShowModal)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          overflow: 'hidden',
          height: level < 2 ? height : HeightSize(60),
          backgroundColor: '#F0EFE9',
          borderRadius: 20,
          marginLeft: marginLeft * level,
        }}>
        <View
          style={{
            width: WidthSize(110),
            height: '100%',
            alignSelf: 'flex-end',
            position: 'absolute',
            right: 0,
            bottom: 0,
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          {level < 2 ? (
            category.image ? (
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  height: '100%',
                }}>
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  resizeMode="contain"
                  source={getUrl(category.image)}
                />
              </View>
            ) : null
          ) : null}
        </View>
        <View
          style={{
            position: 'absolute',
            left: HeightSize(32),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {level < 2 ? (
            <Pressable
              onPress={() => setIsShowItem(!isShowItem)}
              style={{
                width: HeightSize(32),
                height: '100%',
                justifyContent: 'center',
              }}>
              <IconSvg
                onPress={() => setIsShowItem(!isShowItem)}
                style={{}}
                width={HeightSize(16)}
                height={HeightSize(16)}
                icon={isShowItem ? 'IconArrowDownBlack' : 'IconArrowRightBL'}
              />
            </Pressable>
          ) : null}
          <Text
            style={{
              color: '#3B3021',
              ...TextStyle.XL,
              ...TextFont.SBold,
            }}>
            {category.name}
          </Text>
        </View>
      </Pressable>
      <View
        style={{
          marginTop: HeightSize(10),
        }}>
        {isShowItem &&
          category.children.length > 0 &&
          category.children.map((item, index) => (
            <CategoryItem
              key={index}
              category={item}
              marginLeft={HeightSize(32)}
              level={level + 1}
              parentId={category.id}
            />
          ))}
      </View>
      <Modal
        visible={isShowModal}
        presentationStyle="formSheet"
        animationType="slide"
        onRequestClose={() => setIsShowModal(false)}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Pressable
            onPress={() => {
              Keyboard.dismiss();
            }}
            style={{
              flex: 1,
              backgroundColor: 'white',
              padding: HeightSize(32),
            }}>
            <Text
              style={{
                ...TextFont.GRegular,
                ...TextStyle.text4XL,
                color: '#3B3021',
                textAlign: 'center',
              }}>
              Update category
            </Text>
            <View
              style={{
                marginTop: HeightSize(32),
                flexDirection: 'row',
                gap: HeightSize(32),
              }}>
              <View
                style={{
                  flex: 1,
                }}>
                <Text
                  style={{
                    ...TextFont.SMedium,
                    ...TextStyle.Base,
                    color: '#3B3021',
                  }}>
                  Name
                </Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  style={{
                    ...TextFont.SRegular,
                    color: '#3B3021',
                    backgroundColor: '#F0EFE9',
                    borderRadius: 10,
                    paddingHorizontal: HeightSize(16),
                    paddingVertical: HeightSize(16),
                    marginTop: HeightSize(16),
                  }}
                />
              </View>
              {level < 2 ? (
                <View
                  style={{
                    flex: 1,
                  }}>
                  {image ? (
                    <FullWidthImage
                      widthNeed={width / 2 - HeightSize(48)}
                      style={{
                        marginBottom: HeightSize(16),
                      }}
                      imageStyle={{
                        borderRadius: 20,
                      }}
                      source={
                        image === category.image
                          ? getUrl(image)
                          : {uri: image.assets[0].uri}
                      }>
                      <View
                        style={{
                          position: 'absolute',
                          top: HeightSize(8),
                          right: HeightSize(8),
                          backgroundColor: 'red',
                          borderRadius: 100,
                          padding: HeightSize(4),
                        }}>
                        <IconSvg
                          onPress={() => setImage('')}
                          icon="IconCloseBoldWhite"
                          width={HeightSize(16)}
                          height={HeightSize(16)}
                        />
                      </View>
                    </FullWidthImage>
                  ) : (
                    <IconSvg
                      onPress={openImagePicker}
                      style={{
                        alignSelf: 'flex-end',
                      }}
                      icon="IconGalleryAddBrown"
                      width={WidthSize(30)}
                      height={WidthSize(30)}
                    />
                  )}
                </View>
              ) : null}
            </View>
            <View
              style={{
                marginTop: HeightSize(32),
              }}>
              <Text
                style={{
                  ...TextFont.SMedium,
                  ...TextStyle.Base,
                  color: '#3B3021',
                }}>
                Description
              </Text>
              <TextInput
                multiline
                lineBreakStrategyIOS="hangul-word"
                value={description}
                onChangeText={setDescription}
                style={{
                  ...TextFont.SRegular,
                  color: '#3B3021',
                  backgroundColor: '#F0EFE9',
                  borderRadius: 10,
                  padding: HeightSize(16),
                  marginTop: HeightSize(16),
                  height: HeightSize(200),
                }}
              />
            </View>
            <PrimaryButton
              style={{
                marginTop: HeightSize(32),
              }}
              handlePress={async () => {
                let param = {
                  name: name,
                  description: description,

                  image: image === category.image ? undefined : image,
                };
                if (level > 0) {
                  param = {
                    ...param,
                    parent: parentId,
                  };
                }
                dispatch(
                  updateCategory({
                    categoryId: category.id,
                    data: param,
                  }),
                );
                setIsShowModal(false);
              }}
              title="Update"
            />
          </Pressable>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({});
