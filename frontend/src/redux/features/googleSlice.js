import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from '../../utils/axiosInstances';

const initialState={
    googleSignIn:false,
    userData: null
}


export const googleSignup = createAsyncThunk(
    "user/googleSignup",
    async (credentialData, { rejectWithValue }) => {
      console.log("staatata",credentialData);
      try {
        const response = await axios.post("api/googleSignup", credentialData);
        console.log("datasdsd", response.data);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  const googleSlice=createSlice({
    initialState,
    name:"google",
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(googleSignup.pending,(state,action)=>{
            state.loading=true
        })

        .addCase(googleSignup.fulfilled,(state,action)=>{
            state.loading=false;
            state.googleSignIn=true
            console.log("user",action.payload.user)
            state.userData=action.payload.user
            state.userType=action.payload.userType

        })
        .addCase(googleSignup.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message || " "
        })
    }
  })

  export default googleSlice.reducer;