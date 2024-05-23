import { server, port } from "./serverSetting"

export const fetchOrder = async ( token  ) => {
  const url = `${server}:${port}/orders/all`;
  // const user = { token }
  try {
    const res = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });
    return await res.json();
  } catch (error) {
    throw new Error("Failed to fetch orders: " + error);
  }
}