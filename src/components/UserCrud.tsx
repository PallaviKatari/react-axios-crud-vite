import * as React from "react";
import {
  Button,
  Field,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@fluentui/react-components";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../api/axiosClient";

import type { User } from "../types/User";

export const UserCrud: React.FC = () => {
  const [users, setUsers] = React.useState<User[]>([]);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");

  const [editId, setEditId] = React.useState<number | null>(null);

  // READ
  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadUsers();
    console.log("Users loaded:", users);
  }, [editId]);

  // CREATE / UPDATE
  const handleSubmit = async () => {
    if (!name || !email || !username) {
      alert("Please enter all fields");
      return;
    }

    const user: User = {
      name,
      email,
      username,
    };

    try {
      if (editId === null) {
        // CREATE
        const newUser = await createUser(user);

        setUsers((previousUsers) => [
          ...previousUsers,// users - 10
          newUser,// 11
        ]);
      } else {
        // UPDATE
        const updatedUser = await updateUser(editId, user);

        setUsers((previousUsers) =>
          previousUsers.map((u) =>
            u.id === editId ? updatedUser : u
          )
        );
      }

      clearForm();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  // EDIT
  const handleEdit = (user: User) => {
    setEditId(user.id ?? null);
    setName(user.name);
    setEmail(user.email);
    setUsername(user.username);
  };

  // DELETE
  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);

      setUsers((previousUsers) =>
        previousUsers.filter((u) => u.id !== id)
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setUsername("");
    setEditId(null);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>React Axios CRUD</h1>

      {/* FORM */}

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "25px",
          alignItems: "end",
        }}
      >
        <Field label="Name">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Field>

        <Field label="Email">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>

        <Field label="Username">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Field>

        <Button
          appearance="primary"
          onClick={handleSubmit}
        >
          {editId === null ? "Add User" : "Update User"}
        </Button>

        {editId !== null && (
          <Button onClick={clearForm}>
            Cancel
          </Button>
        )}
      </div>

      {/* TABLE */}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Username</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>

              <TableCell>{user.name}</TableCell>

              <TableCell>{user.email}</TableCell>

              <TableCell>{user.username}</TableCell>

              <TableCell>
                <Button
                  onClick={() => handleEdit(user)}
                  style={{ marginRight: "10px" }}
                >
                  Edit
                </Button>

                <Button
                  appearance="secondary"
                  onClick={() =>
                    user.id && handleDelete(user.id)
                  }
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};