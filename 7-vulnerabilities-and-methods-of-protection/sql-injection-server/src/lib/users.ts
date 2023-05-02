import client from "./db";

export type User = {
  id: number;
  email: string;
  password: string;
  role: string;
};

export type UserLogin = Omit<User, "id" | "role">;

client.connect();

export async function getAll() {
  return await client.query("select * from users");
}

export async function findByEmailAndPass(dto: UserLogin) {
  const sqlQuery = `select * from users where email = $1 and password = $2`;
  const parameters = [...Object.values(dto)];
  const res = await client.query(sqlQuery, parameters);
  return res;
}

export async function findByEmailAndPassVulnerable(dto: UserLogin) {
  const query = `select * from users where email = '${dto.email}' and password = '${dto.password}';`;
  console.log("query", query);
  const res = await client.query(query);

  return res;
}

export async function create(user: UserLogin) {
  return await client.query(
    "insert into users(email, password) values($1, $2) returning *",
    [...Object.values(user)]
  );
}

export async function update(id: number, update: Partial<UserLogin>) {
  const userKeys = ["email", "password"];
  let counter = 1;

  //@ts-ignore
  const updatedSets = Object.entries(update).reduce((prev, curr) => {
    let prevArr = prev as unknown as string[];
    if (userKeys.includes(curr[0])) {
      prevArr.push(`set ${curr[0]} = $${counter}`);
      counter++;
    }
    return prevArr;
  }, []);

  const updateSql = updatedSets.join(", ");
  const parametrizedValuesArr = Array.from(
    { length: counter },
    (_, i) => i
  ).map((el) => `$${el}`);

  const parametriezValuesWithId = parametrizedValuesArr.concat(
    `${parametrizedValuesArr.length - 1}`
  );

  return await client.query(
    `update users set (${updateSql}) values(${parametrizedValuesArr.join(
      ", "
    )}) where id=${parametriezValuesWithId.length - 1}`,
    [...Object.values(update), id]
  );
}

export async function remove(id: number) {
  return await client.query("delete from users where id=$1", [id]);
}
