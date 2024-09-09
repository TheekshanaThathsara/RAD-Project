import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/book/list`);  // Ensure URL is correct

      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error('Error fetching books');
      }
    } catch (error) {
      toast.error('Error fetching books');
    } finally {
      setLoading(false);
    }
  };

  const removeBook = async (bookId) => {
    try {
      const response = await axios.delete(`${url}/api/book/remove/${bookId}`);

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();  // Fetch the updated list only if the book was successfully removed
      } else {
        toast.error('Error removing book');
      }
    } catch (error) {
      toast.error('Error removing book');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const updateBook =  (id)=>{
    navigate(`/update/${id}`)
  }

  if (loading) {
    return <p>Loading...</p>;  // You can replace this with a proper loading spinner
  }

  return (
    <div className='list add flex-col '>
      <p>All Books List</p>
      <div className='list-table'>
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/${item.image}`} alt={item.name} />  {/* Ensure path is correct */}
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <div>
                <p onClick={() => updateBook(item._id)} className='cursor'>Edit</p>
                <p onClick={() => removeBook(item._id)} className='cursor'>X</p>  
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;




























// import React, { useEffect, useState } from 'react'
// import './List.css'
// import axios from 'axios'
// import {toast} from 'react-toastify'

// const List = ({url}) => {

    
//     const [list,setList] = useState([]);

//     const fetchList = async () =>{
//       const response = await axios.get(`${url}/api/book/list`);
       
//       if(response.data.success){
//         setList(response.data.data);
//       }
//       else
//       {
//         toast.error('Error')
        
//       }
      
//     }

//    const removeBook = async(bookId) =>{
//    const response = await axios.post(`${url}/api/book/remove`,{id:bookId});
//    await fetchList();
//    if(response.data.success){
//     toast.success(response.data.message)

//    }
//    else{
//     toast.error("Error");
//    }
//    }



//     useEffect(()=>{
//       fetchList();

//     },[])

//   return (
//     <div className='list add flex-col '>
//       <p>All Books List</p>
//       <div className='list-table'>
//         <div className='list-table-format title'>
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b>Actio</b>
//         </div>
//         {list.map((item,index)=>{
//           return(
//             <div key={index} className='list-table-format'>
//               <img src ={`${url}/images/`+item.image} alt=''/>
//               <p>{item.name}</p>
//               <p>{item.category}</p>
//               <p>${item.price}</p>
//               <p onClick={()=>removeBook(item._id)} className='cursor'>X</p>

//             </div>
//           )

//         })}
//       </div>

//     </div>
//   )
// }

// export default List

// // import React, { useEffect, useState } from 'react';
// // import './List.css';
// // import axios from 'axios';
// // import { toast } from 'react-toastify';

// // const List = ({ url }) => {
// //   const [list, setList] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   const fetchList = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await axios.get(`${url}/api/book/list`);

// //       if (response.data.success) {
// //         setList(response.data.data);
// //       } else {
// //         toast.error('Error fetching books');
// //       }
// //     } catch (error) {
// //       toast.error('Error fetching books');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const removeBook = async (bookId) => {
// //     try {
// //       const response = await axios.post(`${url}/api/book/remove`, { id: bookId });

// //       if (response.data.success) {
// //         toast.success(response.data.message);
// //         fetchList();  // Fetch the updated list only if the book was successfully removed
// //       } else {
// //         toast.error('Error removing book');
// //       }
// //     } catch (error) {
// //       toast.error('Error removing book');
// //     }
// //   };

// //   useEffect(() => {
// //     fetchList();
// //   }, []);

// //   if (loading) {
// //     return <p>Loading...</p>;  // You can replace this with a proper loading spinner
// //   }

// //   return (
// //     <div className='list add flex-col '>
// //       <p>All Books List</p>
// //       <div className='list-table'>
// //         <div className='list-table-format title'>
// //           <b>Image</b>
// //           <b>Name</b>
// //           <b>Category</b>
// //           <b>Price</b>
// //           <b>Action</b>
// //         </div>
// //         {list.map((item, index) => {
// //           return (
// //             <div key={index} className='list-table-format'>
// //               <img src={`${url}/images/${item.image}`} alt={item.name} />
// //               <p>{item.name}</p>
// //               <p>{item.category}</p>
// //               <p>${item.price}</p>
// //               <p onClick={() => removeBook(item._id)} className='cursor'>X</p>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // };

// // export default List;

