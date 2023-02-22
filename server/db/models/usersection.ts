
import mongoose from 'mongoose';
import Usersection from '../../../types/Usersection'
const { Schema, model } = mongoose;

const usersection=new Schema<Usersection>({coursenumber:String, sectionnumber:String})

export default usersection;