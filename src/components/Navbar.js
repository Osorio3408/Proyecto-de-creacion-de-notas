import { Menu, Container, Button, Icon, Image } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";

export const Navbar = () => {
  const router = useRouter();

  return (
    <Menu inverted borderless attached>
      <Container>
        <Menu.Item>
          <Link href="/">
            <Image src="/nextjs.png" size="tiny" />
          </Link>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Button
              className="ui inverted green basic button"
              size="large"
              onClick={() => router.push("/tasks/new")}
            >
              <Icon className="add"></Icon>
              Nueva Tarea
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};
