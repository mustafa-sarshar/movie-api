/*  Movies --------------------------------------------
var movieN = {
    "title": "",
    "des": "",
    "directors": ObjectId(),
    "genres": ObjectId(),
    "image_url": "",
    "featured": true,
}
*/

var movies = [];

movies.push({
  title: "Silence of the Lambs",
  des: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
  directors: [ObjectId(db.directors.findOne({ name: "Jonathan Demme" })._id)],
  genres: [
    ObjectId(db.genres.findOne({ name: "Crime" })._id),
    ObjectId(db.genres.findOne({ name: "Drama" })._id),
    ObjectId(db.genres.findOne({ name: "Thriller" })._id),
  ],
  stars: [
    ObjectId(db.actors.findOne({ name: "Jodie Foster" })._id),
    ObjectId(db.actors.findOne({ name: "Anthony Hopkins" })._id),
    ObjectId(db.actors.findOne({ name: "Lawrence A. Bonney" })._id),
  ],
  image_url:
    "https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
  featured: true,
});

movies.push({
  title: "Titanic",
  des: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
  directors: [ObjectId(db.directors.findOne({ name: "James Cameron" })._id)],
  genres: [
    ObjectId(db.genres.findOne({ name: "Drama" })._id),
    ObjectId(db.genres.findOne({ name: "Romance" })._id),
  ],
  stars: [
    ObjectId(db.actors.findOne({ name: "Leonardo DiCaprio" })._id),
    ObjectId(db.actors.findOne({ name: "Kate Winslet" })._id),
    ObjectId(db.actors.findOne({ name: "Billy Zane" })._id),
  ],
  image_url:
    "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
  featured: true,
});

movies.push({
  title: "Terminator 2: Judgment Day",
  des: "A cyborg, identical to the one who failed to kill Sarah Connor, must now protect her ten-year-old son John from a more advanced and powerful cyborg.",
  directors: [ObjectId(db.directors.findOne({ name: "James Cameron" })._id)],
  genres: [
    ObjectId(db.genres.findOne({ name: "Action" })._id),
    ObjectId(db.genres.findOne({ name: "Sci-fi" })._id),
  ],
  stars: [
    ObjectId(db.actors.findOne({ name: "Arnold Schwarzenegger" })._id),
    ObjectId(db.actors.findOne({ name: "Linda Hamilton" })._id),
    ObjectId(db.actors.findOne({ name: "Edward Furlong" })._id),
  ],
  image_url:
    "https://m.media-amazon.com/images/M/MV5BMGU2NzRmZjUtOGUxYS00ZjdjLWEwZWItY2NlM2JhNjkxNTFmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
  featured: true,
});

movies.push({
  title: "Spider-Man",
  des: "After being bitten by a genetically-modified spider, a shy teenager gains spider-like abilities that he uses to fight injustice as a masked superhero and face a vengeful enemy.",
  directors: [ObjectId(db.directors.findOne({ name: "Sam Raimi" })._id)],
  genres: [
    ObjectId(db.genres.findOne({ name: "Action" })._id),
    ObjectId(db.genres.findOne({ name: "Adventure" })._id),
    ObjectId(db.genres.findOne({ name: "Sci-fi" })._id),
  ],
  stars: [],
  image_url:
    "https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_.jpg",
  featured: true,
});

movies.push({
  title: "Batman Forever",
  des: "Batman must battle former district attorney Harvey Dent, who is now Two-Face and Edward Nygma, The Riddler with help from an amorous psychologist and a young circus acrobat who becomes his sidekick, Robin.",
  directors: [ObjectId(db.directors.findOne({ name: "Joel Schumacher" })._id)],
  genres: [
    ObjectId(db.genres.findOne({ name: "Action" })._id),
    ObjectId(db.genres.findOne({ name: "Adventure" })._id),
  ],
  stars: [],
  image_url:
    "https://m.media-amazon.com/images/M/MV5BNDdjYmFiYWEtYzBhZS00YTZkLWFlODgtY2I5MDE0NzZmMDljXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg",
  featured: true,
});

