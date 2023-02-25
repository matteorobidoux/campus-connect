
import mongoose from 'mongoose';
import UserSection from '../../../../types/Usersection'
const { Schema, model } = mongoose;

const usersection=new Schema<UserSection>({courseNumber:String, sectionNumber:String})

export default usersection;
