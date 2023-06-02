import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Users() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [users_name, setUsers_name] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("users_name", users_name);

    axios
      .post("http://127.0.0.1:8000/api/users/create", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.status === "success") {
          setUsers_name("");
        }
      });
  };

  const handleRead = () => {
    axios.get("http://127.0.0.1:8000/api/users/read").then((res) => {
      console.log(res.data);
      setUsers(!res.data.status ? res.data : []);
    });
  };

  useEffect(() => {
    handleRead();
  }, []);

  return (
    <Container>
      <div className="my-5">
        <Row>
          <Col xs={12} sm={12} md={6} lg={4}>
            <Form onSubmit={handleCreate}>
              <Form.Group className="mb-3" controlId="users_name">
                <Form.Label>{"Username"}</Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Username..."
                  autoComplete="off"
                  required
                  value={users_name}
                  onChange={(e) => setUsers_name(e.target.value)}
                />
              </Form.Group>

              <Button type="submit" variant="success">
                {"Create"}
              </Button>
            </Form>
          </Col>
        </Row>

        <hr />

        <Table size="sm" hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>USERNAME</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                role="button"
                onClick={() => navigate("/users/" + user.idusers)}
              >
                <td>{user.idusers}</td>
                <td>{user.users_name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

export default Users;
