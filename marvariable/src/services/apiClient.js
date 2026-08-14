const LOGIN_PATH = "/admin-register";

export function getToken() {
  const token = localStorage.getItem("token");
  return token && token !== "undefined" && token !== "null" ? token : null;
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function clearToken() {
  localStorage.removeItem("token");
}

export function isAuthenticated() {
  return Boolean(getToken());
}

export function logout() {
  clearToken();
  window.location.href = LOGIN_PATH;
}

function authHeaders(extra = {}) {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...extra,
    ...(token ? { Authorization: token } : {}),
  };
}

// Shared fetch wrapper: attaches the stored token to every request and
// clears it + redirects to login on 401/403 so admin pages never get stuck
// showing a broken screen once the token expires.
export async function apiFetch(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: authHeaders(options.headers),
  });

  if (response.status === 401 || response.status === 403) {
    clearToken();
    if (!window.location.pathname.startsWith(LOGIN_PATH)) {
      window.location.href = LOGIN_PATH;
    }
  }

  return response;
}
