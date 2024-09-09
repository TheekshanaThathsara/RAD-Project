import React, { useState } from 'react'
import AppDownload from '../../components/AppDownload/AppDownload'
import BannerItem from '../../components/BannerDisplay/BannerDisplay'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import Header from '../../components/Header/Header'
import './Home.css'
import BookDisplay from '../../components/BookDisplay/BookDisplay'
 
 const Home = () => {

      const[category,setCategory] = useState("All");

   return (
     <div>
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory}/>
        <BookDisplay category={category}/>
        <BannerItem category={category}/>
        <AppDownload/>
     </div>
   )
 }
 
 export default Home
 