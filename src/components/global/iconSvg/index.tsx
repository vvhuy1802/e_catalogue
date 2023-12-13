import React from 'react';
import {HeightSize} from '~/theme/size';
import {Pressable, StyleProp, View, ViewStyle} from 'react-native';

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
import IconDropDown from '~/assets/icons/ic_dropdown_black.svg';
import IconClock from '~/assets/icons/ic_clock_black.svg';
import IconArrowLeftBlack from '~/assets/icons/ic_arrow_left_black.svg';
import IconFilterBlack from '~/assets/icons/ic_filter_black.svg';
import IconCloseBlack from '~/assets/icons/ic_close_black.svg';
import IconArrowUpBlack from '~/assets/icons/ic_arrow_up_black.svg';
import IconArrowDownBlack from '~/assets/icons/ic_arrow_down_black.svg';
import IconUnCheckBlack from '~/assets/icons/ic_uncheck_black.svg';
import IconCheckedBlack from '~/assets/icons/ic_checked_black.svg';
import IconCloseBoldBrown from '~/assets/icons/ic_close_bold_brown.svg';
import IconStarYellow from '~/assets/icons/ic_star_yellow.svg';
import IconStarBrown from '~/assets/icons/ic_star_brown.svg';
import IconPlusBrown from '~/assets/icons/ic_plus_brown.svg';
import IconStarBrownOutline from '~/assets/icons/ic_star_brown_outline.svg';
import IconBagWhite from '~/assets/icons/ic_bag_white.svg';
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
    | 'IconEyeHide'
    | 'IconDropDown'
    | 'IconClock'
    | 'IconArrowLeftBlack'
    | 'IconFilterBlack'
    | 'IconCloseBlack'
    | 'IconArrowUpBlack'
    | 'IconArrowDownBlack'
    | 'IconUnCheckBlack'
    | 'IconCheckedBlack'
    | 'IconCloseBoldBrown'
    | 'IconStarYellow'
    | 'IconStarBrown'
    | 'IconPlusBrown'
    | 'IconStarBrownOutline'
    | 'IconBagWhite';

  width?: number;
  height?: number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
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
  IconDropDown,
  IconClock,
  IconArrowLeftBlack,
  IconFilterBlack,
  IconCloseBlack,
  IconArrowUpBlack,
  IconArrowDownBlack,
  IconUnCheckBlack,
  IconCheckedBlack,
  IconCloseBoldBrown,
  IconStarYellow,
  IconStarBrown,
  IconPlusBrown,
  IconStarBrownOutline,
  IconBagWhite,
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
  style,
}) => {
  const iconComponent = (
    <SvgComponent width={width} height={height} icon={icon} />
  );

  return onPress ? (
    <Pressable style={[{width, height}, style]} onPress={onPress}>
      {iconComponent}
    </Pressable>
  ) : (
    <View style={[{width, height}, style]}>{iconComponent}</View>
  );
};
