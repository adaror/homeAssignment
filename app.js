const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const db = require('./config/db');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//test db
db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

//routes
require('./api/routes/analytics.routes')(app);
require('./api/routes/event.routes')(app);

app.get('/health-check',(req,res)=>{
	res.status(200).json({message:'OK'})
});

app.listen(config.port, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`Server running an ${config.port}`);
  }
});

