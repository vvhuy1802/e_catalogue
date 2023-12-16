import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import navigation from '~/navigation';
import {SetDirectionBottomBar} from '~/redux/reducers/globalSlice';
import {HeightSize, WidthSize} from '~/theme/size';
import {TextStyle, TextFont} from '~/theme/textStyle';
import {IconSvg, IconSvgType} from '../iconSvg';

type Props = {
  onPressBack: () => void;
  onPressRightIcon?: () => void;
  title?: string;
  showBag?: boolean;
  typeRightIcon?: IconSvgType;
  children?: React.ReactNode;
};
const HeaderProduct = ({
  onPressBack,
  onPressRightIcon,
  title,
  showBag = true,
  typeRightIcon = 'IconBagBlack',
  children,
}: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: HeightSize(10),
      }}>
      <Pressable
        onPress={onPressBack}
        style={{
          width: HeightSize(80),
          height: HeightSize(50),
          borderTopRightRadius: 36,
          borderBottomRightRadius: 36,
          backgroundColor: '#EFEFE8',
          marginTop: HeightSize(3),
          justifyContent: 'center',
          paddingLeft: HeightSize(20),
          zIndex: 99,
        }}>
        <IconSvg
          icon="IconArrowLeftBlack"
          width={HeightSize(32)}
          height={HeightSize(32)}
        />
      </Pressable>
      {title !== '' ? (
        <View
          style={{
            position: 'absolute',
            height: HeightSize(50),
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              ...TextStyle.text4XL,
              ...TextFont.GRegular,
              color: '#3B3021',
              marginTop: HeightSize(10),
            }}>
            {title}
          </Text>
        </View>
      ) : (
        <View
          style={{
            position: 'absolute',
            height: HeightSize(50),
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {children}
        </View>
      )}

      <View
        style={{
          display: showBag ? 'flex' : 'none',
          width: WidthSize(24),
          height: WidthSize(28),
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginRight: WidthSize(20),
          zIndex: 99,
        }}>
        <IconSvg onPress={onPressRightIcon} icon={typeRightIcon} />
        {typeRightIcon === 'IconBagBlack' && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              right: -HeightSize(5),
              width: HeightSize(20),
              height: HeightSize(20),
              borderRadius: 10,
              backgroundColor: 'white',
              padding: HeightSize(2),
            }}>
            <View
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#433229',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: 'white',
                  ...TextStyle.SuperXS,
                  ...TextFont.SLight,
                  textAlign: 'center',
                }}>
                2
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default HeaderProduct;

const styles = StyleSheet.create({});
