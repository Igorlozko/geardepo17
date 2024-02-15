import mongoose from "mongoose";

// this is the model for the reservation 

const reservationSchema = mongoose.Schema({
    //urId:{type:String, required:true},
    resId:{type: String,required: true},
    startDate:{type: String,required: true},
    endDate:{type: String,required: true},
    phone:{type: String,required: true},
    purpose: {type: String,required: true},
    addinfo:{type: String,required: true},
    totealPrice:{type: Number,min:0, max:10000, default:0}
},
{timestamps:true}
)

// creating the model
const Reservation = mongoose.model('reservations', reservationSchema) // named colledction to reservations and passing shcema 

export default Reservation