import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Page1 from './components/Page1/Page1.tsx'
import Home from './components/Home/Home.tsx'
import Game from './components/Game/Game.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index element={<Home />} />
      <Route path='/pg1' element={<Page1/>}/>
      <Route path='/game' element={<Game/>} />
    </Route>
  )
)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
