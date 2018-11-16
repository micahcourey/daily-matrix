var path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.matrixDS;
ds.automigrate('Task', function(err) {
  if (err) throw err;

  var tasks = [
    {
      body: 'this is the first task! this is just a sample...',
      date: new Date(),
      userId: 3
    },
  ];
  var count = tasks.length;
  tasks.forEach(function(task) {
    app.models.Task.create(task, function(err, model) {
      if (err) throw err;

      console.log('Created:', model);

      count--;
      if (count === 0)
        ds.disconnect();
    });
  });
});