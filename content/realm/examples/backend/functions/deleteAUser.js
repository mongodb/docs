const apiUrl = "https://services.cloud.mongodb.com/api/admin/v3.0/groups/5f60207f14dfb25d23101102/apps/6388f860cb722c5a5e002425";


// deleteAUser() deletes a single user from the database using the Admin API 
// pass in an array with an object with the key userID (representing the app user's user.id)
// return value if successful = id of the deleted user
exports = async function(arg){
  
  if(!arg[0].userID){
    return {
      message: `An object with a userID must be passed into deleteAUser()`,
      received: arg[0],
      expected: { userID: "<your app user's user.id>" }
    }
  }
  
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
  
  const token = await adminLogIn();

  async function deleteUser(_id) {
    await context.http.delete({
      url: `${apiUrl}/users/${_id}`,
      headers: {"Authorization": [`Bearer ${token}`]}
    });
    return _id;
  }
  
  return deleteUser(arg[0].userID);

};