const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const createServiceController = async ({
  id,
  name,
  description,
  tarif,
  duree,
  infos,
}) => {
  return await fetch(`${apiUrl}/user/${id}/create-service`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description, tarif, duree, infos }),
  }).then((res) => res.json());
};

export const getAllServicesController = async (id) => {
  return await fetch(`${apiUrl}/user/${id}/service/get-all`).then((res) =>
    res.json()
  );
};

export const sendDemandeController = async ({ userId, serviceId }) => {
  return await fetch(
    `${apiUrl}/user/${userId}/service/${serviceId}/demande-service`
  ).then((res) => res.json());
};

export const getAllDemandeController = async (userId) => {
  return await fetch(`${apiUrl}/user/${userId}/demande/get-all`).then((res) =>
    res.json()
  );
};

export const acceptDemandeController = async ({ userId, demandeId }) => {
  return await fetch(
    `${apiUrl}/user/${userId}/demande/${demandeId}/accept`
  ).then((res) => res.json());
};

export const rejectDemandeController = async ({ userId, demandeId }) => {
  return await fetch(
    `${apiUrl}/user/${userId}/demande/${demandeId}/reject`
  ).then((res) => res.json());
};

export const payementController = async ({
  userId,
  debitPhone,
  creditPhone,
  amount,
}) => {
  return await fetch(`${apiUrl}/user/${userId}/mvola-payement`).then((res) =>
    res.json()
  );
};
