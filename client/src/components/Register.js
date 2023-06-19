import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Register({ setIsAuth }) {
  const [user, setuser] = useState({ name: "", email: "", password: "" });
  const [form, setForm] = useState(1);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [verifiedstatus, setverifiedstatus] = useState({});

  const verification = async () => {
    const response = await fetch(process.env.REACT_APP_VERIFICATION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    });

    const data = await response.json();
    setverifiedstatus(data);
    return;
  };

  useEffect(() => {
    verification();
  }, []);

  if (verifiedstatus.status === "ok") {
    setIsAuth(true);
    // window.location.href = '/dashboard';
  } else {
    setIsAuth(false);
  }

  useEffect(() => {
    setuser({ name: "", email: "", password: "" });
    setemail("");
    setpassword("");
  }, [form]);

  async function LoginUser(event) {
    event.preventDefault();

    if (email === "" || password === "") {
      alert("please enter full details");
      return;
    }

    const response = await fetch(process.env.REACT_APP_LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: email,
        Password: password,
      }),
    });

    const data = await response.json();

    if (data.status === "ok") {
      localStorage.setItem("name", data.name);
      localStorage.setItem("token", data.token);
      setIsAuth(true);
      // window.location.href = '/dashboard';
    } else {
      alert(data.message);
      setIsAuth(false);
    }
  }

  async function RegisterUser(event) {
    event.preventDefault();

    if (user.name === "" || user.email === "" || user.password === "") {
      alert("please enter full details");
      return;
    }

    const res = await fetch(process.env.REACT_APP_REGISTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: user.name,
        Email: user.email,
        Password: user.password,
      }),
    });

    const data = await res.json();

    if (data.status === "ok") {
      localStorage.setItem("name", data.name);
      localStorage.setItem("token", data.token);
      setIsAuth(true);
      // window.location.href = '/dashboard';
    } else {
      alert(data.message);
      setIsAuth(false);
    }
  }

  return (
    <div className="my-4 card w-75 mx-auto">
      <Form className="d-flex justify-content-center">
        <Button
          className="w-50"
          variant="primary"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            setForm(1);
          }}
        >
          Sign Up
        </Button>
        <Button
          className="w-50"
          variant="primary"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            setForm(2);
          }}
        >
          Login
        </Button>
      </Form>
      {form === 1 ? (
        <Form className="my-2 mx-2">
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Full Name"
              value={user.name}
              onChange={(e) => setuser({ ...user, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Username"
              value={user.email}
              onChange={(e) => setuser({ ...user, email: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={user.password}
              onChange={(e) => setuser({ ...user, password: e.target.value })}
            />
          </Form.Group>
          <Button
            className="w-20 mx-auto"
            variant="primary"
            type="submit"
            onClick={RegisterUser}
          >
            Sign Up
          </Button>
        </Form>
      ) : (
        <Form className="my-2 mx-2">
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Username"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </Form.Group>
          <Button
            className="w-20 mx-auto"
            variant="primary"
            type="submit"
            onClick={LoginUser}
          >
            Login
          </Button>
        </Form>
      )}
    </div>
  );
}

export default Register;
