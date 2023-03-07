import mongoose, { Schema } from "mongoose";



const ListaPresenteSchema = new Schema({
  nome: {
    type: String,
    required: false
  },
  presente: {
    type: String,
    required: true
  },

  quantidade: {
    type: Number,
    default: 1
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ListaPresenteModel = mongoose.models.ListaPresentes || mongoose.model("ListaPresentes", ListaPresenteSchema);

export default ListaPresenteModel;