## Setup and configure the Front End virtual server (requirements and steps)

- Have Node v16.15.0 installed
- Have npm v8.5.5 installed
- In the console, write the command: npm install
- If the URL of your virtual server is different than http://127.0.0.1:8000 , change it in one of the application’s variables
    - Go to the directory: ./test-scopic-fe/.env.development
    - Change the apiUrl to yours
- In the console, write the command: npm run start
- After the previous command, the virtual host for the front end will be configured. Go to URL http://localhost:3000/ , this will be the URL where we can test the application
- Do not close this console
## Application

- CREDENTIALS:
    - ADMIN: admin1/admin1
    - USER: user1/user1
-	There is a TXT file in which different image URLs are found that should be used for testing the app.
