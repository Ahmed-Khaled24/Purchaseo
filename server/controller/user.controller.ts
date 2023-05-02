import { Request, Response } from 'express';
import {  dbGetUserById, dbGetUsersByName, dbGetUserByEmail, dbAddUser, dbDeleteUserByEmail, dbUpdateUserByEmail } from '../model/users.model';
import ErrorWithStatusCode from '../util/classes/ErrorWithStatusCode';
import validateUser from '../util/userValidation';

async function addNewUser(req: Request, res: Response){
    let {name, email, password} :{name:string, email:string, password:string}= req.body;
    // TODO: validate user data
    if(validateUser({name, email, password}) === false) 
    return res.status(400).json({status:"failure", data: 'Invalid user data'});

    // TODO: hash password

    try {
        await dbAddUser({name, email, password});
        return res.status(200).json({status:"success", data: 'New user added successfully'});
        
    } catch (error: ErrorWithStatusCode|any) {
        console.log(`User adding error: ${error}`);
        return res.status(error.statusCode || 500).json({status:'failure' ,data: error.message});
    }
};

async function removeUser (req: Request, res: Response) {
    let {email} = req.body;
    try {
        await dbDeleteUserByEmail(email);
        return res.status(200).json({status:"success", data: 'User deleted successfully'});
        
    } catch (error: ErrorWithStatusCode|any) {
        console.log(`User deletion error: ${error}`);
        return res.status(error.statusCode || 500).json({status:'failure' ,data: error.message});
    }
};

async function updateUser (req: Request, res: Response) {
    let { email, update} = req.body;
    //update = JSON.parse(update);
    try {
        await dbUpdateUserByEmail({email, update});
        return res.status(200).json({status:"success", data: 'User updated successfully'});
        
    } catch (error: ErrorWithStatusCode|any) {
        console.log(`User updating error: ${error}`);
        return res.status(error.statusCode || 500).json({status:'failure' ,data: error.message});
    }
};

async function getUser (req: Request, res: Response) {
    let { id } = req.params;
    try {
        let user = await dbGetUserById(id);
        return res.status(200).json({status:"success", data: user});
        
    } catch (error: ErrorWithStatusCode|any) {
        console.log(`User finding error: ${error}`);
        return res.status(error.statusCode || 500).json({status:'failure' ,data: error.message});
    }
};

export {
    getUser,
    addNewUser,
    removeUser,
    updateUser,
}