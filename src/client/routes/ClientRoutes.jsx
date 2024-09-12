import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ClientPage } from '../pages/ClientPage'
import { ActivosForm } from '../components/activos/ActivosForm'
import { ClientLayout } from '../layout/ClientLayout'
import { ActivosList } from '../components/activos/ActivosList'
import { ActivosEditForm } from '../components/activos/ActivosEditForm'

export const ClientRoutes = () => {
  return (
    <ClientLayout>
      <Routes>
        <Route path="/" element={<ClientPage />} />
        <Route path="/*" element={<Navigate to="/" />} />
        <Route path="/activos/form" element={<ActivosForm />} />
        <Route path="/activos/list" element={<ActivosList />} />
        <Route path="/edit" element={<ActivosEditForm />} />

      </Routes>
    </ClientLayout>
  )
}
