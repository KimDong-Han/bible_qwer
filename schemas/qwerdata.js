import Mongoose from "mongoose";

// const { Schema } = Mongoose;
const Schema = Mongoose.Schema;

const qwerSchema = new Schema({
  title: { type: String },
  url: { type: String },
  iconImg: { type: String },
  uploadDate: { type: Date },
});

const Qwerdata = Mongoose.model("qwer", qwerSchema);
export default Qwerdata;
