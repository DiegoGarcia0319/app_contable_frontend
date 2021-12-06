//Install express server
const express = require('express');
const path = require('path');
const app = express();

// Serve only the static files form the distdirectory
app.use(express.static(__dirname+ '/dist/appContable'));

// Send all request to index.html
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/appContable/index.html'));
});
// Start the app by listening on the default Herokuport
app.listen(process.env.PORT|| 5000);
