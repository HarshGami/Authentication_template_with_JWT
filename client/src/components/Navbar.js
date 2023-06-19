import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function NavBar({ isAuth, setIsAuth }) {
  const username = localStorage.getItem("name");

  function logout() {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    localStorage.clear();
    setIsAuth(false);
  }
  
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand className="mx-3">Auth</Navbar.Brand>
          {isAuth && (
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text className="mx-3">{username}</Navbar.Text>
              <Button
                className="mx-3"
                variant="primary"
                type="submit"
                onClick={logout}
              >
                Log Out
              </Button>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
