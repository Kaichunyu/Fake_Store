import { server, port } from "./serverSetting"

export const fetchCart = async ( token ) => {
  const url = `${server}:${port}/cart`;
  const user = { token }
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
    throw new Error("Failed to fetch cart: " + error);
  }
}

export const updateCart = async (token, cart) => {
  const url = `${server}:${port}/cart`;
  const item = {items: cart}
  try {
    const res = await fetch(url, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(item),
    });
    const data = await res.json()
    return data;
  } catch (error) {
    throw new Error("Failed to update cart: " + error);
  }
}