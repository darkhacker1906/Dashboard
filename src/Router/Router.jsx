import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SigninPage from '../pages/SigninPage'
import SignupPage from '../pages/SignupPage'
import Private from './Private'
import HomeDashboard from '../pages/HomeDashboard'
import Products from '../pages/Products'
import Overview from '../pages/Overview'

function Router() {
  return (
    <div>
    <Routes>
      <Route path='/' element={<SigninPage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      {/* <Route path='/dashboard' element={<Private Component={HomeDashboard}/>}>
        <Route path='/dashboard/products' element={<Products/>}/>
      </Route> */}
      <Route path='/dashboard' element={<Private Component={HomeDashboard} />}>
        <Route index element={<Overview />} />
        <Route path='products' element={<Products />} />
        </Route>
      {/* <Route path='/dashboard/products' element={<Products/>}/> */}
    </Routes>
  </div>
  )
}

export default Router