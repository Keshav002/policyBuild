import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { API_URL } from "../ConfigApi";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: {},
  },
  reducers: {
    setUser(state, action) {
      state.userData = action.payload;
    },
    removeUser(state) {
      state.userData = {}; // Clear user data
    },
  },
});

export const { setUser, removeUser, updateUser } = userSlice.actions;
export default userSlice.reducer;

//thunks

export const logoutUser = (navigate) => {
  console.log("inside logoutuser");
  return async function logoutThunk(dispatch, getState) {
    console.log("inside thunk");
    fetch(`${API_URL}/users/users/logout/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          dispatch(removeUser());
          navigate("/");
        } else if (response.status == 401) {
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          dispatch(removeUser());
          navigate("/");
        } else {
          console.error("Logout failed");
        }
      })
      .catch((error) => {
        console.error("An error occurred during logout", error);
      });
  };
};

//Googlelogin thunk
export const googleLogin = (requestData, navigate) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/users/users/google-signin/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    if (response.ok) {
      const data = await response.json();
      if (data.access_token) {
        const decodedToken = jwtDecode(data.access_token);
        const expirationDate = new Date(decodedToken.exp * 1000);
        console.log(expirationDate);
        Cookies.set("accessToken", data.access_token, {
          expires: expirationDate,
        });
        const decodedRefreshToken = jwtDecode(data.refresh_token);
        const expirationDateRefreshToken = new Date(
          decodedRefreshToken.exp * 1000
        );
        console.log(expirationDateRefreshToken);
        Cookies.set("refreshToken", data.refresh_token, {
          expires: expirationDateRefreshToken,
        });
        dispatch(setUser(data));
        if (decodedToken.role == "Consultant") {
          navigate("/consultant-projects");
        } else if (decodedToken.role == "Company") {
          navigate("/company-projects");
        }
      } else {
        console.log("Authentication failed");
      }
    } else {
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export function handleSignIn(userDetails, navigate) {
  // const navigate = useNavigate();

  return async function handleSignInThunk(dispatch, getState) {
    fetch(`${API_URL}/users/users/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
          const expirationDate = new Date(decodedToken.exp * 1000);
          console.log(expirationDate);
          Cookies.set("accessToken", data.token.access, {
            expires: expirationDate,
          });
        
          const decodedRefreshToken = jwtDecode(data.token.refresh);
          const expirationDateRefreshToken = new Date(decodedRefreshToken.exp * 1000);
          console.log(expirationDateRefreshToken);
          Cookies.set("refreshToken", data.token.refresh, {
            expires: expirationDateRefreshToken,
          });
        
          // dispatch(setUser(data));
        
          const userRole = data.role;
          const companyId = data.userData?.company?.id || null;
          const companyName = data.userData?.company?.name || null;

          dispatch(
            setUser({
              ...data,
              company: {
                id: companyId,
                name: companyName,
              },
            })
          );
        
          if (userRole === "Consultant") {
            navigate("/consultant-projects");
          } else if (userRole === "Company") {
            
            if (companyId !== undefined) {
              navigate("/company-projects", { state: { companyId } });
            } else {
              
              console.error('Company ID is not defined in the response.');
            }
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "User not found. Please check your credentials and try again.",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred. Please try again.",
        });
      });
  };
}
