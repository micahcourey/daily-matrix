var path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.matrixDS;
ds.automigrate('User', function(err) {
  if (err) throw err;

  var users = [
    {
      email: 'john.doe@stevenswater.com',
      password: 'micah',
      realm: 'admin',
      username: 'john',
      emailVerified: true
    },
    {
      email: 'jane.doe@stevenswater.com',
      password: 'micah',
      realm: 'user',
      username: 'jane',
      emailVerified: true
    }
  ];
  var count = users.length;
  users.forEach(function(user) {
    app.models.User.create(user, function(err, model) {
      if (err) throw err;

      console.log('Created:', model);

      count--;
      if (count === 0)
        ds.disconnect();
    });
  });
});