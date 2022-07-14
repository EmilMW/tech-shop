import { fetcher } from "../helpers/fetcher";

const dbAuthProvider = {
  async signIn(data) {
    const user = await fetcher("/auth/login", "POST", data);
    return user;
  },
  async signOut() {
    await fetcher("auth/logout", "GET");
  },
};

export { dbAuthProvider };
