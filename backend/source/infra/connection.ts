import mongoose from 'mongoose';

const connection = mongoose.connect('mongodb://localhost:27017/movies', { useNewUrlParser: true });

export default connection;
