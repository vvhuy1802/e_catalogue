import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '~/app/store';
import {PopupMessageProps} from '~/components/global/popupMessage';
import {LoadingState} from '~/types';

type PopupMessageState = {
  loadingState: LoadingState;
  queueMessages: Array<PopupMessageProps>;
  index: number;
  loadingCircle: {
    show: boolean;
    message: string;
  };
  loadingCircleInvoice: {
    show: boolean;
    message: string;
  };
  currentState: PopupMessageProps;
};

const initialState: PopupMessageState = {
  queueMessages: [],
  loadingState: 'idle',
  loadingCircle: {
    show: false,
    message: 'Processing',
  },
  loadingCircleInvoice: {
    show: false,
    message: 'Waiting for payment',
  },
  index: 0,
  currentState: {
    type: 'error',
    size: 'large',
    time: 'short',
  },
};

const popupMessageSlice = createSlice({
  name: 'popup',
  initialState: initialState,
  reducers: {
    AddPopupMessage: (state, action: PayloadAction<PopupMessageProps>) => {
      const {
        message,
        title,
        type,
        time,
        hyperlink,
        hyperlinkText,
        onPressLink,
      } = action.payload;
      state.queueMessages.push({
        message,
        title,
        type,
        time,
        hyperlink,
        hyperlinkText,
        onPressLink,
        size: 'large',
      });
      //console.log('Add message: ', JSON.stringify(state.queueMessages));

      //Start the first message
      if (state.queueMessages.length === 1) {
        state.loadingState = 'pending';
        state.currentState = {...state.queueMessages[0]};
      }
    },
    HidePopupMessage: state => {
      state.queueMessages.shift();
      //console.log('Hide message: ', JSON.stringify(state.queueMessages));
      //Check if have any message left
      if (state.queueMessages.length === 0) {
        state.index = 0;
        state.loadingState = 'idle';
      } else {
        state.index += 1;
        state.currentState = {...state.queueMessages[0]};
      }
    },
    ShowLoadingCircle: (state, action: PayloadAction<string>) => {
      const data = {
        show: true,
        message: action.payload ? action.payload : 'Processing',
      };
      state.loadingCircle = data;
    },
    HideLoadingCircle: state => {
      state.loadingCircle.show = false;
    },
    ShowLoadingCircleInvoice: (state, action: PayloadAction<string>) => {
      const data = {
        show: true,
        message: action.payload ? action.payload : 'Waiting for payment',
      };
      state.loadingCircleInvoice = data;
    },
    HideLoadingCircleInvoice: state => {
      state.loadingCircleInvoice.show = false;
    },
  },
});

export default popupMessageSlice.reducer;
export const {
  AddPopupMessage,
  HidePopupMessage,
  ShowLoadingCircle,
  HideLoadingCircle,
  ShowLoadingCircleInvoice,
  HideLoadingCircleInvoice,
} = popupMessageSlice.actions;
export const selectPopupState = (state: RootState) => state.popupMeassage;
export const selectLoadingPopupState = (state: RootState) =>
  state.popupMeassage.loadingState;
export const selectLoadingCircle = (state: RootState) =>
  state.popupMeassage.loadingCircle;
export const selectLoadingCircleInvoice = (state: RootState) =>
  state.popupMeassage.loadingCircleInvoice;
