import React, { useContext, useEffect, useState } from 'react'
import "./Update.css"
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { SERVER_URL } from '../../global'

const Update = () => {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const { token } = useContext(StoreContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) return;
    const fetchDatafromBackend = async () => {
      setLoading(true)
      try {
        const { data } = await axios.post(`${SERVER_URL}/api/user/get-profile-by-token`, {
          token
        })
        setEmail(data.email)
        setName(data.name)
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false)
      }
    }
    fetchDatafromBackend()
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${SERVER_URL}/api/user/Update`, {
        name, email
      })
      alert("Profile updated")
      navigate('/UserProfile')
    } catch (error) {
      alert(error)
    }
  }

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <>

      <h1>Update profile</h1>
      <div className='profile-update'>
        <form >
       
        </form>
        <form onSubmit={handleSubmit} className='profile-update-inner' >

          <h2>Name</h2>
          <label htmlFor="html">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter new name" />
          </label>

          <button type='submit' >Update</button>
        </form>
      </div>
    </>
  )
}

export default Update