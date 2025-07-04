<!-- Dev-Tinder API's  -->
# APIs

# Auth Router

- POST /signup
- POST /login
- POST /logout

# Profile Router

- GET    /profile/view
- PATCH  /profile/edit
- PATCH  /profile/password
       
       # FEED APIs

# User Sending Requests Connections Router

status - ignore, interested, accepted, rejected

like (or) interested api for sending requests

- POST /request/send/interested/:userId 
- POST /request/send/pass/:userId

# User Review (or) Received Requests

receive (or) review requests

- POST /request/review/accepted/:requestId
- POST /request/review/decline/:requestId 

# User Connections Requests

connections

- GET  /connections
- GET  /request/received
- GET  /feed  - Gets you (user) all other profiles on the platform