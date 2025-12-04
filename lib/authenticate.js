import { jwtDecode } from 'jwt-decode';

export async function authenticateUser(user, password) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        userName: user,
        password: password
      })
    });

    const data = await res.json();

    if (res.ok && data?.token) {
      setToken(data.token);
      return true;
    }

    throw new Error(data?.message || 'Authentication failed');
  } catch (_) {
    throw new Error('Authentication failed');
  }
}

export async function registerUser(user, password, password2) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        userName: user,
        password: password,
        password2: password2
      })
    });

    const data = await res.json();

    if (res.ok) {
      return true;
    }

    throw new Error(data?.message || 'Registration failed');
  } catch (_) {
    throw new Error('Registration failed');
  }
}

function setToken(token) {
  try {
    localStorage.setItem('access_token', token);
  } catch (_) {}
}

export function getToken() {
  try {
    return localStorage.getItem('access_token');
  } catch (_) {
    return null;
  }
}

export function removeToken() {
  try {
    localStorage.removeItem('access_token');
  } catch (_) {}
}

export function readToken() {
  try {
    const token = getToken();
    return token ? jwtDecode(token) : null;
  } catch (_) {
    return null;
  }
}

export function isAuthenticated() {
  return readToken() ? true : false;
}
