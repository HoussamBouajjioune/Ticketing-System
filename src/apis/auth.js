// src/api/authApi.js
const BASE_URL = "http://localhost:5000/users";

/**
 * Fetch all users from json-server and find one that matches the
 * provided email + password. Returns the user object or null.
 */
export async function findUser(email, password) {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) {
      console.error("authApi.findUser: fetch failed", res.status, res.statusText);
      return null;
    }

    const users = await res.json();
    if (!Array.isArray(users)) return null;

    // Normalize email for comparison; keep password exact match.
    const needleEmail = (email ?? "").trim().toLowerCase();
    const needlePassword = password ?? "";

    const user = users.find((u) => {
      const uEmail = String(u.email ?? "").trim().toLowerCase();
      const uPassword = String(u.password ?? "");
      return uEmail === needleEmail && uPassword === needlePassword;
    });

    return user || null;
  } catch (err) {
    console.error("authApi.findUser error:", err);
    return null;
  }
}

/**
 * Wrapper login function: returns the user object if credentials are valid,
 * or null if not.
 */
export async function loginUser(email, password) {
  return await findUser(email, password);
}



/**
 * Signup a new user
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @param {string} role default to "user"
 * @returns created user object or null if error
 */
export async function signupUser({ username, email, password, role = "user" }) {
  try {
    // First, check if email or username already exists
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch users");

    const users = await res.json();

    const exists = users.some(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() ||
        u.username.toLowerCase() === username.toLowerCase()
    );

    if (exists) {
      console.error("Email or username already exists");
      return null;
    }

    // Create new user
    const newUser = {
      username,
      email,
      password, // plain text for dev
      role,
      created_at: new Date().toISOString(),
    };

    const createRes = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    if (!createRes.ok) throw new Error("Failed to create user");

    const createdUser = await createRes.json();
    return createdUser;
  } catch (err) {
    console.error("signupUser error:", err);
    return null;
  }
}