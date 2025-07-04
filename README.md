# DEV-TINDER


I'm building a dev tinder platform to connect with different developers to have 
conversations within developer communities to make friends and share their experiences work and about the latest technology trends , technologies

This application consists of backend and frontend user interface to be hosted

Firstly , we will see the backend where i have developed the api's using node ExpressJS and mongoDB

The dev-tinder platform comprises of below listed functionalities

<!--   INITIAL LOGIN   -->

Register
Upload Profile Details
Login 
Update Profile
Get Profile Details
Create a new Profile resource
Delete a profile

<!-- AFTER LOGIN APIS -->

Feed populated connections
send requests - Accepted/ignored
review requests - Accepted/Rejected
allSendRequests
allConnections

<!--  ADDED MIDDLEWARE AND CREATED ROUTES  -->

Created Middlewares to handle Authentication
Cross Cutting concerns before access the route handler
Created Intital Create , Get , Update, Delete api's for user,

<!-- Explored Schema Types options   -->

added require, unique, min, minlength,trim and default for schema validations
created a  custom validation function for gender
Improved the schema validations
Added timestamps


<!-- Validate Data -->

Validate the incoming request data 
Encrypted user password by node package bcrypt
Saved the user with bcrypt password

<!-- Authentication using JWT token  -->

install cookie-parser to allow passage of cookies
creating jwt token after validating user password and credentials
storing the user token in cookies
retrieving user information based upon the cookie from profile api

<!--  User Authentication  -->

add userAuth middleware to route handler for authentication
set the expiry for JWT token and cookies to 7 days 
created user jwt token in schema methods