/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilEnvelopeOpen } from '@coreui/icons'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    // Frontend validation
    if (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'All fields are required',
      })
      return
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Invalid email format',
      })
      return
    }

    // If all validations pass, proceed with the API call
    const formData = {
      email,
      password,
    }

    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/user/login`, formData)
      .then((response) => {
        if (response.data.status === 200) {
          if (response.data.token) {
            // Store the token in local storage
            localStorage.setItem('token', response.data.token);
          }
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.data.message,
          })
          // console.log('Data: ' + response.data.data)
          // console.log('Role: ' + response.data.data.role)
          if (response.data.data.role === 0) {
            // console.log('Role: ' + response.data.data.role)
            navigate('/dashboard')
          }
          if (response.data.data.role === 1) {
            navigate('/')
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.data.message,
          })
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response ? error.response.data.message : 'An error occurred',
        })
      })
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol xs={12} lg={9} sm={8} md={9}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm method="post" onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilEnvelopeOpen} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        autoComplete="Email"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={12} sm={6}>
                        <CButton
                          type="submit"
                          className="w-100"
                          style={{
                            color: '#fff',
                            backgroundColor: '#D4AF37',
                            border: 'none',
                            fontWeight: 'bold',
                          }}
                        >
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white py-5"
                style={{ width: '100%', backgroundColor: '#D4AF37' }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      At Trafikbilder, explore 30 captivating image categories, with exclusive
                      access for Pre-paid users and powerful tools for Administrators. Join us for a
                      visual adventure today.
                    </p>
                    <Link to="/auth/signup">
                      <CButton
                        className="mt-3"
                        active
                        tabIndex={-1}
                        style={{
                          color: '#D4AF37',
                          backgroundColor: '#fff',
                          border: 'none',
                          fontWeight: 'bold',
                        }}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
