import React, { useContext,useEffect, useState } from 'react'
import './UserProfile.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets'
 

const UserProfile = () => {

    const [profile, setProfile] = useState({
        // name:
        // // id:
        // academicPosition: 
        // email: 
        // contactNo: 
      });
    
      const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Profile updated:', profile);
      };


     const {url,token} = useContext(StoreContext)
     const [data,setData] =useState([]);
 
     const fetchOrders = async () =>{
         const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
         setData(response.data.data);
          
}

useEffect(()=>{
    if(token){
        fetchOrders();
    }
},[token])



  return (
    <div className='my-orders'>
      {/* <h2>User Profile</h2> */}
      {/* <div className='container'>
        {data.map((order,index)=>{
          return (
            <div key ={index} className='my-orders-order'>
              <img src={assets.parcel_icon} alt=''/> 
              <p>{order.items.map((item,index)=>{
                if(index ===order.items.length-1){
                  return item.name+" x "+item.quantity
                }
                else{
                  return item.name+" x "+item.quantity+", "
                }
                 
              })}</p>
              <p>${order.amount}.00</p>
              <p>Item:{order.items.length}</p>
              <p><span>&#x25cf;</span><b>{order.status}</b></p>
              <button onClick={fetchOrders}>Track order</button>
              </div> */}
          {/* )
        })} */}
      {/* </div> */}

  

    <div className="profile-container">
      <h1 className="page-title">User Profile</h1>
      <div className="profile-header">
       
        <div className="profile-info">
          <h2>{profile.name}</h2>
          <p>{profile.email}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            id="id"
            name="id"
            value={profile.id}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="academicPosition">Academic Position</label>
          <input
            type="text"
            id="academicPosition"
            name="academicPosition"
            value={profile.academicPosition}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactNo">Contact No</label>
          <input
            type="tel"
            id="contactNo"
            name="contactNo"
            value={profile.contactNo}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="save-button">Save Changed</button>
      </form>
    </div>
  </div>
  )
}

export default UserProfile
