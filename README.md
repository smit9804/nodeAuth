<h2>Here is a basic authentication microservice using NodeJS and Express.</h2>

<h2> API Calls </h2>

Register
http://localhost:4000/user/signup
-Requires the user to provide an email and password

Login
http://localhost:4000/user/login
-Requires the user to provide an email and password that matches what is in the database.
-Signs a JWT access token and a refresh token to the user 

Read out user info
http://localhost:4000/user/userInfo/:id
-Requires the user to have the id of the User requested.
-Requires the JWT to be as a header named "token".

Update User information
http://localhost:4000/user/updateUserInfo/:id
-Requires the user to have the id of the User requested
-Requires the JWT to be as a header named "token"
-Updates the user information. (recommend to input user information as a json object).

Delete User account from database
http://localhost:4000/user/deleteUser/:id
-Requires the user to have the id of the User requested
-Requires the JWT to be as a header named "token"
-Deletes the user account from the database.

-To run this application:
In a gitbash terminal:
nodemon server.js (if not installed, run "npm install nodemon --save")
This will fire the server up on port 4000.

I ran all of my api tests in Postman.

Screenshots of all tests are in the "images" folder


