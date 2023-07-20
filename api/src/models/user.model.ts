interface Iuser {
  username: string;
  password: string;
}

class User {
  users: Iuser[] = [];

  constructor() {
    this.fillData();
  }

  create(username: string, password: string) {
    if (this.users.some((user) => user.username === username))
      throw new Error("user already exists");
    this.users.push({ username, password });
  }

  find(): Iuser[] {
    return this.users;
  }

  findByUsername(username: string): Iuser | undefined {
    return this.users.find((user) => user.username === username);
  }

  private fillData() {
    this.users.push({ username: "admin", password: "admin" });
  }
}

export const Users = new User();
