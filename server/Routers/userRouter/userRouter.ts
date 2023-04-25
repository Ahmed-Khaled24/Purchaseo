import {Router, Request, Response} from 'express';
import { mysqlConnection } from '../../service/mysql2';
import { RowDataPacket } from 'mysql2';
import {addNewUser, getUser, removeUser, updateUser} from '../../controller/userRouter.controller';
const userRouter = Router();



userRouter.get('/:id', getUser);
userRouter.route('/')
.post(addNewUser)
.delete(removeUser)
.put(updateUser)





export default userRouter;