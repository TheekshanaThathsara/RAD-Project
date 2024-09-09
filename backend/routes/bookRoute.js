// import express from "express"
// import { addBook,listBook,removeBook} from "../controllers/bookController.js"
// import multer from "multer"

// const bookRouter = express.Router();
// // Image Storage Engine

// const storage = multer.diskStorage({
//     destination:"uploads",
//     filename:(req,file,cb)=>{
//         return cb(null,`${Date.now()}${file.originalname}`)

//     }

// })

// const upload = multer({storage:storage})


// bookRouter.post("/add",upload.single("image"),addBook)
// bookRouter.get("/list/:id",listBook)
// bookRouter.post("/remove/:id",removeBook);




// export default bookRouter;

import express from "express";
import multer from "multer";
import { addBook, getBook, listBook, removeBook,updateBook  } from "../controllers/bookController.js";

const bookRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Banner Routes
bookRouter.post("/add", upload.single("image"), addBook);
bookRouter.get("/list", listBook);
bookRouter.delete("/remove/:id", removeBook);
bookRouter.post("/update/:id",upload.single("image"), updateBook);
bookRouter.get("/list/:id", getBook);

export default bookRouter;



