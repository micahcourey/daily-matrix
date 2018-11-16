var path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.matrixDS;
ds.automigrate('Goal', function(err) {
  if (err) throw err;

  var goals = [
    {
      body: 'Finish the Daily Matrix App',
      date: new Date(),
      quarter: 4,
      userId: 3
    },
  ];
  var count = goals.length;
  goals.forEach(function(goal) {
    app.models.Goal.create(goal, function(err, model) {
      if (err) throw err;

      console.log('Created:', model);

      count--;
      if (count === 0)
        ds.disconnect();
    });
  });
});