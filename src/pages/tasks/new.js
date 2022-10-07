import {
  Button,
  Form,
  FormInput,
  Grid,
  GridColumn,
  GridRow,
} from "semantic-ui-react";
import { useState } from "react";

export default function TaskFormPage() {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = validate();

    if (Object.keys(errors).length) setErrors(errors);

    console.log("Enviando");
  };

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="3"
      style={{ height: "80vh" }}
    >
      <GridRow>
        <GridColumn textAlign="center">
          <h1>Crear Tarea</h1>
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
            ></Form.TextArea>
            <Button secondary>Guardar</Button>
          </Form>
        </GridColumn>
      </GridRow>
    </Grid>
  );
}
