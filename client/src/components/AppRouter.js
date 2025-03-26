import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes'
import { MAIN_ROUTE } from '../utils/consts'
import { useSelector } from 'react-redux'

export default function AppRouter() {

  const { isAuth } = useSelector((state) => {
    return state.employees;
  })
  return (
    <Routes>
      {isAuth && authRoutes.map(({ path, Component }) =>
        <Route key={path} path={path} element={<Component />} exact />
      )}
      {publicRoutes.map(({ path, Component }) =>
        <Route key={path} path={path} element={<Component />} exact />
      )}
      <Route path="*" element={<Navigate to={MAIN_ROUTE} />} />
    </Routes>
  )
}