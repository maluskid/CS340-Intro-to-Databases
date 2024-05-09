document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('directLink').addEventListener('click', directLink);
  document.getElementById('expressLink').addEventListener('click', expressLink);
});

async function getInfo(event) {
  event.preventDefault();
  const p = document.getElementById('content');

  const res = await fetch("https://randomuser.me/api/");
  const user = await res.json();

  const userFirst = user.results[0].name.first;
  const userLast = user.results[0].name.last;
  const userPhone = user.results[0].phone;
  const userEmail = user.results[0].email;

  const newUser = document.createElement('p');
  newUser.textContent = `${userFirst} ${userLast} ${userPhone} ${userEmail}`;
  p.appendChild(newUser);
}

async function expressLink(event) {
  event.preventDefault();
  const p = document.getElementById('content');

  const res = await fetch('/random-person');
  const user = await res.json();

  const newUser = document.createElement('p');
  newUser.textContent = `${user.first} ${user.last} ${user.phone} ${user.email}`;
  p.appendChild(newUser);
}

// Other code
function read() {
  var data = JSON.parse(localStorage.getItem('entries')) || [];
  var table = document.getElementById("myTable");
  table.innerHTML = "<tr><th>Name</th><th>Age</th><th>Action</th></tr>";
  data.forEach(function(entry) {
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = entry.name;
    cell2.innerHTML = entry.age;
    cell3.innerHTML = '<button onclick="update(' + entry.id + ')">Update</button> <button onclick="remove(' + entry.id + ')">Delete</button>';
  });
}

function create() {
  var name = document.getElementById("name").value;
  var age = document.getElementById("age").value;
  var data = JSON.parse(localStorage.getItem('entries')) || [];
  var entry = {
    id: Date.now(),
    name: name,
    age: age
  };
  data.push(entry);
  localStorage.setItem('entries', JSON.stringify(data));
  read();
}

function update(id) {
  var data = JSON.parse(localStorage.getItem('entries')) || [];
  var newName = prompt("Enter new name:");
  var newAge = prompt("Enter new age:");
  data.forEach(function(entry) {
    if (entry.id === id) {
      entry.name = newName;
      entry.age = newAge;
    }
  });
  localStorage.setItem('entries', JSON.stringify(data));
  read();
}

function remove(id) {
  var data = JSON.parse(localStorage.getItem('entries')) || [];
  data = data.filter(function(entry) {
    return entry.id !== id;
  });
  localStorage.setItem('entries', JSON.stringify(data));
  read();
}

read();
