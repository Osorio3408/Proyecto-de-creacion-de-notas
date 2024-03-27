import React from "react";
import {
  Button,
  Card,
  CardDescription,
  CardMeta,
  Container,
  Grid,
  Icon,
  Image,
} from "semantic-ui-react";
import { useRouter } from "next/router";

export default function HomePage({ tasks }) {
  console.log(tasks);
  const router = useRouter();

  if (!tasks || tasks.length === 0) {
    return (
      <Container style={{ padding: "20px" }}>
        <Grid
          centered
          verticalAlign="middle"
          columns="1"
          style={{ height: "80vh", margin: "0px" }}>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <h1>No hay tareas todavía!</h1>
              <Image
                style={{ display: "inline-block" }}
                src="https://cdn-icons-png.flaticon.com/128/7466/7466140.png"
                alt="No hay tareas disponibles"
                size="medium"
              />
              <div>
                <Button onClick={() => router.push("/tasks/new")} primary>
                  Crea una Tarea
                </Button>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }

  return (
    <Container style={{ padding: "20px" }}>
      <Card.Group itemsPerRow={4}>
        {tasks.map((task) => (
          <Card key={task.id} className="ui container">
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
                onClick={() => router.push(`/tasks/${task._id}`)}>
                <Icon className="eye" />
                Ver
              </Button>
              <Button
                basic
                color="black"
                onClick={() => router.push(`/tasks/${task._id}/Edit`)}>
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
  try {
    const res = await fetch(`${process.env.HOST}/api/tasks`);
    const data = await res.json();
    const tasks = Array.isArray(data) ? data : [];
    console.log(data);
    return {
      props: {
        tasks,
      },
    };
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return {
      props: {
        tasks: [],
      },
    };
  }
}
