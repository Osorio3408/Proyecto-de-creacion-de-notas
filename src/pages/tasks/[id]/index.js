import { useState } from "react";
import Error from "next/error";
import {
  GridColumn,
  GridRow,
  Grid,
  Button,
  Confirm,
  Loader,
  Icon,
} from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function TaskDetail({ task, error }) {
  const [confirm, setConfirm] = useState(false);
  const { query, push } = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const open = () => setConfirm(true);
  const close = () => setConfirm(false);

  const deleTask = async () => {
    const { id } = query;
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = () => {
    setIsDeleting(true);
    deleTask();
    close();
    push("/");
  };

  if (error && error.statusCode)
    return <Error statusCode={error.statusCode} title={error.statusText} />;

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="1"
      style={{ height: "80vh" }}>
      <GridRow>
        <GridColumn textAlign="center">
          <h1>{task.title}</h1>
          <p>{task.description}</p>
          <div>
            <Link href="/">
              <Button color="blue">
                <Icon className="reply" />
                Volver
              </Button>
            </Link>
            <Button color="red" onClick={open} loading={isDeleting}>
              <Icon className="delete" />
              Eliminar
            </Button>
          </div>
        </GridColumn>
      </GridRow>
      <Confirm
        header="Por favor confirma"
        content="Estas seguro de eliminar esta tarea"
        open={confirm}
        onConfirm={handleDelete}
        onCancel={close}
      />
    </Grid>
  );
}

const { URL } = process.env;

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`${URL}/api/tasks/${id}`);

  if (res.status === 200) {
    const task = await res.json();
    return {
      props: {
        task,
      },
    };
  }

  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: "ID invalido",
      },
    },
  };
}
