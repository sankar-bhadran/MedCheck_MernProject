import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosInstances";

const initialState = {
  loading: false,
  CenterStatus: false,
  Centerdata: null,
  CommonData: null,
  TestDetails: [],
  AddedTest: null,
  error: "",
  Messages: " ",
};

export const getScanDetails = createAsyncThunk(
  "center/scandetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get("center/scanregister");
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addScan = createAsyncThunk(
  "centre/addscan",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const response = await axios.post("center/addscan", data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getScanCategories = createAsyncThunk(
  "center/scanCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("center/scancategories");
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getContinue = createAsyncThunk(
  "center/continuebutton",
  async (_, { rejectWithValue }) => {
    console.log("sadkjanskdl");
    try {
      const response = await axios.patch("center/onetimeapprovel");
      console.log("response", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getListingDetails = createAsyncThunk(
  "center/getlistingdetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("center/listingdetails");
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchDetails = createAsyncThunk(
  "center/searchdetails",
  async ({ search = "", page = 1 ,selectedLocations=""}, { rejectWithValue }) => {
    console.log("searchsadad ", selectedLocations);
    try {
      const response = await axios.get(
        `center/search?searchdata=${search}&page=${page}&location=${selectedLocations}`
      );
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const reApply = createAsyncThunk(
  "center/reapply",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch("center/reapply", data);
      console.log("response", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const categorydetails = createAsyncThunk(
  "center/categorydetails",
  async (id, { rejectWithValue }) => {
    console.log("response", id);
    try {
      const response = await axios.get(`center/fetchtestdetails/${id}`);
      console.log("response", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAddTest = createAsyncThunk(
  "center/getAddTest",
  async (centerid, { rejectWithValue }) => {
    try {
      const response = await axios.get(`center/fetchaddtest/${centerid}`);
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPaginationData = createAsyncThunk(
  "center/getPaginationData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("center/getdata");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTestDetails=createAsyncThunk('center/getTestDetails',async(formData,{rejectWithValue})=>{
  console.log("formdata",formData)
  try {
    const response=await axios.post('center/getTestDetails',formData)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data);

  }
})

export const fetchBookingDetails=createAsyncThunk('center/fetchbookings',async(centerid,{rejectWithValue})=>{
  try {
    const response=await axios.get(`center/fetchbookings/${centerid}`)
    console.log("response",response.data)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})



const centerSlice = createSlice({
  initialState,
  name: "center",
  reducers: {
    clearTestDetails: (state, action) => {
      state.TestDetails = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getScanDetails.pending, (state, action) => {
        state.loading = true;
        state.Centerdata = null;
      })
      .addCase(getScanDetails.fulfilled, (state, action) => {
        state.CenterStatus = true;
        state.Centerdata = action.payload.dataToSend;
        console.log(action.payload.isSubmitted);
      })

      .addCase(getScanDetails.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(getScanCategories.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(getScanCategories.fulfilled, (state, action) => {
        state.CenterStatus = true;
        state.CommonData = action.payload.scanCategories;
      })

      .addCase(getScanCategories.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(addScan.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(addScan.fulfilled, (state, action) => {
        state.CenterStatus = !state.CenterStatus;
      })

      .addCase(addScan.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(getContinue.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(getContinue.fulfilled, (state, action) => {
        state.CenterStatus = true;
      })

      .addCase(getContinue.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(reApply.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(reApply.fulfilled, (state, action) => {
        state.CenterStatus = true;
      })

      .addCase(reApply.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(getListingDetails.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(getListingDetails.fulfilled, (state, action) => {
        state.CenterStatus = true;
        state.Centerdata = action.payload.centerlisting;
      })

      .addCase(getListingDetails.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(searchDetails.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(searchDetails.fulfilled, (state, action) => {
        state.CenterStatus = true;
        state.Centerdata = action.payload.scanSearch;
        console.log("pageCount", action.payload);
      })

      .addCase(searchDetails.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(categorydetails.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(categorydetails.fulfilled, (state, action) => {
        state.CenterStatus = true;
        state.TestDetails = action.payload.fetchCategory;
      })

      .addCase(categorydetails.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(getAddTest.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(getAddTest.fulfilled, (state, action) => {
        state.AddedTest = action.payload.addedDetails;
      })

      .addCase(getAddTest.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(getTestDetails.pending,(state,action)=>{
        state.loading=true
      })

      .addCase(getTestDetails.fulfilled,(state,action)=>{
        state.CenterStatus=true
        state.CommonData=action.payload.details
        console.log("commonData",action.payload.details)

      })

      .addCase(getTestDetails.rejected,(state,action)=>{
        state.error=action.error.message || " "
      })

      .addCase(fetchBookingDetails.pending,(state,action)=>{
        state.loading=true
      })

      .addCase(fetchBookingDetails.fulfilled,(state,action)=>{
        state.CommonData=action.payload.appointments
      })

      .addCase(fetchBookingDetails.rejected,(state,action)=>{
        state.error=action.error.message || ""
      })

      


      

  },
});

export default centerSlice.reducer;
export const { clearTestDetails } = centerSlice.actions;
