# DEV_TINDER_FRONTEND

- Created a vite + React Application
- Remove unnecessary code and create a Hello World app
- Installed tailwind css
- Install Daisy UI
- Add NavBar Component to App.jsx
- Install react-router-dom
- Create Browser Router -> Routes -> Route=/Body > RouteChildren
- Create an outlet
- Create a Footer
- Create a Login Page
- Install axios
- CORS - install cors in backend to whitlish apis for communication with frontend by adding middleware using cors configurations by specifying credentials:true
- Whenever making an api call in order to retrieve cookie with axios specify set withCredentials : true
- Install Redux Toolkit https://redux-toolkit.js.org/tutorials/quick-start
- Install react-redux + @reduxjs/toolkit => configureStore => Provider => createSlice => add reducer to store =>
- configureStore -> Provider -> createSlice -> add Reducer to the store
- If token is not present the user is redirect to home page
- Restricted to access only authenticated routes using authwrapper
- Implemented Logout functionality
- Created a Profile and Feed Component Page
- Implemented the edit user details for profile page
- Toast on successfull submission of user details
- Implemented Connection Component
- Implemented Connection Requests Component
- Implemented functionality for accept / decline requests received from other users

# DEPLOYMENT

- Deployment sign up and create an account in AWS
- Launch Instance
  (change and allow the permissions as per below command)
- chmod 400 filename.pem
- Connect to machine using ssh command from aws using ssh -i "devtinder-secret.pem" ubuntu@ec2-13-234-76-11.ap-south-1.compute.amazonaws.com
- Install node in the virtual version
- Git clone https://github.com/narayanavarma1999/DEV-TINDER.git

- FOR FRONTEND DEPLOYMENT

- install npm dependencies using npm install
- build the project using npm run build on virtual remote machine
- now dist folder is created
- To install nginx
- first update system dependencies using sudo apt update
- next install using sudo apt install nginx
- use sudo systemctl start nginx
- use sudo systemctl enable nginx
- go to path cd /var/www/html/
- go to code and go to your project folder (not dist folder only project folder)
- copy code from dist folder (build files) to /var/www/html/ path using commmand below
- sudo scp -r dist/* /var/www/html/
- now go to aws and run using ur ip address but it will not work
- as now our code is at nginx as nginx by default runs at port 80 we need to make some changes in aws security
- Enable port 80
- to do go to aws and in security click on securityId to allow port 80 and add Edit inbound rules inbound security
