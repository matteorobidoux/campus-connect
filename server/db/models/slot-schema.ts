import mongoose from 'mongoose';

const {Schema, model} = mongoose;

const slotSchema = new Schema({
    day: String,
    startTime: String,
    duration: Number,
    classroom: String
}, {collection: 'Slots'});

const Slot = model('Slot', slotSchema);
export default Slot;