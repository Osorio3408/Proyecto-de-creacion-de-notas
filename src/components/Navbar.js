import { Menu, Container, Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";

export const Navbar = () => {
  const router = useRouter();

  return (
    <Menu inverted borderless attached>
      <Container>
        <Menu.Item>
          <Link href="/">
            <img src="/vercel.svg" alt="vercel_img" />
          </Link>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Button
              primary
              size="large"
              onClick={() => router.push("/tasks/new")}
            >
              Nueva Tarea
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};
