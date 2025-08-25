let token;
const apiUrl = "https://services.cloud.mongodb.com/api/admin/v3.0/groups/5f60207f14dfb25d23101102/apps/6388f860cb722c5a5e002425";

async function adminLogIn() {
  const username = context.values.get("adminApiPublicKey");
  const apiKey = context.values.get("adminApiPrivateKey");
  const response = await context.http.post({
    url: "https://services.cloud.mongodb.com/api/admin/v3.0/auth/providers/mongodb-cloud/login",
    body: {username, apiKey},
    encodeBodyAsJSON: true,
  });
  const body = EJSON.parse(response.body.text());
  return body.access_token;
}

async function fetchUsers() {
  const response = await context.http.get({
    url: `${apiUrl}/users`,
    headers: {"Authorization": [`Bearer ${token}`]}
  });
  if (response.statusCode !== 200) {
    throw new Error(response);
  }
  return EJSON.parse(response.body.text());
}

async function fetchPendingUsers() {
  const response = await context.http.get({
    url: `${apiUrl}/user_registrations/pending_users`,
    headers: {"Authorization": [`Bearer ${token}`]}
  });
  if (response.statusCode !== 200) {
    throw new Error(response);
  }
  const users = EJSON.parse(response.body.text());
  return users;
}

async function deleteUser({_id}) {
  const url = `${apiUrl}/users/${_id}`;
  const result = await context.http.delete({
    url,
    headers: {"Authorization": [`Bearer ${token}`]}
  });
  if (result.statusCode !== 204) {
    throw new Error(result);
  }
  console.log(_id);
  return _id;
}

async function deletePendingUser({_id}) {
  const result = await context.http.delete({
    url: `${apiUrl}/user_registrations/by_id/${_id}`,
    headers: {"Authorization": [`Bearer ${token}`]}
  });
  if (result.statusCode !== 204) {
    throw new Error(result);
  }
  return _id;
}

exports = async function(arg) {
  token = await adminLogIn();
  
  while (true) {
    // Users is paginated to 50. Keep calling until all users are deleted.
    const users = await fetchUsers();
    if (users.length === 0) {
      break;
    }
    console.log(`Deleting ${users.length} user${users.length === 1 ? '' : 's'}.`);
    await Promise.all(users.map(deleteUser));
  }
  
  while (true) {
    const pendingUsers = await fetchPendingUsers();
    if (pendingUsers.length === 0) {
      break;
    }
    console.log(`Deleting ${pendingUsers.length} pending user${pendingUsers.length === 1 ? '' : 's'}.`);
    return await Promise.all(pendingUsers.map(deletePendingUser));
  }
};
