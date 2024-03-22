import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axiosConfig";
import toast from "react-hot-toast";


export const loginUser = createAsyncThunk("user/login", async (userData, thunkAPI) => {
    try {
        const config = {
            headers: { "Content-Type": "application/json" }
        };

        let response = await axios.post("/user/login", userData, config)
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        // Handle errors
        console.error("Login error:", error.response ? error.response.data : error.message);
        // Show error toast notification
        toast.error(error.response ? error.response.data.msg : "Login Failed");
        // Reject with value to pass error to action payload
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

export const registerUser = createAsyncThunk("user/register", async (userData, thunkAPI) => {
    try {
        const config = {
            headers: { "Content-Type": "multipart/form-data" }
        };
        const response = await axios.post("/user/register", userData, config);
        if (response.status === 201) {
            return response.data;
        } else {
            toast.error(response.data.msg)
            console.log(response.data)
        }
    } catch (error) {
        // Handle errors
        console.error("Registration error:", error.response ? error.response.data : error.message);

        let err = error.response ? error.response.data.msg : "Registration Failed!"
        return thunkAPI.rejectWithValue({ error: err })
    }
});

export async function handleLogout(dispatch, nav) {

    localStorage.removeItem("token");
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    nav("/");
    toast.success("Logout Successfully");
    dispatch(logout())
}
export function checkAuthFrontEnd() {
    let token = localStorage.getItem("token")
    let val = JSON.parse(localStorage.getItem("auth"))
    return val ? (token && val) : false
}

const initialState = {
    user: {},
    isLoading: false,
    isError: false,
    isAuthenticated: false,
    token: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        checkAuth: (state, action) => {

            const token = localStorage.getItem("token");
            const userJSON = JSON.parse(localStorage.getItem("user"))
            const authJSON = JSON.parse(localStorage.getItem("auth"))

            const isAuthenticated = authJSON ? JSON.parse(authJSON) : false;

            state.token = token;
            state.isAuthenticated = isAuthenticated;
            state.user = userJSON || null;

        },

        logout: (state, action) => {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            state.token = null
            state.isAuthenticated = false
        }
    },
    extraReducers: (builder) => {
        builder
            // register
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.isLoading && toast.loading("Registering...")
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.isError = false
                localStorage.setItem("auth", true);
                localStorage.setItem("token", state.user.token);

                localStorage.setItem("user", JSON.stringify(state.user.newUser))

                toast.success("Registered Successfully");
            })

            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload.error;
                toast.error(state.isError)
                state.isAuthenticated = false;
            })
            // login
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.isError = false
                localStorage.setItem("auth", true);
                localStorage.setItem("token", state.user.token);
                localStorage.setItem("user", JSON.stringify(state.user.userExists));

                toast.success("User Logged in Successfully");
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload.error;
                state.isAuthenticated = false;
                // toast.error("Login Failed");
            });
    }
});
export const { checkAuth, logout } = userSlice.actions
export default userSlice.reducer;
