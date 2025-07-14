import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Landing } from './pages/Landing'
import { Login } from './pages/Login'
import { SignUp } from './pages/SignUp'
import { Outfitlist } from './pages/Outfitlist'
import { Preference } from './pages/Preference'
import Dashboard from './pages/Dashboard'
import { Measurement } from './pages/Measurement'
import CheckAuth from '@/components/auth'
import Layout from '@/Layout'
import Contact from './pages/Contact'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={
        <CheckAuth protectedRoute={false}>
          <Landing />
        </CheckAuth>} />

      <Route path='outfitlist' element={
        <CheckAuth protectedRoute={true}>
          <Outfitlist />
        </CheckAuth>} />

      <Route path='contact' element={
        <CheckAuth protectedRoute={true}>
          <Contact />
        </CheckAuth>} />

      <Route path='dashboard' element={
        <CheckAuth protectedRoute={true}>
          <Dashboard />
        </CheckAuth>} />

      <Route path='preference' element={
        <CheckAuth protectedRoute={true}>
          <Preference />
        </CheckAuth>} />

      <Route path='measurement' element={
        <CheckAuth protectedRoute={true}>
          <Measurement />
        </CheckAuth>} />

      <Route path='login' element={
        <CheckAuth protectedRoute={false}>
          <Login />
        </CheckAuth>} />
      <Route path='signup' element={
        <CheckAuth protectedRoute={false}>
          <SignUp />
        </CheckAuth>} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

