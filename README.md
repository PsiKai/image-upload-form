# Upload and Delete Images from MongoDb

A basic form that allows the user to upload images to MongoDb, and an image section that displays all the uploaded images. Each image card has a button to delete the image from the database.

### Technologies Used:

- Node.js
- Express
- EJS
- MongoDB

### Node modules to install:

- express
- body-parser
- multer
- dotenv
- mongoose
- ejs

## Description of Application

A new user will need to create a MongoDb URL and place it in an environment variable. The image added in the file input will be processed by Multer into a buffer string that can be saved in the database. The maximum size of the file is 16 MB.
