import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface ShipmentState {
  shipments: any[];
  loading: boolean;
  error: string | null;
  filter: {
    id: string;
  };
  currentPage: number;
  lastPage: number;
  hasMore: boolean;
}

const initialState: ShipmentState = {
  shipments: [],
  loading: false,
  error: null,
  filter: { id: '' },
  currentPage: 0,
  lastPage: 1,
  hasMore: true,
};

export const fetchShipmentsAsync = createAsyncThunk(
  'shipment/fetchShipments',
  async (
    params: { page?: number; id?: string } = {},
    { rejectWithValue, getState }
  ) => {
    const token = (getState() as any).auth.token;
    if (!token) return rejectWithValue('Missing token');

    let url = `https://api.dev.kamion.co/api/admin/shipment?page=${
      params.page || 1
    }`;
    if (params.id) url += `&filter[id]=${params.id}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch'
      );
    }
  }
);

const shipmentSlice = createSlice({
  name: 'shipment',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<{ id: string }>) => {
      state.filter = action.payload;
      state.shipments = [];
      state.currentPage = 0;
      state.hasMore = true;
    },
    clearShipments: (state) => {
      state.shipments = [];
      state.currentPage = 0;
      state.hasMore = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShipmentsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShipmentsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.shipments = [...state.shipments, ...action.payload.data];
        state.currentPage = action.payload.meta.current_page;
        state.lastPage = action.payload.meta.last_page;
        state.hasMore =
          action.payload.meta.current_page < action.payload.meta.last_page;
      })
      .addCase(fetchShipmentsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilter, clearShipments, clearError } = shipmentSlice.actions;
export default shipmentSlice.reducer;
