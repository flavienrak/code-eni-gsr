const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getUsersController = async () => {
  return await fetch(`${apiUrl}/get-users`).then((res) => res.json());
};

export const getUserController = async (id) => {
  return await fetch(`${apiUrl}/user/${id}/get-user`).then((res) => res.json());
};
