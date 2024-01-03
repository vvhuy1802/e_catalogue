import {useDispatch} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {getAllCollection} from '~/redux/actions/userInfoAction';
import {userInfoService} from '~/services/service/userInfo.service';

export const useFavorite = () => {
  const dispatch = useDispatch<AppDispatch>();
  const addFavorite = async (
    contentId: string,
    contentType: 'product' | 'idea',
    collectionId: string,
  ) => {
    userInfoService.addFavorite({
      contentId,
      contentType,
      collectionId,
    });
    await dispatch(getAllCollection());
  };

  const removeFavorite = async (favoriteId: string) => {
    await userInfoService.removeFavorite({
      id: favoriteId,
    });
    await dispatch(getAllCollection());
  };
  return {
    addFavorite,
    removeFavorite,
  };
};
