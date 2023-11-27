import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ContainerImage from '~/components/global/containerImage';
import {images} from '~/assets';
import {IconSvg} from '~/components/global/iconSvg';
import {HeightSize, WidthSize, height} from '~/theme/size';
import {ProgressBar} from 'react-native-paper';
import {TextFont} from '~/theme/textStyle';
import {TextStyle} from './../../../theme/textStyle';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Card} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {SetIsAuthorized} from '~/redux/reducers/authSlice';
const Survey = () => {
  const data = [
    {
      id: 1,
      img: 'https://maybinhphuoc.com/wp-content/uploads/2022/01/72ea7f020075c3bd13cc75840a70423b.jpg',
    },
    {
      id: 2,
      img: 'https://www.binhthuan.city/wp-content/uploads/2021/09/cac-style-thoi-trang-nu-5.jpg',
    },
    {
      id: 3,
      img: 'https://file.hstatic.net/1000272479/file/pasted_image_0_21_9970cdd7df894622bf9e706812e19696_grande.png',
    },
    {
      id: 4,
      img: 'https://lh3.googleusercontent.com/u/0/docs/ADP-6oEKqDw-daIOWVyoltLbSc_h9InvHK--zipaHpfMyUJLSqruwekRPeJpYqJSLyNd-V8lSn8Z0CaFmY8jmYwJXnRjpgMGgYbVJU_YgQ6-BSZr3jpu1njmTqCH1xxtk4TgN4RA8BUNj2N_SV2COvYOB9YCeMoiTeXdZ3aAjew08iJm4UtF_XJqGkO77w1g4IY045Gm4mzyjVuTUr9MAq5ngJhCWdJcb_P298kGtdjEX369DKs_K6KmwumQF6ewYloK0mMP5WbbMH0JGZKjFxb4XrpBvipKyEeJnTUmhjMpCke9jxp0jGscHodlsvH_hJnvkPMaX7fdHcCa3uRh4XSsOdeSd17_hcc70JMxVQQJAXtA3DgBq_y1p1-wzw8i_QVvOrkYALTejSzLWg1ORnp_azf-7fsEq31FIvVken0lvb4lsy6eZmaJcstzbjyT44F9hsukFw1mbOGf92kRtvDYDkYZ3XO_abpYwaBhWQ8HBJFIjxe2Zc1jATacP_vEGqPCisuCT-kfOq3ciHsObXlZeP6TzgwaqzwwlldYbI2l16clMSwIAP5T1_6b2Zo3azRenfBaijeVkfuFz_UCgKhgVaHdNBsVdkOovMoe0VefWrK-ALqdwpfnBRd0YlhQgV1uyCjZIB8ojak19jnQNa05iNScL79EoXcWDjQ5LXetVbhZLoZ3wFwijpYeNcN29uNEkcI8ty_WVMQ_cf0WGAi37HvphiXvpQ5Vjn8XZe7l6DGZ_Ucq6EAPzuFrdaND6cZa6Fx8W7TBN4aH0uo2d6QyiJbH3vz_biP6xHYRkKjqZkAD8NjcoWinBp0IPL8JoAXNSC065uYIgQ1iprHMNeYgPlq_yBwXL6bF-QOzfNfwybqmaj_sayCqvMntMJ9HLJsDl6W8QnzhATR2KlE2RixDuSI',
    },
    {
      id: 5,
      img: 'https://dongphuchaianh.vn/wp-content/uploads/2022/01/cach-phoi-do-dep-cho-nu-15-tuoi-dep.jpg',
    },
    {
      id: 6,
      img: 'https://bizweb.dktcdn.net/100/438/408/files/cac-loai-quan-tay-nu-yody-vn6.jpg?v=1673340408897',
    },
    {
      id: 7,
      img: 'https://cdn.kkfashion.vn/22497-home_default/ao-so-mi-nu-cong-so-co-phoi-no-tay-dai-asm13-10.jpg',
    },
    {
      id: 8,
      img: 'https://cdn.kkfashion.vn/18498-home_default/ao-so-mi-den-cong-so-co-phoi-no-asm11-09.jpg',
    },
  ];

  const [checked, setChecked] = useState<Array<Number>>([]);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <ContainerImage
      style={{flex: 1}}
      source={images.survey.BackGroundSurvey}
      resizeMode="cover">
      <View
        style={{
          flex: 1,
          paddingHorizontal: WidthSize(20),
          marginTop: HeightSize(30),
        }}>
        <View
          style={{
            width: '100%',
            alignItems: 'flex-end',
          }}>
          <IconSvg
            icon="IconCloseBrown"
            width={HeightSize(20)}
            height={HeightSize(20)}
            onPress={() => {
              dispatch(SetIsAuthorized(true));
            }}
          />
        </View>
        <ProgressBar
          progress={checked.length / 3}
          style={{
            height: HeightSize(10),
            borderRadius: 10,
            backgroundColor: '#EEECE5',
            marginTop: HeightSize(40),
          }}
          color="#836E44"
        />
        <View
          style={{
            marginTop: HeightSize(45),
            width: '100%',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Image
            source={images.survey.LineLeft}
            style={{
              position: 'absolute',
              left: -WidthSize(20),
              top: -HeightSize(20),
            }}
          />
          <Image
            source={images.survey.LineRight}
            style={{
              position: 'absolute',
              right: -WidthSize(20),
              top: -HeightSize(20),
            }}
          />
          <Text
            style={{
              ...TextFont.GRegular,
              ...TextStyle.text4XL,
              color: '#3B3021',
            }}>
            Styles
          </Text>
          <Text
            style={{
              ...TextFont.GRegular,
              ...TextStyle.XS,
              color: '#3B3021',
              marginTop: HeightSize(16),
            }}>
            Tap three of your favorite styles
          </Text>
        </View>

        <FlatList
          data={data}
          numColumns={2}
          style={{
            marginTop: HeightSize(30),
            marginBottom: HeightSize(120),
          }}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          renderItem={({item}) => (
            <Pressable
              onPress={() => {
                if (checked.includes(item.id)) {
                  setChecked(checked.filter(id => id !== item.id));
                } else if (checked.length >= 3) {
                  setChecked(checked.slice(1, 3).concat(item.id));
                } else {
                  setChecked(checked.concat(item.id));
                }
              }}
              style={{
                width: WidthSize(180),
                height: HeightSize(220),
                borderRadius: 16,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: WidthSize(5),
                marginVertical: HeightSize(5),
              }}>
              <Card.Cover
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 16,
                }}
                source={{uri: item.img}}
              />
              {checked.includes(item.id) && (
                <View
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#E6836E44',
                    borderRadius: 16,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <IconSvg
                    icon="IconCheckedWhite"
                    width={WidthSize(32)}
                    height={WidthSize(32)}
                  />
                  <Text
                    style={{
                      marginTop: HeightSize(20),
                      color: 'white',
                      ...TextFont.SMedium,
                      ...TextStyle.Base,
                    }}>
                    Picked
                  </Text>
                </View>
              )}
            </Pressable>
          )}
        />
      </View>
      <View
        style={{
          width: '100%',
          height: HeightSize(120),
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 0,
          justifyContent: 'center',
          paddingHorizontal: WidthSize(20),
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            dispatch(SetIsAuthorized(true));
          }}
          disabled={checked.length < 3}
          style={{
            width: '100%',
            height: HeightSize(70),
            backgroundColor: checked.length < 3 ? '#2D2516' : '#836E44',
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              ...TextStyle.LG,
              ...TextFont.SBold,
              color: 'white',
            }}>
            Keep going!
          </Text>
        </TouchableOpacity>
      </View>
    </ContainerImage>
  );
};

export default Survey;
