import {
  Button,
  Form,
  FormInput,
  Grid,
  GridColumn,
  GridRow,
} from "semantic-ui-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function TaskFormPage() {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });

  const { query, push } = useRouter();

  const [errors, setErrors] = useState({});

  //Funcion para validar los campos

  const validate = () => {
    const errors = {};

    if (!newTask.title) errors.title = "El titulo es requerido";
    if (!newTask.description)
      errors.description = "La descripcion es requerida";
    return errors;
  };

  //Funcion para enviar los datos

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();

    if (Object.keys(errors).length) return setErrors(errors);

    if (query.id) {
      await updateTask();
    } else {
      await createTask();
    }
    await push("/");
  };

  const createTask = async () => {
    try {
      await fetch("https://proyecto-tareas-nextjs.vercel.app/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async () => {
    try {
      await fetch(
        "https://proyecto-tareas-nextjs.vercel.app/tasks" + query.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const getTask = async () => {
    const res = await fetch(
      "https://proyecto-tareas-nextjs.vercel.app/tasks" + query.id
    );
    const data = await res.json();
    setNewTask({ title: data.title, description: data.description });
  };

  useEffect(() => {
    if (query.id) getTask();
  });

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="3"
      style={{ height: "80vh" }}
    >
      <GridRow>
        <GridColumn textAlign="center">
          <h1>{query.id ? "Editar tarea" : "Crear Tarea"}</h1>
          <Form onSubmit={handleSubmit}>
            <FormInput
              label="Titulo"
              placeholder="Titulo.."
              name="title"
              onChange={handleChange}
              error={
                errors.title
                  ? {
                      content: "Por favor ingrese un titulo",
                      pointing: "below",
                    }
                  : null
              }
              value={newTask.title}
            ></FormInput>
            <Form.TextArea
              label="Descripcion"
              placeholder="Decripcion..."
              name="description"
              onChange={handleChange}
              error={
                errors.description
                  ? {
                      content: "Por favor ingrese una descripcion",
                      pointing: "below",
                    }
                  : null
              }
              value={newTask.description}
            ></Form.TextArea>
            <Button secondary>{query.id ? "Editar" : "Guardar"}</Button>
          </Form>
        </GridColumn>
      </GridRow>
    </Grid>
  );
}
