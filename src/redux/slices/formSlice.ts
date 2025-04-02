import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  firstName: string;
  lastName: string;
  gender: string;
  relationship: string;
  fileName: string;
  isReadOnly: boolean;
}

const initialState: FormState = {
  firstName: "",
  lastName: "",
  gender: "",
  relationship: "",
  fileName: "",
  isReadOnly: false,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    saveForm: (state, action: PayloadAction<Partial<FormState>>) => {  
      return {
        ...state, 
        ...action.payload, 
        isReadOnly: true,
      };
    },

    resetForm: () => ({ ...initialState }),  // ✅ Creates a new object

    setReadOnly: (state, action: PayloadAction<boolean>) => {
      return { ...state, isReadOnly: action.payload };
    },
  },
});

export const { saveForm, resetForm, setReadOnly } = formSlice.actions;
export default formSlice.reducer;
