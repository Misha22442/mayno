import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/axios';

// ------------------------------------------------------------------
// АСИНХРОННІ THUNKS (Екшени)
// ------------------------------------------------------------------

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
    const { data } = await axios.get('/items');
    return data;
});

export const addItem = createAsyncThunk('items/addItem', async (item) => {
    // Встановлюємо роль 'admin' у хедері для дозволу CREATE на бекенді
    const response = await axios.post('/items', item, {
        headers: { role: 'admin' }
    });
    return response.data;
});

export const deleteItem = createAsyncThunk('items/deleteItem', async (id) => {
    // Встановлюємо роль 'admin' у хедері для дозволу DELETE на бекенді
    await axios.delete(`/items/${id}`, {
        headers: { role: 'admin' }
    });
    return id;
});

// ⭐ ДОПОВНЕННЯ: Асинхронний екшн для оновлення майна (UPDATE)
export const updateItem = createAsyncThunk(
    'items/updateItem', 
    async (itemData) => {
        // itemData має містити { _id, ...оновлені_поля }
        const { _id, ...fieldsToUpdate } = itemData;
        
        const response = await axios.put(`/items/${_id}`, fieldsToUpdate, {
            headers: { role: 'admin' }
        });
        return response.data; // Повертає оновлений об'єкт
    }
);


// ------------------------------------------------------------------
// SLICE ТА REDUCERS
// ------------------------------------------------------------------

const itemsSlice = createSlice({
    name: 'items',
    initialState: { list: [], status: 'idle' },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // READ: Отримати всі
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.list = action.payload;
                state.status = 'succeeded';
            })
            // CREATE: Додати новий
            .addCase(addItem.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            // DELETE: Видалити
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.list = state.list.filter(item => item._id !== action.payload);
            })
            
            .addCase(updateItem.fulfilled, (state, action) => {
                const updatedItem = action.payload;
                // Знаходимо індекс старого елемента за його _id
                const index = state.list.findIndex(item => item._id === updatedItem._id);
                
                if (index !== -1) {
                    // Замінюємо старий елемент новим, оновленим об'єктом
                    state.list[index] = updatedItem;
                }
            })
            .addCase(updateItem.rejected, (state, action) => {
                console.error('Error updating item:', action.error.message);
            });
    }
});

export default itemsSlice.reducer;