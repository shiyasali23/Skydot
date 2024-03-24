import React, { useEffect } from 'react'
import NavBar from '../Components/NavBar'
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {

  const navigate= useNavigate()

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/");
    }
  },);

  return (
    <div className='dashboard-page'>
        <NavBar/>
      
    </div>
  )
}

export default DashboardPage
