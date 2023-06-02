import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

function UsersView() {
  const navigate = useNavigate();
  const { idusers } = useParams();

  const [idusers_e, setIdusers_e] = useState("");
  const [users_name_e, setUsers_name_e] = useState("");

  const handleReadUser = () => {
    axios.get("http://127.0.0.1:8000/api/users/read/" + idusers).then((res) => {
      console.log(res.data);

      if (!res.data.status) {
        setIdusers_e(res.data.idusers);
        setUsers_name_e(res.data.users_name);
      }
    });
  };

  const handleUpdate = () => {
    const form = {
      users_name: users_name_e,
    };

    axios
      .put("http://127.0.0.1:8000/api/users/update/" + idusers, form)
      .then((res) => {
        console.log(res.data);

        if (res.data.status === "success") {
          navigate("/users");
        }
      });
  };

  useEffect(() => {
    handleReadUser();
  }, []);

  return (
    <Container>
      <div className="my-5">
        <Link to="/users" className="btn btn-light border">
          <i className="bi bi-arrow-left"></i>
        </Link>

        <hr />

        <Row>
          <Col xs={12} sm={12} md={4} className="mx-auto p-4 border rounded">
            <Form>
              <Form.Control
                type="hidden"
                placeholder="Username..."
                autoComplete="off"
                required
                value={idusers_e}
                onChange={(e) => setUsers_name_e(e.target.value)}
              />

              <Form.Group className="mb-3" controlId="users_name">
                <Form.Label>{"Username"}</Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Username..."
                  autoComplete="off"
                  required
                  value={users_name_e}
                  onChange={(e) => setUsers_name_e(e.target.value)}
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button type="button" variant="warning" onClick={handleUpdate}>
                  {"Update"}
                </Button>

                <Button type="button" variant="danger">
                  {"Delete"}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default UsersView;
