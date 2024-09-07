import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import './Banner.css';

const Banner = ({ url }) => {
   const [image, setImage] = useState(null);
   const [banners, setBanners] = useState([]);
   const [isEditing, setIsEditing] = useState(false);
   const [selectedBanner, setSelectedBanner] = useState(null);
   const [data, setData] = useState({
      title: '',
      subtitle: '',
      link: ''
   });

   useEffect(() => {
      fetchBanners();
   }, []);

   const fetchBanners = async () => {
      try {
         const {data} = await axios.get(`${url}/api/banner/list`);         
         setBanners(data.data);
      } catch (error) {
         console.log(error);
         
         toast.error('Failed to fetch banners. Please try again later.');
      }
   };

   const onChangeHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData(data => ({ ...data, [name]: value }));
   };

   const onSubmitHandler = async (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("subtitle", data.subtitle);
      formData.append("link", data.link);
      if (image) {
         formData.append("image", image);
      }

      try {
         if (isEditing && selectedBanner) {
            // Update existing banner
            
            const response = await axios.post(`${url}/api/banner/update/${selectedBanner._id}`, formData);

            if (response.data.success) {
               toast.success(response.data.message);
               fetchBanners(); // Refresh banners list
            } else {
               toast.error(response.data.message);
            }
         } else {
            // Create new banner
            const response = await axios.post(`${url}/api/banner/add`, formData);
            if (response.data.success) {
               toast.success(response.data.message);
               fetchBanners(); // Refresh banners list
            } else {
               toast.error(response.data.message);
            }
         }
         resetForm();
      } catch (error) {
         console.log(error);
         
         toast.error('Failed to save banner. Please try again later.');
      }
   };

   const onDeleteHandler = async (bannerId) => {
      try {
         const response = await axios.delete(`${url}/api/banner/remove/${bannerId}`);
         if (response.data.success) {
            toast.success(response.data.message);
            fetchBanners(); // Refresh banners list
         } else {
            toast.error(response.data.message);
         }
      } catch (error) {
         console.log(error);
         
         toast.error('Failed to delete banner. Please try again later.');
      }
   };

   const onEditHandler = (banner) => {
      setIsEditing(true);
      setSelectedBanner(banner);
      setData({
         title: banner.title,
         subtitle: banner.subtitle,
         link: banner.link
      });
      setImage(null); // Optional: Set to the existing image if you want
   };

   const resetForm = () => {
      setData({
         title: '',
         subtitle: '',
         link: ''
      });
      setImage(null);
      setIsEditing(false);
      setSelectedBanner(null);
   };

   return (
      <div className='banner-management'>
         <form className='flex-col' onSubmit={onSubmitHandler}>
            <h3>{isEditing ? 'Edit Banner' : 'Create New Banner'}</h3>
            <div className='banner-img-upload flex-col'>
               <p>Upload Banner Image</p>
               <label htmlFor='image'>
                  <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt='' />
               </label>
               <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type='file'
                  id='image'
                  hidden={!isEditing}
                  required={!isEditing}
               />
            </div>
            <div className='banner-title flex-col'>
               <p>Banner Title</p>
               <input
                  onChange={onChangeHandler}
                  value={data.title}
                  type='text'
                  name='title'
                  placeholder='Enter title here'
               />
            </div>
            <div className='banner-subtitle flex-col'>
               <p>Banner Subtitle</p>
               <input
                  onChange={onChangeHandler}
                  value={data.subtitle}
                  type='text'
                  name='subtitle'
                  placeholder='Enter subtitle here'
               />
            </div>
            <div className='banner-link flex-col'>
               <p>Optional Link</p>
               <input
                  onChange={onChangeHandler}
                  value={data.link}
                  type='text'
                  name='link'
                  placeholder='Enter link (optional)'
               />
            </div>
            <button type='submit' className='add-banner-btn'>
               {isEditing ? 'UPDATE BANNER' : 'CREATE BANNER'}
            </button>
            {isEditing && (
               <button onClick={resetForm} className='cancel-edit-btn'>
                  CANCEL
               </button>
            )}
         </form>

         <div className='banner-list'>
            <h3>Existing Banners</h3>
            {banners.map(banner => (
               <div key={banner._id} className='banner-item'>
                  <img src={`${url}/images/${banner.image}`} alt={banner.title} />
                  <div className='banner-info'>
                     <h4>{banner.title}</h4>
                     <p>{banner.subtitle}</p>
                     <p>{banner.link || 'N/A'}</p>
                     <button onClick={() => onEditHandler(banner)} className='edit-btn'>
                        EDIT
                     </button>
                     <button onClick={() => onDeleteHandler(banner._id)} className='delete-btn'>
                        DELETE
                     </button>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Banner;
