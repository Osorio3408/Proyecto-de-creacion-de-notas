import { Schema, model, models } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "El titulo es requerido"],
      uniqued: true,
      trim: true,
      maxlenght: [50, "El titulo debe ser menor de 50 caracteres"],
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlenght: [200, "La descripcion debe ser menor a 200 caracteres"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Task || model("Task", taskSchema);
