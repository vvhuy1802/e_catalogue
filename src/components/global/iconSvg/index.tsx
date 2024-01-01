import React from 'react';
import {HeightSize} from '~/theme/size';
import {Animated, Pressable, StyleProp, ViewStyle} from 'react-native';

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
import IconCloseBoldWhite from '~/assets/icons/ic_close_bold_white.svg';
import IconStarYellow from '~/assets/icons/ic_star_yellow.svg';
import IconStarBrown from '~/assets/icons/ic_star_brown.svg';
import IconPlusBrown from '~/assets/icons/ic_plus_brown.svg';
import IconStarBrownOutline from '~/assets/icons/ic_star_brown_outline.svg';
import IconBagWhite from '~/assets/icons/ic_bag_white.svg';
import IconEditBrown from '~/assets/icons/ic_edit_brown.svg';
import IconMinusSmallBrown from '~/assets/icons/ic_minus_small_brown.svg';
import IconPlusSmallBrown from '~/assets/icons/ic_plus_small_brown.svg';
import IconTrashWhite from '~/assets/icons/ic_trash_white.svg';
import IconAngleRightBrown from '~/assets/icons/ic_angle_right_brown.svg';
import IconCheckBoxCheckedWhite from '~/assets/icons/ic_checkbox_checked_white.svg';
import IconCheckBoxUnCheckWhite from '~/assets/icons/ic_checkbox_uncheck_white.svg';
import IconCheckLightBrown from '~/assets/icons/ic_check_light_brown.svg';
import IconLocationBrown from '~/assets/icons/ic_location_brown.svg';
import IconAddLocationBrown from '~/assets/icons/ic_add_location_brown.svg';
import IconExpandWhite from '~/assets/icons/ic_expand_white.svg';
import IconCamera from '~/assets/icons/ic_camera.svg';
import IconSetting from '~/assets/icons/ic_settings.svg';
import IconUser from '~/assets/icons/ic_user.svg';
import IconCube from '~/assets/icons/ic_cube.svg';
import IconMarker from '~/assets/icons/ic_marker.svg';
import IconCreditCard from '~/assets/icons/ic_credit_card.svg';
import IconSignOut from '~/assets/icons/ic_sign_out.svg';
import IconDrawerBrown from '~/assets/icons/ic_drawer_brown.svg';
import IconBrushBrown from '~/assets/icons/ic_brush_brown.svg';
import IconArrowLeftWhite from '~/assets/icons/ic_arrow_left_white.svg';
import IconDrawWhite from '~/assets/icons/ic_draw_white.svg';
import IconSendWhite from '~/assets/icons/ic_send_white.svg';
import IconGalleryWhite from '~/assets/icons/ic_gallery_white.svg';
import IconGalleryAddWhite from '~/assets/icons/ic_gallery_add_white.svg';
import IconAddBrown from '~/assets/icons/ic_add_brown.svg';
import IconMinusBrown from '~/assets/icons/ic_minus_brown.svg';
import IconShopBrown from '~/assets/icons/ic_shop_brown.svg';
import IconInfoBoxWhite from '~/assets/icons/ic_info_box_white.svg';
import IconFollowBrown from '~/assets/icons/ic_follow_brown.svg';
import IconFollowedBrown from '~/assets/icons/ic_followed_brown.svg';
import IconAddImageBrown from '~/assets/icons/ic_add_image_brown.svg';
import IconArrowRightBL from '~/assets/icons/ic_arrow_right_bl.svg';
import IconGalleryAddBrown from '~/assets/icons/ic_gallery_add_brown.svg';
import IconAddCircleBrown from '~/assets/icons/ic_add_circle_brown.svg';
import IconMenuBrown from '~/assets/icons/ic_menu_brown.svg';
import IconCalendarEdit from '~/assets/icons/ic_calendar_edit.svg';
import IconCircleSlice from '~/assets/icons/ic_circle_slice.svg';

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
    | 'IconBagWhite'
    | 'IconEditBrown'
    | 'IconMinusSmallBrown'
    | 'IconPlusSmallBrown'
    | 'IconTrashWhite'
    | 'IconAngleRightBrown'
    | 'IconCheckBoxCheckedWhite'
    | 'IconCheckBoxUnCheckWhite'
    | 'IconCheckLightBrown'
    | 'IconLocationBrown'
    | 'IconAddLocationBrown'
    | 'IconExpandWhite'
    | 'IconCamera'
    | 'IconSetting'
    | 'IconCube'
    | 'IconMarker'
    | 'IconCreditCard'
    | 'IconUser'
    | 'IconSignOut'
    | 'IconDrawerBrown'
    | 'IconBrushBrown'
    | 'IconArrowLeftWhite'
    | 'IconDrawWhite'
    | 'IconSendWhite'
    | 'IconGalleryWhite'
    | 'IconGalleryAddWhite'
    | 'IconCloseBoldWhite'
    | 'IconAddBrown'
    | 'IconMinusBrown'
    | 'IconShopBrown'
    | 'IconInfoBoxWhite'
    | 'IconFollowBrown'
    | 'IconFollowedBrown'
    | 'IconAddImageBrown'
    | 'IconCalendarEdit'
    | 'IconCircleSlice'
    | 'IconArrowRightBL'
    | 'IconGalleryAddBrown'
    | 'IconAddCircleBrown'
    | 'IconMenuBrown';

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
  IconEditBrown,
  IconMinusSmallBrown,
  IconPlusSmallBrown,
  IconTrashWhite,
  IconAngleRightBrown,
  IconCheckBoxCheckedWhite,
  IconCheckBoxUnCheckWhite,
  IconCheckLightBrown,
  IconLocationBrown,
  IconAddLocationBrown,
  IconExpandWhite,
  IconCamera,
  IconSetting,
  IconCube,
  IconMarker,
  IconCreditCard,
  IconUser,
  IconSignOut,
  IconDrawerBrown,
  IconBrushBrown,
  IconArrowLeftWhite,
  IconDrawWhite,
  IconSendWhite,
  IconGalleryWhite,
  IconGalleryAddWhite,
  IconCloseBoldWhite,
  IconAddBrown,
  IconMinusBrown,
  IconShopBrown,
  IconInfoBoxWhite,
  IconFollowBrown,
  IconFollowedBrown,
  IconAddImageBrown,
  IconArrowRightBL,
  IconGalleryAddBrown,
  IconAddCircleBrown,
  IconMenuBrown,
  IconCalendarEdit,
  IconCircleSlice,
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
    <Animated.View>
      <Pressable style={[{width, height}, style]} onPress={onPress}>
        {iconComponent}
      </Pressable>
    </Animated.View>
  ) : (
    <Animated.View style={[{width, height}, style]}>
      {iconComponent}
    </Animated.View>
  );
};
