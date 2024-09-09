import mongoose from "mongoose";

const bookSchema =new mongoose.Schema({
    name: {type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,rerequired:true},
    image:{type:String,rerequired:true},
    category:{type:String,required:true},
})
const bookModel = mongoose.models.book || mongoose.model("book" ,bookSchema);

export default bookModel;