import axios from 'axios';
import history from '../history';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';
const SIGN_UP = 'SIGN_UP';

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });
const signUp = (auth) => ({ type: SIGN_UP, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate =
  (username, password, method) => async (dispatch) => {
    try {
      const res = await axios.post(`/api/users/${method}`, {
        username,
        password,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      history.push('/');
      dispatch(me());
      window.location.reload();
      toast.success(`Welcome, ${username}`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (authError) {
      toast.error(`${authError.response.data}`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

export const signUpThunk =
  (username, password, email, method) => async (dispatch) => {
    try {
      const res = await axios.post(`/api/users/${method}`, {
        username,
        password,
        email,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
      toast.success(`Welcome, ${username}`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      history.push('/');
      window.location.reload();
    } catch (error) {
      // console.error("storeerror", error.response);
      toast.error(`${error.response.data.message}`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push('/login');
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function authReducer(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    case SIGN_UP:
      return action.auth;
    default:
      return state;
  }
}