movies.push({
  title: "Batman & Robin",
  des: "Batman and Robin try to keep their relationship together even as they must stop Mr. Freeze and Poison Ivy from freezing Gotham City.",
  directors: [ObjectId(db.directors.findOne({ name: "Joel Schumacher" })._id)],
  genres: [
    ObjectId(db.genres.findOne({ name: "Action" })._id),
    ObjectId(db.genres.findOne({ name: "Sci-fi" })._id),
  ],
  stars: [],
  image_url:
    "https://m.media-amazon.com/images/M/MV5BMGQ5YTM1NmMtYmIxYy00N2VmLWJhZTYtN2EwYTY3MWFhOTczXkEyXkFqcGdeQXVyNTA2NTI0MTY@._V1_FMjpg_UX1000_.jpg",
  featured: true,
});

movies.push({
  title: "The Number 23",
  des: "Walter Sparrow becomes obsessed with a novel that he believes was written about him, as more and more similarities between himself and his literary alter ego seem to arise.",
  directors: [ObjectId(db.directors.findOne({ name: "Joel Schumacher" })._id)],
  genres: [
    ObjectId(db.genres.findOne({ name: "Crime" })._id),
    ObjectId(db.genres.findOne({ name: "Mystery" })._id),
    ObjectId(db.genres.findOne({ name: "Thriller" })._id),
  ],
  stars: [],
  image_url:
    "https://m.media-amazon.com/images/M/MV5BZDg0YzAxZGYtNTdkYy00ZmUyLWIwNDQtOTA0NGNlZGZiMjkwXkEyXkFqcGdeQXVyMjQwMjk0NjI@._V1_FMjpg_UX1000_.jpg",
  featured: true,
});

// movies.push({
//   title: "Cousins",
//   des: "Two couples go to a mutual friend's wedding and end up swapping partners.",
//   directors: [ObjectId(db.directors.findOne({ name: "Joel Schumacher" })._id)],
//   genres: [
//     ObjectId(db.genres.findOne({ name: "Comedy" })._id),
//     ObjectId(db.genres.findOne({ name: "Romance" })._id),
//   ],
//   stars: [],
//   image_url:
//     "https://m.media-amazon.com/images/M/MV5BMmUwMjI5MjYtZmU5MC00MTcwLWIyNDItMjc2YTIzNWEzOGZlXkEyXkFqcGdeQXVyMTgxMDk4MTE@._V1_FMjpg_UX1000_.jpg",
//   featured: true,
// });

movies.push({
  title: "Avatar",
  des: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
  directors: [ObjectId(db.directors.findOne({ name: "James Cameron" })._id)],
  genres: [
    ObjectId(db.genres.findOne({ name: "Action" })._id),
    ObjectId(db.genres.findOne({ name: "Adventure" })._id),
    ObjectId(db.genres.findOne({ name: "Fantasy" })._id),
  ],
  stars: [],
  image_url:
    "https://m.media-amazon.com/images/M/MV5BNjA3NGExZDktNDlhZC00NjYyLTgwNmUtZWUzMDYwMTZjZWUyXkEyXkFqcGdeQXVyMTU1MDM3NDk0._V1_FMjpg_UX1000_.jpg",
  featured: true,
});

movies.push({
  title: "The Godfather",
  des: "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.",
  directors: [
    ObjectId(db.directors.findOne({ name: "Francis Ford Coppola" })._id),
  ],
  genres: [
    ObjectId(db.genres.findOne({ name: "Crime" })._id),
    ObjectId(db.genres.findOne({ name: "Drama" })._id),
  ],
  stars: [ObjectId(db.actors.findOne({ name: "Marlon Brando" })._id)],
  image_url:
    "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg",
  featured: true,
});

movies.push({
  title: "Indiana Jones and the Last Crusade",
  des: "In 1938, after his father goes missing while pursuing the Holy Grail, Indiana Jones finds himself up against the Nazis again to stop them from obtaining its powers.",
  directors: [ObjectId(db.directors.findOne({ name: "Steven Spielberg" })._id)],
  genres: [
    ObjectId(db.genres.findOne({ name: "Action" })._id),
    ObjectId(db.genres.findOne({ name: "Adventure" })._id),
  ],
  stars: [
    ObjectId(db.actors.findOne({ name: "Harrison Ford" })._id),
    ObjectId(db.actors.findOne({ name: "Sean Connery" })._id),
    ObjectId(db.actors.findOne({ name: "Alison Doody" })._id),
  ],
  image_url:
    "https://upload.wikimedia.org/wikipedia/en/8/8c/Indiana_Jones_and_the_Last_Crusade.png",
  featured: true,
});

db.movies.insert(movies);
