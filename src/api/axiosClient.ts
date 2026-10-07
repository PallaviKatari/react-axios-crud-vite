import axios from "axios";
import type { User } from "../types/User";

const axiosClient = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

//import {getUsers} from "./api/axiosClient.ts";
export const getUsers = async (): Promise<User[]> => {
  const response = await axiosClient.get<User[]>("/users");
  return response.data;
};

export const createUser = async (user: User): Promise<User> => {
  const response = await axiosClient.post<User>("/users", user);
  return response.data;
};

export const updateUser = async (
  id: number,
  user: User
): Promise<User> => {
  const response = await axiosClient.put<User>(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axiosClient.delete(`/users/${id}`);
};