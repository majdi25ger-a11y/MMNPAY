// Repository for user accounts and the current session. This is the
// single place that knows how a "user" is registered, authenticated, and
// persisted -- it owns the "users" and "currentUser" localStorage keys
// directly, since no shared helpers for them exist yet in storage.ts.

export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface NewUserInput {
  fullName: string;
  email: string;
  password: string;
}

const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

function generateUserId(): string {
  return "USR" + Date.now();
}

// Returns every registered user, falling back to an empty array if the
// stored value is missing, corrupted, or not the shape we expect.
function getUsers(): User[] {

  try {

    const raw = localStorage.getItem(USERS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];

  } catch {

    return [];

  }

}

function saveUsers(users: User[]): void {

  try {

    localStorage.setItem(USERS_KEY, JSON.stringify(users));

  } catch {

    // Ignore write failures (e.g. storage full or unavailable).

  }

}

// Registers a new user. Throws if the email is already registered.
export function register(user: NewUserInput): User {

  const users = getUsers();

  const email = user.email.trim().toLowerCase();

  const alreadyExists = users.some(
    (existing) => existing.email.trim().toLowerCase() === email
  );

  if (alreadyExists) {
    throw new Error("This email is already registered.");
  }

  const newUser: User = {
    id: generateUserId(),
    fullName: user.fullName,
    email: user.email,
    password: user.password,
    createdAt: new Date().toISOString()
  };

  saveUsers([...users, newUser]);

  return newUser;

}

// Authenticates a user by email/password and sets them as the current
// session. Throws if the credentials do not match a registered user.
export function login(email: string, password: string): User {

  const users = getUsers();

  const normalizedEmail = email.trim().toLowerCase();

  const match = users.find(
    (existing) =>
      existing.email.trim().toLowerCase() === normalizedEmail &&
      existing.password === password
  );

  if (!match) {
    throw new Error("Invalid email or password.");
  }

  saveCurrentUser(match);

  return match;

}

// Clears the current session.
export function logout(): void {

  try {

    localStorage.removeItem(CURRENT_USER_KEY);

  } catch {

    // Ignore write failures.

  }

}

// Returns the currently logged-in user, or null if no session exists or
// the stored value is missing/corrupted.
export function getCurrentUser(): User | null {

  try {

    const raw = localStorage.getItem(CURRENT_USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;

  } catch {

    return null;

  }

}

// Persists the given user as the current session.
export function saveCurrentUser(user: User): void {

  try {

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

  } catch {

    // Ignore write failures.

  }

}
