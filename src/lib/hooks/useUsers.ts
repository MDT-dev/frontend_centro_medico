"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateUserInput,
  UpdateUserInput,
  ChangePasswordInput,
  User,
} from "@/lib/schemas/user";
import { api } from "../api";

export async function listUsers(): Promise<User[]> {
  const { data } = await api.get(`/users/all`);
  return data;
}

export async function createUsers(payload: Partial<CreateUserInput>) {
  const { data } = await api.post("/users", payload);
  return data;
}

export async function updateUsers(
  id: string,
  payload: Partial<UpdateUserInput>,
) {
  const { data } = await api.put(`/users/${id}`, payload);
  return data;
}

export async function changePassword(
  payload: Partial<ChangePasswordInput>,
) {
  const { data } = await api.put(`/users/change-password`, payload);
  return data;
}

export async function deleteUsers(id: string) {
  const { data } = await api.delete(`/users/${id}`);
  return data;
}

export const useUsersList = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: listUsers,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUsers,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<UpdateUserInput>;
    }) => updateUsers(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUsers,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
};

export const useChangePassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      payload,
    }: {
      payload: Partial<ChangePasswordInput>;
    }) => changePassword(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
};


