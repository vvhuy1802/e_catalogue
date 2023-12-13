import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import {HeightSize, WidthSize} from '~/theme/size';
import {TextFont, TextStyle} from '~/theme/textStyle';
import {images} from '~/assets';
import {IconSvg} from '~/components/global/iconSvg';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProductDetailStackParamList} from '~/types';

const Review = () => {
  const [isShowCommentModal, setIsShowCommentModal] = React.useState(false);
  const data = [
    {
      id: 1,
      avatar: images.home.CategoryMen,
      name: 'Julves Tan',
      star: 5,
      comment: 'Absolute LOVE this shirt. Perfect color and awesome',
      time: 'March 01 06:23',
    },
    {
      id: 2,
      avatar: images.home.CategoryMen,
      name: 'Julves Tan',
      star: 5,
      comment: 'Absolute LOVE this shirt. Perfect color and awesome',
      time: 'March 01 06:23',
    },
    {
      id: 3,
      avatar: images.home.CategoryMen,
      name: 'Julves Tan',
      star: 5,
      comment: 'Absolute LOVE this shirt. Perfect color and awesome',
      time: 'March 01 06:23',
    },
    {
      id: 4,
      avatar: images.home.CategoryMen,
      name: 'Julves Tan',
      star: 5,
      comment: 'Absolute LOVE this shirt. Perfect color and awesome',
      time: 'March 01 06:23',
    },
    {
      id: 5,
      avatar: images.home.CategoryMen,
      name: 'Julves Tan',
      star: 5,
      comment: 'Absolute LOVE this shirt. Perfect color and awesome',
      time: 'March 01 06:23',
    },
    {
      id: 6,
      avatar: images.home.CategoryMen,
      name: 'Julves Tan',
      star: 5,
      comment: 'Absolute LOVE this shirt. Perfect color and awesome',
      time: 'March 01 06:23',
    },
  ];

  const navigation =
    useNavigation<StackNavigationProp<ProductDetailStackParamList>>();

  const [star, setStar] = React.useState(0);

  const renderStar = () => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <IconSvg
          onPress={() => {
            setStar(i + 1);
          }}
          key={i}
          icon={i < star ? 'IconStarBrown' : 'IconStarBrownOutline'}
        />,
      );
    }
    return stars;
  };

  return (
    <View
      style={{
        marginTop: HeightSize(32),
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            ...TextFont.GRegular,
            ...TextStyle.text3_5XL,
            color: '#3B3021',
          }}>
          Reviews
        </Text>
        <Text
          suppressHighlighting={true}
          onPress={() => {
            navigation.navigate('ReviewDetail');
          }}
          style={{
            ...TextFont.SBold,
            color: '#3B3021',
          }}>
          See all
        </Text>
      </View>

      <View
        style={{
          marginTop: HeightSize(20),
          gap: HeightSize(12),
        }}>
        {data.map((item, index) => {
          return (
            index < 3 && (
              <View
                key={index}
                style={{
                  padding: HeightSize(16),
                  backgroundColor: '#EFEFE8',
                  borderRadius: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Image
                    style={{
                      width: HeightSize(48),
                      height: HeightSize(48),
                      borderRadius: 16,
                    }}
                    source={item.avatar}
                  />
                  <View
                    style={{
                      marginLeft: WidthSize(20),
                      flex: 1,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          ...TextFont.SMedium,
                          color: '#3B3021',
                        }}>
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          ...TextFont.SLight,
                          ...TextStyle.SM,
                          color: '#C3C3C3',
                        }}>
                        {item.time}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: WidthSize(4),
                        marginTop: HeightSize(2),
                      }}>
                      <IconSvg
                        icon="IconStarBrown"
                        width={HeightSize(8)}
                        height={HeightSize(8)}
                      />
                      <IconSvg
                        icon="IconStarBrown"
                        width={HeightSize(8)}
                        height={HeightSize(8)}
                      />
                      <IconSvg
                        icon="IconStarBrown"
                        width={HeightSize(8)}
                        height={HeightSize(8)}
                      />
                      <IconSvg
                        icon="IconStarBrown"
                        width={HeightSize(8)}
                        height={HeightSize(8)}
                      />
                      <IconSvg
                        icon="IconStarBrown"
                        width={HeightSize(8)}
                        height={HeightSize(8)}
                      />
                    </View>
                    <Text
                      style={{
                        marginTop: HeightSize(8),
                        ...TextFont.SLight,
                        ...TextStyle.SM,
                        color: '#3B3021',
                      }}>
                      {item.comment}
                    </Text>
                  </View>
                </View>
              </View>
            )
          );
        })}
        <Pressable
          onPress={() => {
            setIsShowCommentModal(true);
          }}
          style={{
            width: '100%',
            height: HeightSize(70),
            backgroundColor: '#EFEFE8',
            borderRadius: 20,
            marginTop: HeightSize(12),
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <IconSvg icon="IconPlusBrown" />
          <Text
            style={{
              marginLeft: WidthSize(20),
              ...TextFont.SRegular,
              color: '#3B3021',
            }}>
            Add your reviews
          </Text>
        </Pressable>
      </View>

      <Modal
        visible={isShowCommentModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => {
          setIsShowCommentModal(false);
        }}>
        <Pressable
          onPress={() => {
            setIsShowCommentModal(false);
          }}
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}>
          <Pressable
            style={{
              width: WidthSize(374),
              height: HeightSize(280),
              backgroundColor: '#EFEFE8',
              padding: HeightSize(24),
              borderRadius: 20,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  ...TextStyle.SM,
                  ...TextFont.SRegular,
                  color: '#836E44',
                }}>
                Cancel
              </Text>
              <Text
                style={{
                  ...TextStyle.XXL,
                  ...TextFont.GRegular,
                  color: '#836E44',
                }}>
                Write a Review
              </Text>
              <Text
                style={{
                  ...TextStyle.SM,
                  ...TextFont.SBold,
                  color: '#836E444D', //836E444D
                }}>
                Cancel
              </Text>
            </View>

            <View
              style={{
                marginTop: HeightSize(12),
                width: '100%',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: WidthSize(4),
                  marginTop: HeightSize(12),
                }}>
                {renderStar()}
              </View>
              <Text
                style={{
                  ...TextStyle.XXS,
                  ...TextFont.SRegular,
                  color: '#3B3021',
                  marginTop: HeightSize(8),
                }}>
                Tap a Star to Rate
              </Text>
            </View>

            <View style={{marginTop: HeightSize(20)}}>
              <TextInput
                style={{
                  width: '100%',
                  textAlignVertical: 'top',
                  ...TextFont.SRegular,
                  color: '#3B3021',
                }}
                multiline={true}
                placeholder="Review (Optional)"
                placeholderTextColor="#3B302180"
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({});
