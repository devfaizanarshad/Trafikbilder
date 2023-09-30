/* eslint-disable prettier/prettier */
import React, { Component, Suspense } from 'react'
import { BrowserRouter, HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
// const AllPakages = React.lazy(() => import('./views/pakages/AllPakages'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const AllPakages = React.lazy(() => import('./views/frontPages/pakages/AllPakages'))
// const Home = React.lazy(() => import('./views/frontPages/home/index'))

class App extends Component {
  render() {
    const token = localStorage.getItem('token');
    return (
      <>
        <BrowserRouter>
          <Suspense fallback={loading}>
            <Routes>
              <Route exact path="/auth/login" name="Login Page" element={<Login />} />
              <Route exact path="/auth/signup" name="Register Page" element={<Register />} />
              <Route exact path="/404" name="Page 404" element={<Page404 />} />
              <Route exact path="/500" name="Page 500" element={<Page500 />} />
              <Route
                path="*"
                element={token ? <DefaultLayout /> : <Navigate to="/auth/login" replace />}
              />
              <Route
                path="/"
                element={token ? <AllPakages /> : <Navigate to="/auth/login" replace />}
              />
              <Route exact path="/pakages" name="Pakages" element={<AllPakages />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </>
    )
  }
}

export default App
