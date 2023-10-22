/* eslint-disable prettier/prettier */
import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './scss/style.scss'
import './App.css';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const AllPakages = React.lazy(() => import('./views/frontPages/pakages/AllPakages'))
const Home = React.lazy(() => import('./views/frontPages/home/Home'))
const About = React.lazy(() => import('./views/frontPages/about/About'))
const Contact = React.lazy(() => import('./views/frontPages/contact/Contact'))
const Videos = React.lazy(() => import('./views/frontPages/videos/Videos'))
const DetailOfImage = React.lazy(() => import('./views/frontPages/imageDetail/DetailOfImage'))
const DetailOfVideo = React.lazy(() => import('./views/frontPages/videoDetail/DetailOfVideo'))

class App extends Component {
  render() {
    const token = localStorage.getItem('token');
    return (
      <>
        <BrowserRouter>
          <Suspense fallback={loading}>
            <Routes>
              <Route path="/home" name="Home Page" element={token ? <Home /> : <Navigate to="/auth/login" replace />} exact={true} />
              <Route path="/videos" name="Videos Page" element={token ? <Videos /> : <Navigate to="/auth/login" replace />} exact={true} />
              <Route path="/about" name="About Page" element={token ? <About /> : <Navigate to="/auth/login" replace />} exact={true} />
              <Route path="/contactUs" name="Contact Page" element={token ? <Contact /> : <Navigate to="/auth/login" replace />} exact={true} />
              <Route path="/videos" name="Videos Page" element={token ? <Videos /> : <Navigate to="/auth/login" replace />} exact={true} />
              <Route path="/404" name="Page 404" element={token ? <Home /> : <Navigate to="/auth/login" replace />} exact={true} />
              <Route path="/500" name="Page 500" element={token ? <Home /> : <Navigate to="/auth/login" replace />} exact={true} />
              <Route path="/customer/dashboard" name="All Pakages" element={token ? <AllPakages /> : <Navigate to="/auth/login" replace />} exact={true} />
              <Route path="/detailOfImage/:id" name="Detail Of Image" element={token ? <DetailOfImage /> : <Navigate to="/auth/login" replace />} exact={true} />
              <Route path="/detailOfVideo/:id" name="Detail Of Video" element={token ? <DetailOfVideo /> : <Navigate to="/auth/login" replace />} exact={true} />
              <Route path="/auth/login" name="Login Page" element={<Login />} />
              <Route path="/auth/signup" name="Register Page" element={<Register />} />
              {/* <Route exact path="/videos" name="Videos Page" element={<Videos />} />
              <Route exact path="/about" name="About Page" element={<About />} />
              <Route exact path="/contactUs" name="Contact Page" element={<Contact />} />
              <Route exact path="/auth/login" name="Login Page" element={<Login />} />
              <Route exact path="/auth/signup" name="Register Page" element={<Register />} />
              <Route exact path="/404" name="Page 404" element={<Page404 />} />
              <Route exact path="/500" name="Page 500" element={<Page500 />} />
              <Route exact path="/customer/dashboard" name="All Pakages" element={<AllPakages />} />
              <Route exact path="/detailOfImage/:id" name="Detail Of Image" element={<DetailOfImage />} />
              <Route exact path="/detailOfVideo/:id" name="Detail Of Video" element={<DetailOfVideo />} /> */}
              <Route
                path="*"
                element={token ? <DefaultLayout /> : <Navigate to="/auth/login" replace />}
              />
              {/* <Route
                path="/"
                element={token ? <AllPakages /> : <Navigate to="/auth/login" replace />}
              /> */}
              <Route
                path="/"
                element={token ? <Home /> : <Navigate to="/auth/login" replace />}
              />
              {/* <Route exact path="/pakages" name="Pakages" element={<AllPakages />} /> */}
            </Routes>
          </Suspense>
        </BrowserRouter>
      </>
    )
  }
}

export default App
