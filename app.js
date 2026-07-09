// SourceMint supplier portal — talks to the live API.
const API = "https://sourcemint.213-199-60-210.sslip.io/api";

function token() { return localStorage.getItem("sm_token"); }
function setToken(t) { t ? localStorage.setItem("sm_token", t) : localStorage.removeItem("sm_token"); }

async function api(path, { method = "GET", body, auth = false, form = false } = {}) {
  const headers = {};
  if (!form) headers["Content-Type"] = "application/json";
  if (auth && token()) headers["Authorization"] = "Bearer " + token();
  const res = await fetch(API + path, {
    method,
    headers,
    body: form ? body : (body ? JSON.stringify(body) : undefined),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.error || "error"), { status: res.status, data });
  return data;
}

function requireLogin() { if (!token()) location.href = "login.html"; }
function logout() { setToken(null); location.href = "login.html"; }
function msg(el, text, ok) {
  el.textContent = text;
  el.className = "msg " + (ok ? "ok" : "err");
  el.style.display = "block";
}
