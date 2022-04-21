import HttpStatus from 'http-status-codes';
import { client } from '../config/redis.js';


export const redis_cached_data = async (req, res, next) => {
     const data = await client.get('allNotes');
     console.log("here is redis data", data);
    if (data == null) {
            next();
    } 
    else
    {
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data : JSON.parse(data),
             Message : "All notes are fetched Successfully by redis cache."
        })   
    }
 
}