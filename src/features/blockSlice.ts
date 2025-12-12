import { createSlice } from "@reduxjs/toolkit";

interface BlocksState {
  blocks: any[];
}
const initialState: BlocksState = {
  blocks: [],
};

const blockSlice = createSlice({
  name: "blocks",
  initialState,
  reducers: {
    addBlock(state, action) {
      state.blocks.unshift(action.payload);
    },
  },
});

export const { addBlock } = blockSlice.actions;

export default blockSlice.reducer;
