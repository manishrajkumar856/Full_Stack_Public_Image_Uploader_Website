import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from '../pages/LoginPage.jsx'
import SignupPage from '../pages/SignupPage.jsx'
import HomePage from '../pages/HomePage.jsx'
import UploadPage from '../pages/UploadPage.jsx'
import DescriptionImgPage from '../pages/DescriptionImgPage.jsx'
import Favourite from '../pages/Favourite.jsx'
import ProfilePage from '../pages/ProfilePage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage />},
      { path: '/login', element: <LoginPage />},
      { path: '/signup', element: <SignupPage />},
      { path: '/upload', element: <UploadPage />},
      { path: '/post/singlepost/:id', element: <DescriptionImgPage />},
      { path: '/favourites', element: <Favourite />},
      { path: '/profile', element: <ProfilePage/>}
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} ></RouterProvider>
  </StrictMode>,
)
