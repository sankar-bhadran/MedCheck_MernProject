import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosInstances";

const initialState = {
  loading: false,
  adminsStatus: false,
  adminActionStatus: false,
  viewdetails: false,
  Data: null,
  messageStatus: true,
  error: "",
  successMessages: " ",
};

export const adminlogin = createAsyncThunk(
  "admin/adminlogin",
  async (admindata) => {
    console.log("admindata", admindata);
    try {
      const response = await axios.post("admin/adminlogin", admindata);
      console.log(response);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const addCategory = createAsyncThunk(
  "admin/addcategory",
  async (categorydata, { rejectWithValue }) => {
    console.log("categorydata", categorydata);
    try {
      const response = await axios.post("admin/admincategories", categorydata);
      console.log(response);
      return response.data;
    } catch (error) {
      // throw error.response.data
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const labaddCategory = createAsyncThunk(
  "admin/labaddcategory",
  async (labcategorydata, { rejectWithValue }) => {
    console.log("123456", labcategorydata);
    try {
      const response = await axios.post(
        "admin/labaddcategory",
        labcategorydata
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getData = createAsyncThunk(
  "admin/admingetData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("admin/admincategories");
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getLabCategory = createAsyncThunk(
  "admin/labcategorydata",
  async (_, rejectWithValue) => {
    try {
      const response = await axios.get("admin/labcategorydata");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const availableData = createAsyncThunk(
  "admin/availableData",
  async (isAvailable, { rejectWithValue }) => {
    console.log("categoryid", isAvailable);
    try {
      const response = await axios.patch("admin/admincategories", {
        isAvailable,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const blockUser = createAsyncThunk(
  "admin/blockUser",
  async (userData, { rejectWithValue }) => {
    console.log("userData", userData);
    try {
      const response = await axios.patch("admin/blockuser", {
        userData,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const blockOwner = createAsyncThunk(
  "admi/blockOwner",
  async (ownerData, { rejectWithValue }) => {
    console.log("ownerData", ownerData);
    try {
      const response = await axios.patch("admin/blockowner", { ownerData });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "admin/getUser",
  async (_, { rejectWithValue }) => {
    console.log("dsfkjsdfkj");
    try {
      const response = await axios.get("admin/userdetails");
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOwner = createAsyncThunk(
  "admin/getOwner",
  async (_, { rejectWithValue }) => {
    console.log("jkdfnsdkf");
    try {
      const response = await axios.get("admin/getowner");
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCenters = createAsyncThunk(
  "admin/getCenterDetails",
  async (_, { rejectWithValue }) => {
    console.log("dsfkjsdfkj");
    try {
      const response = await axios.get("center/getCenterDetails");
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCenterDetails = createAsyncThunk(
  "admin/getCenter",
  async (centerid, { rejectWithValue }) => {
    console.log("centerid", centerid);
    try {
      const response = await axios.get(`admin/viewdetails/${centerid}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const scanRegister = createAsyncThunk(
  "admin/scanregister",
  async (data, { rejectWithValue }) => {
    console.log("data", data);
    try {
      const response = await axios.post("center/scanregister", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const centerapproval = createAsyncThunk(
  "admin/centerapproval",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch("admin/centerapprove", { data });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSubCategory = createAsyncThunk(
  "admin/getSubCategory",
  async (categoryid, { rejectWithValue }) => {
    console.log("fghfhfhf", categoryid);
    try {
      const response = await axios.get(`admin/getCategory/${categoryid}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const centerreject = createAsyncThunk(
  "admin/centerreject",
  async (data, { rejectWithValue }) => {
    console.log("data", data);
    try {
      const response = await axios.patch("admin/centerreject", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addLocation = createAsyncThunk(
  "admin/centeraddlocation",
  async (data, { rejectWithValue }) => {
    console.log("123456", data);
    try {
      const response = await axios.post("admin/addloaction", data);
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchallLocation = createAsyncThunk(
  "admin/centerfetchalllocation",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("admin/fetchalllocation");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const scanPendingList = createAsyncThunk(
  "admin/scanPendinglist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("admin/scanpendinglist");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminDashboard = createAsyncThunk(
  "admin/dashboarddata",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("admin/dashboarddata");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminlogout = createAsyncThunk(
  "admin/logout",
  async (_, { rejectWithValue }) => {
    try {
      console.log("sdfkjsdfkjs");
      const response = await axios.get("admin/adminpanel");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adminslice = createSlice({
  initialState,
  name: "admin",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminlogin.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(adminlogin.fulfilled, (state, action) => {
        state.loading = false;
        state.adminsStatus = true;
        localStorage.setItem(
          "adminIsLoggedIn",
          JSON.stringify(action.payload.admin)
        );
      })

      .addCase(adminlogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || " ";
      })

      .addCase(addCategory.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(addCategory.fulfilled, (state, action) => {
        state.adminActionStatus = !state.adminActionStatus;
      })

      .addCase(addCategory.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(adminlogout.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(adminlogout.fulfilled, (state, action) => {
        localStorage.clear("adminIsLoggedIn");
        return { ...initialState };
      })

      .addCase(adminlogout.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })
      .addCase(getData.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(getData.fulfilled, (state, action) => {
        state.Data = action.payload.categoryData;
      })

      .addCase(getData.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(availableData.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(availableData.fulfilled, (state, action) => {
        state.adminActionStatus = !state.adminActionStatus;
      })

      .addCase(availableData.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(getUser.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(getUser.fulfilled, (state, action) => {
        state.adminActionStatus = true;
        state.Data = action.payload.userData;
      })

      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(scanRegister.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(scanRegister.fulfilled, (state, action) => {
        state.adminActionStatus = true;
        state.Data = action.payload.register;
        localStorage.setItem(
          "Centerdetails",
          JSON.stringify(action.payload.register)
        );
        console.log("action", action.payload.register);
      })

      .addCase(scanRegister.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(getCenters.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(getCenters.fulfilled, (state, action) => {
        state.adminActionStatus = true;
        state.Data = action.payload.centers;
      })

      .addCase(getCenters.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(blockUser.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(blockUser.fulfilled, (state, action) => {
        state.adminActionStatus = !state.adminActionStatus;
        state.successMessages = action.payload.message;
      })

      .addCase(blockUser.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(getOwner.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(getOwner.fulfilled, (state, action) => {
        state.adminActionStatus = true;
        state.Data = action.payload.ownersData;
      })

      .addCase(getOwner.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(blockOwner.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(blockOwner.fulfilled, (state, action) => {
        state.adminActionStatus = !state.adminActionStatus;
      })

      .addCase(blockOwner.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(getCenterDetails.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(getCenterDetails.fulfilled, (state, action) => {
        state.Data = action.payload.centerDetails;
      })

      .addCase(getCenterDetails.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(centerapproval.pending, (state, action) => {
        state.loading = false;
      })

      .addCase(centerapproval.fulfilled, (state, action) => {
        state.messageStatus = true;
        state.adminActionStatus = !state.adminActionStatus;
        state.successMessages = action.payload.message;
        console.log(action.payload.message);
      })

      .addCase(centerapproval.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(getSubCategory.pending, (state, action) => {
        state.loading = false;
      })

      .addCase(getSubCategory.fulfilled, (state, action) => {
        state.Data = action.payload.categoryData;
        state.adminActionStatus = true;
      })

      .addCase(getSubCategory.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(centerreject.pending, (state, action) => {
        state.loading = false;
      })

      .addCase(centerreject.fulfilled, (state, action) => {
        state.adminActionStatus = !state.adminActionStatus;
      })

      .addCase(centerreject.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(addLocation.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(addLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.adminActionStatus = true;
        state.Data = action.payload.addedLocation;
      })

      .addCase(addLocation.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(fetchallLocation.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(fetchallLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.adminActionStatus = true;
        state.Data = action.payload.allLocationDetails;
      })

      .addCase(fetchallLocation.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(scanPendingList.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(scanPendingList.fulfilled, (state, action) => {
        state.Data = action.payload.pendingList;
      })

      .addCase(scanPendingList.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(labaddCategory.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(labaddCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.adminActionStatus = true;
      })

      .addCase(labaddCategory.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(getLabCategory.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(getLabCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.Data = action.payload.labcategorydata;
      })

      .addCase(getLabCategory.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(adminDashboard.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(adminDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.Data = action.payload.dashboardData;
        console.log("srara", state.Data);
      })

      .addCase(adminDashboard.rejected, (state, action) => {
        state.error = action.error.message || "";
      });
  },
});

export default adminslice.reducer;
