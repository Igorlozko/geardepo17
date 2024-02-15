import Reservation from "../models/Reservation";
import tryCatch from "./utils/tryCatch";

// add the start nd end date 

export const createReservation  = tryCatch(async(req, res) =>{
    const {id:resId} = req.user
    const newReservation = new Reservation({...req.body,resId})
    await newReservation.save() // save to the database 
    res.status(201).json({success:true, result:newReservation })
});