import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosInstances";

const initialState = {
  loading: false,
  labStatus: false,
  labData: null,
  commonData: null,
  Data: null,
  intialData:null,
  error: " ",
};

export const registerLab = createAsyncThunk(
  "lab/registerlab",
  async (data, { rejectWithValue }) => {
    console.log("data", data);
    try {
      const response = await axios.post("labcenter/registerlab", data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllLabs = createAsyncThunk(
  "lab/getAllLabsDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("labcenter/getalllabsdetails");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getLabDetails = createAsyncThunk(
  "lab/getlabdetails",
  async (centerid, { rejectWithValue }) => {
    try {
      const response = await axios.get(`labcenter/labviewdetails/${centerid}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const Labapproval = createAsyncThunk(
  "labcenter/labapproval",
  async (data, { rejectWithValue }) => {
    console.log("sfdjsdfjk", data);
    try {
      const response = await axios.patch("labcenter/labapproval", { data });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const LabReject = createAsyncThunk(
  "labcenter/labreject",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch("labcenter/labreject", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const labGetContinue = createAsyncThunk(
  "labcenter/continuebutton",
  async (_, { rejectWithValue }) => {
    console.log("labGetContinue");

    try {
      const response = await axios.patch("labcenter/labonetimeapprovel");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const allDetails = createAsyncThunk(
  "lab/alldetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("labcenter/alldetails");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getLabListingDetail = createAsyncThunk(
  "labcenter/lablistingdetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("labcenter/lablistingdetails");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getLabCategories = createAsyncThunk(
  "labcenter/labcategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("labcenter/labcategorires");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addLabTest = createAsyncThunk(
  "center/addlabtests",
  async (data, { rejectWithValue }) => {
    console.log("data", data);
    try {
      const response = await axios.post("labcenter/addlabtests", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getAllAddedTest = createAsyncThunk(
  "lab/fetchalladdedtest",
  async (centerid, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `labcenter/fetchalladdedtest/${centerid}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getLabTest=createAsyncThunk('labcenter/getlabtest',async(formdata,{rejectWithValue})=>{
  console.log("formdata",formdata)
  try {
    const response=await axios.get(`labcenter/getlabtest?category=${formdata.mainCategory}&labid=${formdata.labId}`)
    console.log("response",response.data)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

const labSlice = createSlice({
  initialState,
  name: "labcenter",
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(registerLab.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(registerLab.fulfilled, (state, action) => {
        state.loading = false;
        state.labStatus = true;
      })

      .addCase(registerLab.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(getAllLabs.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(getAllLabs.fulfilled, (state, action) => {
        state.loading = false;
        state.labData = action.payload.labsCenters;
      })

      .addCase(getAllLabs.rejected, (state, action) => {
        state.error = action.error.message || "";
      })

      .addCase(getLabDetails.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(getLabDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.labData = action.payload.labDetails;
      })

      .addCase(getLabDetails.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(Labapproval.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(Labapproval.fulfilled, (state, action) => {
        state.loading = false;
        state.labStatus = !state.labStatus;
      })

      .addCase(Labapproval.rejected, (state, action) => {
        state.error = action.error.message || "";
      })

      .addCase(LabReject.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(LabReject.fulfilled, (state, action) => {
        state.labStatus = !state.labStatus;
      })

      .addCase(LabReject.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(allDetails.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(allDetails.fulfilled, (state, action) => {
        state.labStatus = true;
        state.labData = action.payload.sendData;
      })

      .addCase(allDetails.rejected, (state, action) => {
        state.error = action.error.message || "";
      })

      .addCase(getLabListingDetail.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(getLabListingDetail.fulfilled, (state, action) => {
        state.labStatus = true;
        state.labData = action.payload.lablisting;
      })

      .addCase(getLabListingDetail.rejected, (state, action) => {
        state.error = action.error.message || "";
      })

      .addCase(labGetContinue.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(labGetContinue.fulfilled, (state, action) => {
        state.loading = false;
        state.labStatus = true;
      })

      .addCase(labGetContinue.rejected, (state, action) => {
        state.error = action.error.message || "";
      })

      .addCase(getLabCategories.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(getLabCategories.fulfilled, (state, action) => {
        state.labStatus = true;
        state.commonData = action.payload.labCategories;
      })

      .addCase(getLabCategories.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(addLabTest.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(addLabTest.fulfilled, (state, action) => {
        state.labStatus = true;
        state.Data = action.payload.fetcheddata;
      })

      .addCase(addLabTest.rejected, (state, action) => {
        state.error = action.error.message || "";
      })

      .addCase(getAllAddedTest.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(getAllAddedTest.fulfilled, (state, action) => {
        state.loading = false;
        state.intialData = action.payload.fetcheddata;
      })

      .addCase(getAllAddedTest.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(getLabTest.pending,(state,action)=>{
        state.loading=true
      })

      .addCase(getLabTest.fulfilled,(state,action)=>{
        state.loading=false
        state.commonData=action.payload.fetcheddata
      })

      .addCase(getLabTest.rejected,(state,action)=>{
        state.error=action.error.message || " "
      })
  },
});

export default labSlice.reducer;
