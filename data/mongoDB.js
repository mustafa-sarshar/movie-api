// Queries
// All Movies that their director is: 'James Cameron'
db.movies.find({
  directors: db.directors.findOne({ name: "James Cameron" })._id,
});

// All Movies that their genre is: 'Thriller'
db.movies.find({ genre_id: db.genres.findOne({ name: "Thriller" })._id });

// All Movies that their director is: 'James Cameron' AND genre is: 'Action';
db.movies.find({
  directors: db.directors.findOne({ name: "James Cameron" })._id,
  genre_id: db.genres.findOne({ name: "Action" })._id,
});

// Update the description of the Movie: 'Spider-Man'
db.movies.update(
  { title: "Spider-Man" },
  {
    $set: {
      des: "The fictional character Spider-Man, a comic book superhero created by Stan Lee and Steve Ditko and featured in Marvel Comics publications, has appeared as a main character in numerous theatrical and made-for-television films.",
    },
  }
);

db.movies.update(
  { title: "Titanic" },
  {
    $set: {
      stars: [
        db.actors.findOne({ name: "JLeonardo DiCaprio" })._id,
        db.actors.findOne({ name: "Billy Zane" })._id,
        db.actors.findOne({ name: "Kate Winslet" })._id,
      ],
    },
  }
);

// Update the bio of the director: 'James Cameron'
db.directors.update(
  { name: "James Cameron" },
  {
    $set: {
      bio: "James Cameron is a critically acclaimed film director known for some of the biggest box-office hits of all time. A science-fiction fan as a child, he went on to produce and direct films including The Terminator, Aliens and Avatar. He has received numerous Academy Awards and nominations for his often large-scale, expensive productions. His most noted work, 1997's Titanic, became the first film to earn more than $1 billion and landed 14 Academy Award nominations. Cameron took home three Oscars himself for the project: Best Director, Best Film Editing and Best Picture.",
    },
  }
);

// Update the favorite list of the user: 'user1'
db.users.update(
  { username: "user1" },
  {
    $push: {
      favList: ObjectId(db.movies.findOne({ title: "Spider-Man" })._id),
    },
  }
);
db.users.update(
  { username: "user1" },
  {
    $push: {
      favList: ObjectId(db.movies.findOne({ title: "Batman & Robin" })._id),
    },
  }
);
db.users.update(
  { username: "user1" },
  {
    $push: {
      favList: ObjectId(db.movies.findOne({ title: "Avatar" })._id),
    },
  }
);

db.users.update(
  { username: "user1" },
  {
    $push: {
      favList: ObjectId(db.movies.findOne({ title: "Cousins" })._id),
    },
  }
);

db.users.update(
  { username: "user2" },
  {
    $push: {
      favList: ObjectId(db.movies.findOne({ title: "The Godfather" })._id),
    },
  }
);

db.users.update(
  { username: "user3" },
  {
    $push: {
      favList: ObjectId(
        db.movies.findOne({ title: "Silence of the Lambs" })._id
      ),
    },
  }
);

db.users.update(
  { username: "user3" },
  {
    $push: {
      favList: ObjectId(
        db.movies.findOne({ title: "Terminator 2: Judgment Day" })._id
      ),
    },
  }
);

db.users.update(
  { username: "user4" },
  {
    $push: {
      favList: ObjectId(db.movies.findOne({ title: "Titanic" })._id),
    },
  }
);

db.users.update(
  { username: "user4" },
  {
    $push: {
      favList: ObjectId(db.movies.findOne({ title: "The Number 23" })._id),
    },
  }
);
// Delete the user: 'user1'
db.users.deleteOne({ username: "user5" });

// Read all users
db.users.find();
