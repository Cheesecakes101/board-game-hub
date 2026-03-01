const http = require('http');

const data = JSON.stringify({
  name: "test user",
  email: `test${Date.now()}@test.com`,
  phone: "1234567890",
  roomNo: "101",
  password: "password123",
  secretQuestion: "q",
  secretAnswer: "a"
});

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/auth/signup',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);
  res.on('data', d => process.stdout.write(d));
});

req.on('error', error => console.error(error));
req.write(data);
req.end();
