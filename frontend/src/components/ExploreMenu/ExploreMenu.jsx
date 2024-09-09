import React from 'react'
import './Exploremenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore Our Collection</h1>
        <p className='explore-menu-text'>Dive into a diverse selection of books featuring an expansive range of genres. 
            Our mission is to fulfill your literary cravings and elevate your reading experience, one captivating book at a time.</p> 
        <div className='explore-menu-list'>
            {menu_list.map((item,index)=>{
                return(
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                        <img className ={category===item.menu_name?"active":""}   src={item.menu_image} alt=''/>
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr/>
    </div>
  )
}

export default ExploreMenu
