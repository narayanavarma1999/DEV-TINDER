# DEV-TINDER

I'm building a dev tinder platform to connect with different developers to have
conversations within developer communities to make friends and share their experiences work and about the latest technology trends , technologies

This application consists of backend and frontend user interface to be hosted

Firstly , we will see the backend where i have developed the api's using node ExpressJS and mongoDB

The dev-tinder platform comprises of below listed functionalities

<!--   INITIAL LOGIN   -->

- Register
- Upload Profile Details
- Login
- Update Profile
- Get Profile Details
- Create a new Profile resource
- Delete a profile

<!-- AFTER LOGIN APIS -->

- Feed populated connections
- send requests - Accepted/ignored
- review requests - Accepted/Rejected
- allSendRequests
- allConnections

<!--  ADDED MIDDLEWARE AND CREATED ROUTES  -->

- Created Middlewares to handle Authentication
- Cross Cutting concerns before access the route handler
- Created Intital Create , Get , Update, Delete api's for user,

<!-- Explored Schema Types options   -->

- added require, unique, min, minlength,trim and default for schema validations
- created a custom validation function for gender
- Improved the schema validations
- Added timestamps

<!-- Validate Data -->

- Validate the incoming request data
- Encrypted user password by node package bcrypt
- Saved the user with bcrypt password

<!-- Authentication using JWT token  -->

- install cookie-parser to allow passage of cookies
- creating jwt token after validating user password and credentials
- storing the user token in cookies
- retrieving user information based upon the cookie from profile api

<!--  User Authentication  -->

- add userAuth middleware to route handler for authentication
- set the expiry for JWT token and cookies to 7 days
- created user jwt token in schema methods

<!-- Creating Profile APIs -->

- create POST a logout api
- create PATCH /profile/edit
- create PATCH /profile/forgotpassword api
- make sure all payload and data in POST and PATCH apis are validated and santizied

<!--  More About Indexing  -->

- What is an index
- Why do we need index (or) indexing
- What are the advantages and disadvantages of indexes
- schema pre functions

<!-- Implemented Connections Feed Api -->
- find all connections associated with loggedIn user
- Eliminate current loggedIn userId and all associated connections request userIds
- and retrive all other userIds expect above mentioned userIds
- Add pagination to limit the extraction of results


<!-- DEPLOYMENT  -->

- enable Ec2 instance in public in mongo atlas serve
- enable to access the port from aws security inbound by adding port 3000 to security inbounds
- install pm2 using npm install -g pm2
- pm2 start npm -- start  
- for custom name pm2 start npm --name "devtinder-backend" --start
- pm2 logs, pm2 list, pm2 flush <name>, pm2 stop <name>, pm2 delete <name>
- config nginx - /etc/nginx/sites-available/default
- restart nginx - sudo systemctl restart nginx
- Modify the BASEURL in frontend project to "/api"

Frontend - http://13.234.76.11
Backend - http://13.234.76.11:3000/


Modify the path using nginx path 

 server_name http://13.234.76.11;

    location /api/ {
        proxy_pass http://localhost:3000/;  # Pass the request to the Node.js app
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }