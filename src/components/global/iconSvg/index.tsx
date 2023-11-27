import React from 'react';
import {HeightSize} from '~/theme/size';
import {Pressable, View} from 'react-native';

import IconCloseBrown from '~/assets/icons/ic_close_brown.svg';
import IconSearchBrown from '~/assets/icons/ic_search_brown.svg';
import IconCheckedWhite from '~/assets/icons/ic_checked_white.svg';
import IconBagBlack from '~/assets/icons/ic_bag_black.svg';
import IconHeartGray from '~/assets/icons/ic_heart_gray.svg';
import IconHeartRed from '~/assets/icons/ic_heart_red.svg';
import IconCategory from '~/assets/icons/ic_category.svg';
import IconCategoryFocused from '~/assets/icons/ic_category_focused.svg';
import IconHome from '~/assets/icons/ic_home.svg';
import IconHomeFocused from '~/assets/icons/ic_home_focused.svg';
import IconProfile from '~/assets/icons/ic_profile.svg';
import IconProfileFocused from '~/assets/icons/ic_profile_focused.svg';
import IconRoomIdea from '~/assets/icons/ic_roomidea.svg';
import IconRoomIdeaFocused from '~/assets/icons/ic_roomidea_focused.svg';
import IconFavoriteFocused from '~/assets/icons/ic_favorite_focused.svg';
import IconArrowRightBlack from '~/assets/icons/ic_arrow_right_black.svg';
import IconEyeShow from '~/assets/icons/ic_eye_show.svg';
import IconEyeHide from '~/assets/icons/ic_eye_hide.svg';
import IconCheck from '~/assets/icons/ic_check.svg';
interface IconSvgProps {
  icon:
    | 'IconCloseBrown'
    | 'IconSearchBrown'
    | 'IconCheckedWhite'
    | 'IconBagBlack'
    | 'IconHeartGray'
    | 'IconHeartRed'
    | 'IconCategory'
    | 'IconHomeFocused'
    | 'IconProfile'
    | 'IconCategoryFocused'
    | 'IconHome'
    | 'IconProfileFocused'
    | 'IconRoomIdea'
    | 'IconRoomIdeaFocused'
    | 'IconFavoriteFocused'
    | 'IconArrowRightBlack'
    | 'IconCheck'
    | 'IconEyeShow'
    | 'IconEyeHide';

  width?: number;
  height?: number;
  onPress?: () => void;
}

export type IconSvgType = IconSvgProps['icon'];

const svgComponents: Record<string, React.ComponentType> = {
  IconCloseBrown,
  IconSearchBrown,
  IconCheckedWhite,
  IconBagBlack,
  IconHeartGray,
  IconHeartRed,
  IconCategory,
  IconHomeFocused,
  IconProfile,
  IconCategoryFocused,
  IconHome,
  IconProfileFocused,
  IconRoomIdea,
  IconRoomIdeaFocused,
  IconFavoriteFocused,
  IconArrowRightBlack,
  IconCheck,
  IconEyeShow,
  IconEyeHide,
};

interface Svg {
  icon: string;
  width: number;
  height: number;
}

const SvgComponent: React.FC<Svg> = ({icon, width, height}) => {
  const Component: any = svgComponents[icon] || svgComponents.arrownUp;
  return <Component width={width} height={height} />;
};

export const IconSvg: React.FC<IconSvgProps> = ({
  icon,
  width = HeightSize(24),
  height = HeightSize(24),
  onPress,
}) => {
  const iconComponent = (
    <SvgComponent width={width} height={height} icon={icon} />
  );

  return onPress ? (
    <Pressable onPress={onPress}>{iconComponent}</Pressable>
  ) : (
    <View style={{width, height}}>{iconComponent}</View>
  );
};
