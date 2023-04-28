import { Request, Response } from 'express';
import {  dbGetUserById, dbGetUsersByName, dbGetUserByEmail, dbAddUser, dbDeleteUserByEmail, dbUpdateUserByEmail } from '../model/users.model';
import validateUser from '../util/userValidation';

async function addNewUser(req: Request, res: Response){
    let {name, email, password} = req.body;
    // We should validate the user data here but we still don't know what to validate yet
    if(validateUser({name, email, password}) === false) 
    return res.status(400).json({message: 'Invalid user data'});

    try {
        await dbAddUser({name, email, password});
        return res.status(200).json({message: 'New user added successfully'});
        
    } catch (error) {
        console.log(`User adding error: ${error}`);
        return res.status(500).json({message: 'New user adding failed'});
    }
};

async function removeUser (req: Request, res: Response) {
    let { email} = req.body;
    try {
        await dbDeleteUserByEmail(email);
        return res.status(200).json({message: 'User deleted successfully'});
        
    } catch (error) {
        console.log(`User deletion error: ${error}`);
        return res.status(500).json({message: 'User deletion failed'});
    }
};

async function updateUser (req: Request, res: Response) {
    let { email, update} = req.body;
    update = JSON.parse(update);
    try {
        await dbUpdateUserByEmail({email, update});
        return res.status(200).json({message: 'User updated successfully'});
        
    } catch (error) {
        console.log(`User updating error: ${error}`);
        return res.status(500).json({message: 'User update failed'});
    }
};

async function getUser (req: Request, res: Response) {
    let { id } = req.params;
    try {
        let user = await dbGetUserById(id);
        return res.status(200).json({message: 'User found successfully', user});
        
    } catch (error) {
        console.log(`User finding error: ${error}`);
        return res.status(500).json({message: 'User finding failed'});
    }
};

export {
    getUser,
    addNewUser,
    removeUser,
    updateUser,
}