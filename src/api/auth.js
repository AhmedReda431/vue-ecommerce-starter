import api from "./axios";

export const authApi = {
  // DummyJSON uses username/password
  login: (credentials) =>
    api.post("/auth/login", {
      username: credentials.email,
      password: credentials.password,
    }),
  register: (data) =>
    api.post("/users/add", {
      firstName: data.name,
      lastName: "",
      age: 25,
      username: data.email,
      password: data.password,
      email: data.email,
    }),
  me: () => api.get("/auth/me"),
  logout: () => Promise.resolve(),
};
