/* eslint-disable prettier/prettier */
import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// Admin Panel Pages //
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const NewCategory = React.lazy(() => import('./views/category/add/NewCategory'))
const CategoriesList = React.lazy(() => import('./views/category/list/CategoriesList'))
const UpdateCategory = React.lazy(() => import('./views/category/update/UpdateCategory'))
const AddImage = React.lazy(() => import('./views/Images/add/AddImage'))
const ImagesList = React.lazy(() => import('./views/Images/list/ImagesList'))
const UpdateImage = React.lazy(() => import('./views/Images/update/UpdateImage'))
const CustomersList = React.lazy(() => import('./views/customer/list/CustomersList'))
const AddSubcription = React.lazy(() => import('./views/subscription/add/AddSubcription'))
const SubscriptionsList = React.lazy(() => import('./views/subscription/list/SubscriptionsList'))
const UpdateSubscription = React.lazy(() => import('./views/subscription/update/UpdateSubscription'))
const AllPaymentRequests = React.lazy(() => import('./views/subscription/paymentRequest/AllPaymentRequests'))
const AddVideo = React.lazy(() => import('./views/video/add/AddVideo'))
const VideosList = React.lazy(() => import('./views/video/list/VideosList'))
const UpdateVideo = React.lazy(() => import('./views/video/update/UpdateVideo'))
// Front Pages //
const Login = React.lazy(() => import('./views/pages/login/Login'))
const AllPakages = React.lazy(() => import('./views/frontPages/pakages/AllPakages'))

const token = localStorage.getItem('token');

const routes = [
  { path: '/', name: 'Home', element: AllPakages, exact: true },
  { path: '/dashboard', element: token ? (Dashboard) : (<Navigate to="/auth/login" replace />), exact: true },
  { path: '/category/add', element: token ? (NewCategory) : (<Navigate to="/auth/login" replace />), name: 'Add Category', exact: true },
  { path: '/category/list', element: token ? (CategoriesList) : (<Navigate to="/auth/login" replace />), name: 'Categories List', exact: true },
  { path: '/category/update/:id', element: token ? (UpdateCategory) : (<Navigate to="/auth/login" replace />), name: 'Update Category', exact: true },
  { path: '/image/add', element: token ? (AddImage) : (<Navigate to="/auth/login" replace />), name: 'Add Image', exact: true },
  { path: '/image/list', element: token ? (ImagesList) : (<Navigate to="/auth/login" replace />), name: 'Images List', exact: true },
  { path: '/image/update/:id', element: token ? (UpdateImage) : (<Navigate to="/auth/login" replace />), name: 'Update Image', exact: true },
  { path: '/subscription/add', element: token ? (AddSubcription) : (<Navigate to="/auth/login" replace />), name: 'Add Subscription', exact: true },
  { path: '/subscription/list', element: token ? (SubscriptionsList) : (<Navigate to="/auth/login" replace />), name: 'Subscriptions List', exact: true },
  { path: '/subscription/update/:id', element: token ? (UpdateSubscription) : (<Navigate to="/auth/login" replace />), name: 'Update Subscription', exact: true },
  { path: '/paymentRequest/list', element: token ? (AllPaymentRequests) : (<Navigate to="/auth/login" replace />), name: 'All Payment Requests', exact: true },
  { path: '/customer/list', element: token ? (CustomersList) : (<Navigate to="/auth/login" replace />), name: 'Customers List', exact: true },
  { path: '/video/add', element: token ? (AddVideo) : (<Navigate to="/auth/login" replace />), name: 'Add Video', exact: true },
  { path: '/video/list', element: token ? (VideosList) : (<Navigate to="/auth/login" replace />), name: 'Videos List', exact: true },
  { path: '/video/update/:id', element: token ? (UpdateVideo) : (<Navigate to="/auth/login" replace />), name: 'Update Video', exact: true },

  // { path: '/category/add', name: 'Add Category', element: NewCategory, exact: true },
  // { path: '/category/list', name: 'Categories List', element: CategoriesList, exact: true },
  // { path: '/category/update/:id', name: 'Update Category', element: UpdateCategory, exact: true },
  // { path: '/image/add', name: 'Add Image', element: AddImage, exact: true },
  // { path: '/image/list', name: 'Images List', element: ImagesList, exact: true },
  // { path: '/image/update/:id', name: 'Update Image', element: UpdateImage, exact: true },
  // { path: '/subscription/add', name: 'Add Subscription', element: AddSubcription, exact: true },
  // { path: '/subscription/list', name: 'Subscriptions List', element: SubscriptionsList, exact: true },
  // { path: '/subscription/update/:id', name: 'Update Subscription', element: UpdateSubscription, exact: true },
  // { path: '/paymentRequest/list', name: 'All Payment Requests', element: AllPaymentRequests, exact: true },
  // { path: '/customer/list', name: 'Customers List', element: CustomersList, exact: true },
  // { path: '/video/add', name: 'Add Video', element: AddVideo, exact: true },
  // { path: '/video/list', name: 'Videos List', element: VideosList, exact: true },
  // { path: '/video/update/:id', name: 'Update Video', element: UpdateVideo, exact: true },
]

export default routes
