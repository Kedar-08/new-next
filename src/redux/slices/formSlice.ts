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
    saveForm: (state, action: PayloadAction<Omit<FormState, "isReadOnly">>) => {
      Object.assign(state, {
        ...action.payload,
        isReadOnly: true,
      });
    },

    resetForm: () => initialState, // ✅ Now exists

    setReadOnly: (state, action: PayloadAction<boolean>) => {
      state.isReadOnly = action.payload;
    },
  },
});

export const { saveForm, resetForm, setReadOnly } = formSlice.actions; // ✅ Make sure all are exported
export default formSlice.reducer;
