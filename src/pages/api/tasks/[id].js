import dbConnect from "utils/mongoose";
import Task from "models/Task";

export default async (req, res) => {
  const {
    method,
    body,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        const task = await Task.findById(id);
        if (!task)
          return res.status(404).json({ msg: "La tarea no fue encontrada" });
        return res.status(200).json(task);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }

    case "PUT":
      try {
        const task = await Task.findByIdAndUpdate(id, body, {
          new: true,
        });
        if (!task)
          return res.status(404).json({ msg: "La tarea no fue encontrada" });
        return res.status(200).json(task);
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }

    case "DELETE":
      try {
        const deleteTasks = await Task.findByIdAndDelete(id);
        if (!deleteTasks)
          return res.status(404).json({ msg: "La tarea no fue encontrada" });
        return res.status(204).json();
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }

    default:
      return res.status(400).json({ msg: "este metodo no esta suportado" });
  }
};
