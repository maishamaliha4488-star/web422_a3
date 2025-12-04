import { getToken } from "./authenticate";

export async function getFavourites() {
  const token = getToken();

  if (!token) return [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`
      }
    });

    if (res.ok) {
      return await res.json();
    }

    return [];
  } catch (err) {
    return [];
  }
}

export async function addToFavourites(id) {
  const token = getToken();

  if (!token || !id) return [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `JWT ${token}`
      }
    });

    if (res.ok) {
      return await res.json();
    }

    return [];
  } catch (err) {
    return [];
  }
}

export async function removeFromFavourites(id) {
  const token = getToken();

  if (!token || !id) return [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `JWT ${token}`
      }
    });

    if (res.ok) {
      return await res.json();
    }

    return [];
  } catch (err) {
    return [];
  }
}
