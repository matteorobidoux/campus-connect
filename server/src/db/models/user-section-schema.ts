import mongoose from 'mongoose';
import { UserClassSection } from '../../../../types/UserClassSection'
const { Schema } = mongoose;

const userClassSectionSchema = new Schema<UserClassSection>({courseNumber:String, sectionNumber:String})

export { userClassSectionSchema };
