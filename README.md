# MangTerest
      
Mangterest is a clone of Pinterest what mainly posts anything related to manga covers or art of that sort.

Check out [MangTerest](https://mangaterest.onrender.com/)

## Index

[MVP Feature List](https://github.com/bzhang50167/PintrestClone/wiki/MVP-Feature-List) |
[Database Scheme](https://github.com/bzhang50167/PintrestClone/wiki/DB-Schema) |
[User Stories](https://github.com/bzhang50167/PintrestClone/wiki/User-Stories) |
[Wire Frames](https://github.com/bzhang50167/PintrestClone/wiki/WireFrame) |

## Technologies Used

<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" /><img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" /><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /><img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" /><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />

## Splash Page
![SplashPage](https://github.com/bzhang50167/PintrestClone/assets/117539908/7e5f35c9-064d-4ce1-9068-8d771eb286e8)

## Posts
![Posts](https://github.com/bzhang50167/PintrestClone/assets/117539908/7a66d319-c0e7-4cb2-8bbd-fa2fb8deafd3)


## Post w/ Comments
![Sample Post](https://github.com/bzhang50167/PintrestClone/assets/117539908/dce1e6b8-3848-4a65-b911-3cac4a3de1f8)


## Getting started
1. Clone this repository:

   `
   https://github.com/bzhang50167/PintrestClone
   `
2. Install denpendencies into the Backed and the Frontend by making a terminal for each one and then run the following:

   * `pipenv install -r requirements.txt (for backend)`
   * `npm install (for frontend)`

3. Create a **.env** file using the **.envexample** provided 

4. Set up your database with information from your .env and then run the following to create your database, migrate, and seed: 
 
   * `pipenv run flask db migrate`
   * `pipenv run flask db upgrade` 
   * `pipenv run flask seed all`

5. Start the app for both backend and frontend using:

   * `pipenv run flask run(backend)`
   * `npm start(frontend)`

6. Now you can use the Demo User or Create an account

## Amazon Web Services S3
* For setting up your AWS refer to this [guide](https://github.com/jdrichardsappacad/aws-s3-pern-demo)

***

# Features 

## Posts
* Users can create a Posts
* Users can read/view other Posts
* Users can update their Posts
* Users can delete their Posts

## Comments
* Users can create Comments on Posts
* users can read/view all of the Comments on a Posts
* Users can delete their Comments(s) on a Posts

## Boards
Logged-in Users can
* Create a Boards
* Update their Boards with Posts
* Read all of their Boards
* Deletetheir Boards

## AWS
Logged-in Users can
* Upload images of their posts to AWS S3
