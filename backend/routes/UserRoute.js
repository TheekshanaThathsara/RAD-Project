import express from 'express'
import { deleteprofile, getProfileByToken, loginUser,registerUser, updateprofile } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.post("/update",updateprofile)
userRouter.post("/delete",deleteprofile)
userRouter.post("/get-profile-by-token",getProfileByToken)


export default userRouter;