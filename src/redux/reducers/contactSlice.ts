import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '~/app/store';
import {PopupMessageProps} from '~/components/global/popupMessage';
import {LoadingState} from '~/types';
import {NormalizedLocationVietNam} from '~/types/auth';
import {Contact, ContactAPIReponse, addressTree} from '~/types/contact';
import {getAllUserContact} from '../actions/contact';

type ContactState = {
  loadingState: LoadingState;
  addressTree: addressTree;
  normalizedAddressTree: NormalizedLocationVietNam;
  allUserContact: Array<ContactAPIReponse>;
};

const initialState: ContactState = {
  loadingState: 'idle',
  addressTree: [],
  normalizedAddressTree: {
    ids: [],
    entities: {},
  },
  allUserContact: [],
};

const contactSlice = createSlice({
  name: 'contact',
  initialState: initialState,
  reducers: {
    setLoadingState: (
      state,
      action: PayloadAction<{loadingState: LoadingState}>,
    ) => {
      state.loadingState = action.payload.loadingState;
    },

    setAddressTree: (
      state,
      action: PayloadAction<{addressTree: addressTree}>,
    ) => {
      state.addressTree = action.payload.addressTree;
    },
    setNormalizedAddresstree: (
      state,
      action: PayloadAction<{normalizedAddressTree: NormalizedLocationVietNam}>,
    ) => {
      state.normalizedAddressTree = action.payload.normalizedAddressTree;
    },
  },
  extraReducers: builder => {
    builder.addCase(getAllUserContact.fulfilled, (state, action) => {
      console.log('set all user contact', JSON.stringify(action.payload.data));
      const resData: Array<ContactAPIReponse> = action.payload.data
        .data as unknown as Array<ContactAPIReponse>;
      state.allUserContact = resData;
    });
  },
});

export default contactSlice.reducer;
export const {
  setLoadingState,

  setAddressTree,
  setNormalizedAddresstree,
} = contactSlice.actions;
export const selectAddressTree = (state: RootState) =>
  state.contact.addressTree;
export const selectNormalizedAddressTree = (state: RootState) =>
  state.contact.normalizedAddressTree;
export const selectAllUserContact = (state: RootState) =>
  state.contact.allUserContact;
