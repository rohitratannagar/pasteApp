import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

const initialState = {
  value: localStorage.getItem('pastes')
    ? JSON.parse(localStorage.getItem('pastes'))
    : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload
      state.value.push(paste)
      localStorage.setItem('pastes', JSON.stringify(state.value))
      toast.success('Paste created successfully')
    },

    updateToPastes: (state, action) => {
      const updated = action.payload
      const index = state.value.findIndex(p => p.id === updated.id)
      if (index !== -1) {
        
        state.value[index] = updated
        localStorage.setItem('pastes', JSON.stringify(state.value))
        toast.success('Paste updated')
      }
    },

    resetAllPastes: (state) => {
      state.value = []
      localStorage.removeItem('pastes')
      toast.success('All pastes cleared')
    },

    removeFromPastes: (state, action) => {
      const id = action.payload
      state.value = state.value.filter(p => p._id !== id)
      localStorage.setItem('pastes', JSON.stringify(state.value))
      toast.success('Paste removed')
    }
  }
})

export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions
export default pasteSlice.reducer
