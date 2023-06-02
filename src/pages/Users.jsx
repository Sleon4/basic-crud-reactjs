import axios from "axios";
import { useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";

function Users() {
  const [idusers, setIdusers] = useState("");
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
          <tbody></tbody>
        </Table>
      </div>
    </Container>
  );
}

export default Users;
