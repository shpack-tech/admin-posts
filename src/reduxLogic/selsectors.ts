import { store } from './store';

const state = store.getState();

export const getRefreshToken = () => state.auth.refreshToken;
