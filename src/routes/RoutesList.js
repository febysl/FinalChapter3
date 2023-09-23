import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TodoSearch } from '../pages/TodoSearch'
import { UpdateTodo } from '../pages/UpdateTodo'

export const RoutesList = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<TodoSearch/>}/>
        <Route path='/update' element={<UpdateTodo/>}/>
    </Routes>
    </BrowserRouter>
  )
}
