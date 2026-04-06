"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateUserInput,
  UpdateUserInput,
  ChangePasswordInput,
  User,
} from "@/lib/schemas/user";
import { API_CONFIG } from "../config";
import { api } from "../api";

export async function listUsers(): Promise<User[]> {
  const { data } = await api.get(`/users/all`);
  return data;
}

export async function createUsers(payload: Partial<CreateUserInput>) {
  const { data } = await api.post("/users", payload);
  return data;
}

export async function updateUsers(id: string, payload: Partial<UpdateUserInput>) {
  const { data } = await api.put(`/users/${id}`, payload);
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
    mutationFn: ({ id, payload }: { id: string; payload: Partial<UpdateUserInput> }) =>
      updateUsers(id, payload),
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
  return useMutation({
    mutationFn: async (data: ChangePasswordInput) => {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}users/change-password`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );
      if (!response.ok) throw new Error("Falha ao alterar senha");
      return response.json();
    },
  });
};
