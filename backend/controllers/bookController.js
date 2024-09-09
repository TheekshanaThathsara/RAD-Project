
import bookModel from "../models/bookModel.js";
import fs from "fs";
import path from "path";

// Add Book Item
const addBook = async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "Image file is required" });
  }

  let image_filename = req.file.filename;

  const book = new bookModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await book.save();
    res.json({ success: true, message: "Book Added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding the book" });
  }
};

// All Book List
const listBook = async (req, res) => {
  try {
    const books = await bookModel.find({});
    res.json({ success: true, data: books });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error retrieving book list" });
  }
};

// Get One Book
const getBook = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await bookModel.findById(id);
    res.json({ success: true, book });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error retrieving book list" });
  }
};

// Remove Book Item
const removeBook = async (req, res) => {
  try {
    const book = await bookModel.findById(req.params.id);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    // Remove the image associated with the book
    const imagePath = path.join(process.cwd(), "uploads", book.image);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(`Error deleting image: ${err}`);
      }
    });

    // Remove the book from the database
    await bookModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Book Removed" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error removing the book" });
  }
};

const updateBook = async (req,res) => {
  try {
    const id = req.params.id;
    const currentBook = await bookModel.findById(id);
    if (!currentBook) {
      res.status(404).json({ success: false, message: "Book not found!" });
      return;
    }
    let image_filename = req.file.filename;
    await currentBook.updateOne({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });    
    res
      .status(200)
      .json({ success: true, message: "Book updated!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error updating the book" });
  }
};

export { addBook, listBook, removeBook, updateBook,getBook };
