import React from "react";
import { Button, Card, Container, Grid, GridColumn } from "semantic-ui-react";
import { useRouter } from "next/router";

export default function HomePage({ tasks }) {
  const router = useRouter();

  if (tasks.length === 0)
    return (
      <Grid
        centered
        verticalAlign="middle"
        columns="1"
        style={{ height: "80vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h1>No hay tareas todavia!</h1>
            <img
              src="https://cdn-icons-png.flaticon.com/128/7466/7466140.png"
              alt="No hay tareas disponibles"
            />
            <div>
              <Button primary>Crea una Tarea</Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );

  return (
    <Container style={{ padding: "20px" }}>
      <Card.Group itemsPerRow={4}>
        {tasks.map((task) => (
          <Card key={task.id}>
            <Card.Content>
              <Card.Header>{task.title}</Card.Header>
              <p style={{ color: "black" }}>{task.description}</p>
            </Card.Content>
            <Card.Content extra>
              <Button primary onClick={() => router.push(`/tasks/${task._id}`)}>
                Ver
              </Button>
              <Button
                secondary
                onClick={() => router.push(`/tasks/${task._id}/Edit`)}
              >
                Editar
              </Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
}

export async function getServerSideProps(ctx) {
  const res = await fetch("http://localhost:3000/api/tasks");

  const tasks = await res.json();

  console.log(tasks);

  return {
    props: {
      tasks,
    },
  };
}

// export async function getServerSideProps() {
//   const res = await fetch("http://localhost:3000/api/tasks");

//   const tasks = await res.json();

//   console.log(tasks);

//   return {
//     props: {},
//   };
// }
