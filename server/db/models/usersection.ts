
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const usersection=new Schema({coursenumber:String, sectionnumber:String})

export default usersection;