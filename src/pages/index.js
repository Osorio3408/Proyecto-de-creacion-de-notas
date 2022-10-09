import React from "react";
import {
  Button,
  Card,
  CardDescription,
  CardMeta,
  Container,
  Grid,
  GridColumn,
  Icon,
  Image,
} from "semantic-ui-react";
import { useRouter } from "next/router";

export default function HomePage({ tasks }) {
  console.log(tasks);
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
            <Image
              style={{ display: "inline-block" }}
              src="https://cdn-icons-png.flaticon.com/128/7466/7466140.png"
              alt="No hay tareas disponibles"
              size="medium"
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
              <Card.Header>
                <Icon className="tasks" />
                {task.title}
              </Card.Header>
              <CardMeta>{task.createdAt}</CardMeta>
              <CardDescription>{task.description}</CardDescription>
            </Card.Content>
            <Card.Content extra>
              <Button
                basic
                color="blue"
                onClick={() => router.push(`/tasks/${task._id}`)}
              >
                <Icon className="eye" />
                Ver
              </Button>
              <Button
                basic
                color="black"
                onClick={() => router.push(`/tasks/${task._id}/Edit`)}
              >
                <Icon className="edit outline" />
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
