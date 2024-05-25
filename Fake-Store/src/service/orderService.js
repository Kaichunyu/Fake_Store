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

export const newOrder = async (token, cart) => {
  const url = `${server}:${port}/orders/neworder`;

  const item = { "items": cart  }
    try {
      const res = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(item),
      });
      return await res.json();
    } catch (error) {
      throw new Error("Failed to add new order: " + error);
    }
}
  
export const updateOrder = async (token, id, paid, delivered) => {
  const url = `${server}:${port}/orders/updateorder`;
    const item = { "orderID": id, "isPaid": paid, "isDelivered": delivered}
    try {
      const res = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(item),
      });
      return await res.json();
    } catch (error) {
      throw new Error("Failed to update order: " + error);
    }
  }