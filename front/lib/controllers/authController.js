const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const loginController = async ({ email, password }) => {
  return await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json());
};

export const registerController = async ({
  role,
  ministere,
  cin,
  name,
  username,
  email,
  telephone,
  password,
}) => {
  return await fetch(`${apiUrl}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      role,
      ministere,
      cin,
      name,
      username,
      email,
      telephone,
      password,
    }),
  }).then((res) => res.json());
};

export const verifyTokenController = async (token) => {
  return await fetch(`${apiUrl}/token/${token}/verify-token`).then((res) =>
    res.json()
  );
};

export const verifyUserController = async (email) => {
  return await fetch(`${apiUrl}/user/${email}/verify-user`).then((r) =>
    r.json()
  );
};
