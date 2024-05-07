import express from 'express';
import fetch from 'node-fetch';

const PORT = 3333
const app = express();

app.use(express.static('public'));

// Note: Don't add or change anything above this line.
/* Add your code here */

let count = 0;
function middleware(req, res, next) {
  count += 1;
  if (count % 10 == 0 && count != 0) {
    console.log(`Total requests to server: ${count}`);
  }
  next();
};

app.get('/random-person', middleware, async (req, res, next) => {

  const response = await fetch("https://randomuser.me/api/");
  const user = await response.json();

  const output = {
    "first": user.results[0].name.first,
    "last": user.results[0].name.last,
    "phone": user.results[0].phone,
    "email": user.results[0].email
  };

  res.status(200).send(output);
});

// Note: Don't add or change anything below this line.
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
