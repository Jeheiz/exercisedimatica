
//Update only last_connection_date with the current date:
db.collection('users').updateOne(
    { _id: ObjectId("5cd96d3ed5d3e20029627d4a") },
    { $set: { last_connection_date: new Date() } }
  );
  


  //Add a role admin:
  db.collection('users').updateOne(
    { _id: ObjectId("5cd96d3ed5d3e20029627d4a") },
    { $addToSet: { roles: "admin" } }
  );
  

  //Modify addresses with zip 75001 and replace city with Paris 1//
  db.collection('users').updateOne(
    { 
      _id: ObjectId("5cd96d3ed5d3e20029627d4a"),
      "addresses.zip": 75001
    },
    { 
      $set: { "addresses.$.city": "Paris 1" } 
    }
  );
  
