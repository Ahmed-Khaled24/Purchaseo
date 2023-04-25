import {Router, Request, Response} from 'express';
import {addNewUser, getUser, removeUser, updateUser} from '../controller/user.controller';

const userRouter = Router();


userRouter.get('/:id', getUser);
userRouter.route('/')
.post(addNewUser)
.delete(removeUser)
.put(updateUser)


export default userRouter;