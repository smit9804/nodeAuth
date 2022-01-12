<h2>Here is a basic authentication microservice using NodeJS and Express.</h2>

<h2>GitHub Link: https://github.com/smit9804/nodeAuth</h2>
<h2> API Calls </h2>

programs required to install:
<br>
bcrypt body-parser express express-validator jsonwebtoken mongoose

Register
http://localhost:4000/user/signup
<br>
-Requires the user to provide an email and password

Login
http://localhost:4000/user/login
<br>
-Requires the user to provide an email and password that matches what is in the database.
<br>
-Signs a JWT access token and a refresh token to the user 

Read out user info
http://localhost:4000/user/userInfo/:id
<br>
-Requires the user to have the id of the User requested.
<br>
-Requires the JWT to be as a header named "token".

Update User information
http://localhost:4000/user/updateUserInfo/:id
<br>
-Requires the user to have the id of the User requested
<br>
-Requires the JWT to be as a header named "token"
<br>
-Updates the user information. (recommend to input user information as a json object).

Delete User account from database
http://localhost:4000/user/deleteUser/:id
<br>
-Requires the user to have the id of the User requested
<br>
-Requires the JWT to be as a header named "token"
<br>
-Deletes the user account from the database.

-To run this application:
<br>
In a gitbash terminal:
<br>
nodemon server.js 
<br>
(if not installed, run "npm install nodemon --save")
<br>
This will fire the server up on port 4000.
<br>
All API tests were run using the Postman application.
<br>
Screenshots of all tests are in the "images" folder


