import { dbConnect } from "utils/mongoose";
import Task from "models/Task";

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const tasks = await Task.find();
        console.log(tasks.length);
        return tasks.length === 0
          ? res.status(200).json({ message: "no hay eventos" })
          : res.status(200).json(tasks);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    case "POST":
      try {
        const newTask = new Task(body);
        const savedTask = await newTask.save();
        return res.status(201).json(savedTask);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ error: "Este método no se soporta" });
  }
}
