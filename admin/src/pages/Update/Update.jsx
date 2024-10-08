import React, { useEffect, useState } from "react";
import "../Add/Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const Update = ({ url }) => {
  const params = useParams();

  const navigate = useNavigate()
  const [loading,setLoading] = useState(false)
  const [updating,setUpdating] = useState(false)
  const [currentImage, setCurrentImage] = useState("");
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  useEffect(() => {
    const id = params.id;
    const fetchBook = async () => {
        setLoading(true)
        const { data } = await axios.get(`${url}/api/book/list/${id}`);
        if(data.success){
            setCurrentImage(data.book.image);
            setData({ ...data.book });            
        }else{
            toast.error(data.message);
        }
        setLoading(false)
    };
    fetchBook()
  }, [params]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onSubmitHandler = async (event) => {
    setUpdating(true)
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    const id = params.id;
    const response = await axios.post(`${url}/api/book/update/${id}`, formData);
    if (response.data.success) {
      
      toast.success(response.data.message);
      navigate("/list")
    } else {
      toast.error(response.data.message);
    }
    setUpdating(false)

  };

  if(loading){
    return <>Loading...</>
  }

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          {currentImage && <img src={`${url}/images/${currentImage}`.trim()} alt={data.name} /> }
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            ></img>
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            rows="6"
            placeholder="Write content here"
          />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} >
              <option value="Salad">Fiction</option>
              <option value="Rolls">Non Fiction</option>
              <option value="Desert">Fantasy</option>
              <option value="Sandwich">Mysrty & Thriller</option>
              <option value="Cake">Science Fiction</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="Number"
              placeholder="$20"
            />
          </div>
        </div>
        <button disabled={updating} type="submit" className="add-btn">
          {updating ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default Update;
