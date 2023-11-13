import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import { API_URL } from '../ConfigApi';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
const userSlice = createSlice({
    name : 'user',
    initialState: {
        userData:{},
    },
    reducers: {
        setUser(state, action){
            state.userData = action.payload;
        },
        removeUser(state) {
            state.userData = {}; // Clear user data
          },
    },
})

export const { setUser, removeUser, updateUser} = userSlice.actions;
export default userSlice.reducer;

//thunks

export const logoutUser = () => (dispatch) => {
    dispatch(removeUser());
  
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    window.location.href = '/login';
  };

export function handleSignIn(userDetails){
// const navigate = useNavigate();

    return async function handleSignInThunk(dispatch, getState){
        fetch(`${API_URL}/users/users/login/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: userDetails.username, // Provide the user's email
              password: userDetails.password, // Provide the user's password
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              if (data.token) {
                const decodedToken = jwtDecode(data.token.access);
                const expirationDate = new Date(decodedToken.exp * 1000); // Convert seconds to milliseconds
                console.log(expirationDate)
                Cookies.set('accessToken', data.token.access, { expires: expirationDate });
                Cookies.set('refreshToken', data.token.refresh);
                dispatch(setUser(data));
                // navigate('/consultant');
                window.location.href = '/consultant';
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'User not found. Please check your credentials and try again.',
                });
              }
            })
            .catch((error) => {
              console.error('Error:', error);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred. Please try again.',
              });
            });  
    }
}