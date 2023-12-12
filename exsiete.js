db.collection('users').aggregate([
    {
      $unwind: '$roles'
    },
    {
      $group: {
        _id: '$roles',
        users: {
          $push: '$email'
        }
      }
    }
  ]);
  