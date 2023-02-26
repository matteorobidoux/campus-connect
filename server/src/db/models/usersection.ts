
import mongoose from 'mongoose';
import UserSection from '../../../../types/Usersection'
const { Schema, model } = mongoose;

const usersection=new Schema<UserSection>({coursenumber:String, sectionnumber:String})

export default usersection;
