# MovieApi

## OBJECTIVES

- To build the server-side component of a “movies” web application.
- This web application will provide users with access to information about different movies, directors, actors, and genres.
- Users will be able to sign up, update their personal information, and create a list of their favorite movies.

## LEARN MORE ABOUT THE APIs [🔗🧩](https://musto-movie-api-vf0k.onrender.com/)

## CODE DOCUMENTATION [🔗📋️](https://mustafa-sarshar.github.io/movie-api/)

## THE 5 Ws

- Who — The immediate users will be frontend developers who’ll work on the client-side for the application based on what’s been documented on the server-side (in this case, this developer is also me!). I should also consider the users of the [Musto Flix (React)](https://mustafa-sarshar.github.io/musto-flix-react/) | [Musto Flix (Angular)](https://mustafa-sarshar.github.io/musto-flix-angular) application. These will be movie enthusiasts who enjoy reading information about different movies.
- What — The complete server-side of the web application, including the server, business logic, and business layers of the application. It will consist of a well-designed REST API and architected database built using JavaScript, Node.js, Express, and MongoDB. The REST API will be accessed via commonly used HTTP methods like GET and POST. Similar methods (CRUD) will be used to retrieve data from your database and store that data in a non-relational way.
- When — Whenever users of [Musto Flix (React)](https://mustafa-sarshar.github.io/musto-flix-react/) | [Musto Flix (Angular)](https://mustafa-sarshar.github.io/musto-flix-angular) are interacting with the application, the server-side of the application will be in use, processing their requests and performing operations against the data in the database. These users will be able to use the [Musto Flix (React)](https://mustafa-sarshar.github.io/musto-flix-react/) | [Musto Flix (Angular)](https://mustafa-sarshar.github.io/musto-flix-angular) application whenever they like to read information about different movies or update their user information, for instance, their list of “Favorite Movies.”
- Where — The application will be hosted online. The [Musto Flix (React)](https://mustafa-sarshar.github.io/musto-flix-react/) | [Musto Flix (Angular)](https://mustafa-sarshar.github.io/musto-flix-angular) application itself is responsive and
  can therefore be used anywhere and on any device, giving all users the same experience.
- Why — Movie enthusiasts want to be able to access information about different movies, directors, actors, and genres. The server-side of the [Musto Flix (React)](https://mustafa-sarshar.github.io/musto-flix-react/) | [Musto Flix (Angular)](https://mustafa-sarshar.github.io/musto-flix-angular) application will ensure they have access to this information, that their requests can be processed, and that all necessary data can be stored.

## USER STORIES

- As a user, I want to be able to receive information on movies, directors, and genres so that I can learn more about movies I’ve watched or am interested in.
- As a user, I want to be able to create a proﬁle so I can save data about my favorite movies.

## FEATURE REQUIREMENTS

- Return a list of ALL movies to the user
- Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
- Return data about a genre (description) by name/title (e.g., “Thriller”)
- Return data about a director (bio, birth year, death year) by name
- Return data about an actor (bio, birth year, death year) by name
- Allow new users to register
- Allow users to update their user info (username, password, email, date of birth)
- Allow users to add a movie to their list of favorites
- Allow users to remove a movie from their list of favorites
- Allow existing users to deregister

## TECHNOLOGIES USED

- Node.js
- Express.js
- MongoDB
