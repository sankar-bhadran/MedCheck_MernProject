import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosInstances";

const initialState = {
  loading: false,
  registerStatus: false,
  otpStatus: false,
  forgotPasswordStatus: false,
  passwordResetStatus: false,
  userData: null,
  actionStatus: false,
  successMessages: " ",
  logOut: null,
  error: null,
  phonenumber: "",
  Data: null,
  locationData: null,
  commonData: null,
  paymentState: null,
  labData: null,
  userdata: {},
  userType: {},
  reportData: null,
};

export const sentotp = createAsyncThunk(
  "user/sentotp",
  async (phonenumber, rejectWithValue) => {
    console.log("Phonenumber", phonenumber);
    try {
      const response = await axios.post("api/sentotp", phonenumber);
      console.log(response);
      return response;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData) => {
    console.log(userData);
    try {
      const response = await axios.post("api/signup", userData);
      console.log(response);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credential) => {
    try {
      const response = await axios.post("api/login", credential);
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (userEmail) => {
    try {
      const response = await axios.post("/api/forgotpassword", userEmail);
      return response;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (resetDetails) => {
    console.log("reset", resetDetails);
    try {
      const response = await axios.post("api/resetpassword", resetDetails);
      // console.log(resetDetails)
      return response;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const getuser = createAsyncThunk("user/getuser", async () => {
  try {
    const response = await axios.get("api/userprofile");
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

export const updateProfile = createAsyncThunk(
  "user/updateprofile",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.patch("api/userprofile", userData);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const addaddress = createAsyncThunk(
  "user/addaddress",
  async (address, { rejectWithValue }) => {
    try {
      const response = await axios.post("api/addaddress", address);
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addressDelete = createAsyncThunk(
  "user/addressDelete",
  async (addressId, { rejectWithValue }) => {
    try {
      const response = await axios.patch("api/deleteaddress", { addressId });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resendOtp = createAsyncThunk(
  "user/resendotp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("api/resendotp", { data });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToCart = createAsyncThunk(
  "user/addtocart",
  async (id, { rejectWithValue }) => {
    console.log("id", id);
    try {
      const response = await axios.post("api/addtocart", { id });
      console.log("cartResponse", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const labAddToCart = createAsyncThunk(
  "user/labAddToCart",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post("api/labaddtocart", { id });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "user/removefromcart",
  async (id, { rejectWithValue }) => {
    console.log(id);
    try {
      const response = await axios.post("api/removefromcart", { id });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const labRemoveFromCart = createAsyncThunk(
  "user/labremovfromcart",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post("api/labremovfromcart", { id });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getScanCenterDetails = createAsyncThunk(
  "user/scandetails",
  async (centerid, { rejectWithValue }) => {
    console.log("idid", centerid);
    try {
      const response = await axios.get(`api/scandetails/${centerid}`);
      console.log("scanCenterDetails", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getLabCenterDetails = createAsyncThunk(
  "user/labdetails",
  async (centerid, { rejectWithValue }) => {
    try {
      const response = await axios.get(`api/labdetails/${centerid}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllLocations = createAsyncThunk(
  "user/fetchlocations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("api/fetchlocations");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const orders = createAsyncThunk(
  "user/paymentorders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("api/paymentorders");
      console.log("resposne", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const successPageDetails = createAsyncThunk(
  "user/successpagedetail",
  async (appointmentId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`api/successpagedetail${appointmentId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const myOrders = createAsyncThunk(
  "user/getmyorders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("api/getmyorders");
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resultreport = createAsyncThunk(
  "user/downloadreport",
  async (downloadid, { rejectWithValue }) => {
    console.log("iddd", downloadid);
    try {
      const response = await axios.get(`api/downloadreport/${downloadid}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  try {
    const response = await axios.get("api/logout");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setPhoneNumber: (state, action) => {
      state.phonenumber = action.payload;
    },
    setuserdetails: (state, action) => {
      state.userdata = action.payload;
    },
    clearError: (state, action) => {
      state.error = null;
      state.registerStatus = false;
    },

    clearPaymentState: (state, action) => {
      state.paymentState = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sentotp.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(sentotp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpStatus = true;
      })

      .addCase(sentotp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log("error", action.error.message);
      })

      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.otpStatus = false;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.registerStatus = true;
        state.successMessages = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log(action.error);
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.registerStatus = false;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.actionStatus = true;
        state.userData = action.payload.existinguser;
        state.userType = action.payload.existinguser.userType;
        localStorage.setItem(
          "existinguser",
          JSON.stringify(action.payload.existinguser)
        );
        console.log("userdata", action.payload.existinguser);
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log("errormessage", action.error.message);
      })

      .addCase(forgotPassword.pending, (state, action) => {
        state.loading = true;
        state.forgotPasswordStatus = null;
        state.error = null;
      })

      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessages = action.payload.message;
        console.log("dkjhsfdkjs", action.payload.message);
        state.forgotPasswordStatus = true;
      })

      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.forgotPasswordStatus = false;
        state.error = action.error.message || " ";
      })

      .addCase(resetPassword.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.passwordResetStatus = true;
      })

      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || " ";
      })

      .addCase(logout.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(logout.fulfilled, (state, action) => {
        localStorage.clear("existinguser");
        return { ...initialState };
      })

      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getuser.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(getuser.fulfilled, (state, action) => {
        state.actionStatus = true;
        state.Data = action.payload.user;
      })

      .addCase(getuser.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(updateProfile.pending, (state, action) => {
        state.loading = true;
        state.actionStatus = false;
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.actionStatus = !state.actionStatus;
        state.commonData = action.payload.userUpdate;
      })

      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(addaddress.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(addaddress.fulfilled, (state, action) => {
        state.actionStatus = !state.actionStatus;
        state.commonData = action.payload.address;
      })

      .addCase(addaddress.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(addressDelete.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(addressDelete.fulfilled, (state, action) => {
        state.actionStatus = !state.actionStatus;
        state.commonData = action.payload.deletedAddress;
      })

      .addCase(addressDelete.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(resendOtp.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(resendOtp.fulfilled, (state, action) => {
        state.registerStatus = true;
      })

      .addCase(resendOtp.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(addToCart.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        state.actionStatus = true;
        state.Data = action.payload.userData;
      })

      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(labAddToCart.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(labAddToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.Data = action.payload.userData;
      })

      .addCase(labAddToCart.rejected, (state, action) => {
        state.error = action.error.message || "";
      })

      .addCase(removeFromCart.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.Data = action.payload.userData;
      })

      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(labRemoveFromCart.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(labRemoveFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.Data = action.payload.userData;
      })

      .addCase(labRemoveFromCart.rejected, (state, action) => {
        state.error = action.error.message || "";
      })

      .addCase(getScanCenterDetails.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(getScanCenterDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.commonData = action.payload.scanCenterDetails;
      })

      .addCase(getScanCenterDetails.rejected, (state, action) => {
        state.error = action.error.message || "";
      })

      .addCase(getLabCenterDetails.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(getLabCenterDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.commonData = action.payload.labCenterDetails;
      })

      .addCase(getLabCenterDetails.rejected, (state, action) => {
        state.error = action.error.message || "";
      })

      .addCase(getAllLocations.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(getAllLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.locationData = action.payload.fetchedlocations;
      })

      .addCase(getAllLocations.rejected, (state, action) => {
        state.error = action.error.message || "";
      })

      .addCase(orders.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(orders.fulfilled, (state, action) => {
        state.actionStatus = true;
        state.paymentState = action.payload.data;
        console.log("payload", state.paymentState);
      })

      .addCase(orders.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(successPageDetails.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(successPageDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.commonData = action.payload.appointmentDetails;
      })

      .addCase(successPageDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || " ";
      })

      .addCase(myOrders.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(myOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.Data = action.payload.fetchedorders;
      })

      .addCase(myOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || " ";
      })

      .addCase(resultreport.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(resultreport.fulfilled, (state, action) => {
        state.loading = false;
        state.actionStatus = true;
        state.reportData = action.payload;
      })

      .addCase(resultreport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || " ";
      });
  },
});

export default userSlice.reducer;
export const {
  setPhoneNumber,
  setuserdetails,
  clearError,
  clearRegisterStatus,
  clearPaymentState,
} = userSlice.actions;
