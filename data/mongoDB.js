/* Diretors -------------------------------------------------
var directorN = {
    "name": "",
    "bio": "",
    "birth": "",
    "death": ""
}
*/
var director1 = {
    name: "Jonathan Demme",
    bio: "Robert Jonathan Demme was an American director, producer, and screenwriter.",
};
var director2 = {
    name: "Judd Apatow",
    bio: "Judd Apatow is an American producer, writer, director, actor and stand-up comedian.",
    birth: new Date("1967-01-01"),
    death: "",
};
var director3 = {
    name: "James Cameron",
    bio: "James Francis Cameron was born on August 16, 1954 in Kapuskasing, Ontario, Canada. He moved to the United States in 1971. The son of an engineer, he majored in physics at California State University before switching to English, and eventually dropping out. He then drove a truck to support his screenwriting ambition. He landed his first professional film job as art director, miniature-set builder, and process-projection supervisor on Roger Corman's Battle Beyond the Stars (1980) and had his first experience as a director with a two week stint on Piranha II: The Spawning (1981) before being fired.",
    birth: new Date("1954-08-16"),
    death: "",
};
var director4 = {
    name: "Sam Raimi",
    bio: 'Highly inventive U.S. film director/producer/writer/actor Sam Raimi first came to the attention of film fans with the savage, yet darkly humorous, low-budget horror film, The Evil Dead (1981). From his childhood, Raimi was a fan of the cinema and, before he was ten-years-old, he was out making movies with an 8mm camera. He was a devoted fan of The Three Stooges, so much of Raimi\'s film work in his teens, with good friends Bruce Campbell and Rob Tapert, was slapstick comedy based around what they had observed from "Stooges" movies.',
    birth: new Date("1959-10-23"),
    death: "",
};
var director5 = {
    name: "Joel Schumacher",
    bio: 'Joel Schumacher was an American film director, film producer, screenwriter and fashion designer from New York City. He rose to fame in the 1980s for directing the coming-of-age drama "St. Elmo\'s Fire" (1985), and the vampire-themed horror film "The Lost Boys" (1987). In the 1990s, he worked on two controversial superhero films "Batman Forever" (1995) and "Batman & Robin" (1997). His final high-profile film was "The Phantom of the Opera" (2004). It was an adaptation of Andrew Lloyd Webber\'s 1986 musical, rather than the original novel. Towards the end of his career, Schumacher primarily worked on low-profile films with small budgets.',
    birth: new Date("1939-08-29"),
    death: new Date("2020-06-22"),
};
var director6 = {
    name: "Francis Ford Coppola",
    bio: "Francis Ford Coppola born April 7, 1939) is an American film director, producer, and screenwriter. He is considered one of the major figures of the New Hollywood filmmaking movement of the 1960s and 1970s. Coppola is the recipient of five Academy Awards, six Golden Globe Awards, two Palmes d'Or, and a British Academy Film Award (BAFTA).",
    birth: new Date("1939-04-07"),
    death: "",
};
db.directors.insert([
    director1,
    director2,
    director3,
    director4,
    director5,
    director6,
]);
db.directors.updateOne(
    {
        name: "Jonathan Demme",
    },
    {
        $set: {
            birth: new Date("1944-01-01"),
            death: new Date("2017-01-01"),
        },
    }
);

/* Actors ---------------------------------------------
var actorN = {
    "name": "",
    "bio": "",
    "birth": new Date(""),
    "death": new Date("")
}
*/
var actor1 = {
    name: "JLeonardo DiCaprio",
    bio: "Few actors in the world have had a career quite as diverse as Leonardo DiCaprio's. DiCaprio has gone from relatively humble beginnings, as a supporting cast member of the sitcom Growing Pains (1985) and low budget horror movies, such as Critters 3 (1991), to a major teenage heartthrob in the 1990s, as the hunky lead actor in movies such as Romeo + Juliet (1996) and Titanic (1997), to then become a leading man in Hollywood blockbusters, made by internationally renowned directors such as Martin Scorsese and Christopher Nolan.",
    birth: new Date("1974-11-11"),
    death: "",
};
var actor2 = {
    name: "Billy Zane",
    bio: "William George Zane, better known as Billy Zane, was born on February 24, 1966 in Chicago, Illinois, to Thalia (Colovos) and William Zane, both of Greek ancestry. His parents were amateur actors and managed a medical technical school. Billy has an older sister, actress and singer Lisa Zane. Billy was bitten by the acting bug early on. In his early teens, he attended Harand Camp of the Theater Arts in Elkhart Lake, Wisconsin. In 1982, he attended the American School in Switzerland. His high school days were spent at Francis Parker High School in Chicago, Illinois. Daryl Hannah and Jennifer Beals also attended Parker, prior to Billy's attendance.",
    birth: new Date("1966-02-24"),
    death: "",
};
var actor3 = {
    name: "Kate Winslet",
    bio: "Ask Kate Winslet what she likes about any of her characters, and the word 'ballsy' is bound to pop up at least once. The British actress has made a point of eschewing straightforward pretty-girl parts in favor of more devilish damsels; as a result, she's built an eclectic resume that runs the gamut from Shakespearean tragedy to modern-day mysticism and erotica.",
    birth: new Date("1975-10-05"),
    death: "",
};

db.actors.insert([actor1, actor2, actor3]);

/*  Genres ---------------------------------------------------
var genreN = {
    "name": "",
    "des": ""
}
*/
var genre1 = {
    name: "Thriller",
    des: "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience. Tension is created by delaying what the audience sees as inevitable, and is built through situations that are menacing or where escape seems impossible.",
};
var genre2 = {
    name: "Animated",
    des: "Animation is a method in which pictures are manipulated to appear as moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film.",
};
var genre3 = {
    name: "Comedy",
    des: "Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect.",
};
var genre4 = {
    name: "Drama",
    des: "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.",
};
var genre5 = {
    name: "Romance",
    des: "Romance films or movies involve romantic love stories recorded in visual media for broadcast in theatres or on television that focus on passion, emotion, and the affectionate romantic involvement of the main characters.",
};
var genre6 = {
    name: "Action",
    des: "Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats.",
};

db.genres.insert([genre1, genre2, genre3, genre4, genre5, genre6]);

/*  Movies --------------------------------------------
var movieN = {
    "title": "",
    "des": "",
    "director_id": ObjectId(),
    "genre_id": ObjectId(),
    "image_url": "",
    "featured": true,
}
*/
var movie1 = {
    title: "Silence of the Lambs",
    des: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
    director_id: ObjectId("636541bf216291acecb8d8f5"),
    genre_id: ObjectId("636541f9216291acecb8d8fb"),
    image_url:
        "https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
    featured: true,
};
var movie2 = {
    title: "Titanic",
    des: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
    director_id: ObjectId("636541bf216291acecb8d8f7"),
    genre_id: ObjectId("636541f9216291acecb8d8fe"),
    image_url:
        "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
    featured: true,
};
var movie3 = {
    title: "Terminator 2: Judgment Day",
    des: "A cyborg, identical to the one who failed to kill Sarah Connor, must now protect her ten-year-old son John from a more advanced and powerful cyborg.",
    director_id: ObjectId("636541bf216291acecb8d8f7"),
    genre_id: ObjectId("636541f9216291acecb8d900"),
    image_url:
        "https://m.media-amazon.com/images/M/MV5BMGU2NzRmZjUtOGUxYS00ZjdjLWEwZWItY2NlM2JhNjkxNTFmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
    featured: true,
};
var movie4 = {
    title: "Spider-Man",
    des: "After being bitten by a genetically-modified spider, a shy teenager gains spider-like abilities that he uses to fight injustice as a masked superhero and face a vengeful enemy.",
    director_id: ObjectId("636541bf216291acecb8d8f8"),
    genre_id: ObjectId("636541f9216291acecb8d900"),
    image_url:
        "https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_.jpg",
    featured: true,
};
var movie5 = {
    title: "Batman Forever",
    des: "Batman must battle former district attorney Harvey Dent, who is now Two-Face and Edward Nygma, The Riddler with help from an amorous psychologist and a young circus acrobat who becomes his sidekick, Robin.",
    director_id: ObjectId("636541bf216291acecb8d8f9"),
    genre_id: ObjectId("636541f9216291acecb8d900"),
    image_url:
        "https://m.media-amazon.com/images/M/MV5BNDdjYmFiYWEtYzBhZS00YTZkLWFlODgtY2I5MDE0NzZmMDljXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg",
    featured: true,
};
var movie6 = {
    title: "Batman & Robin",
    des: "Batman and Robin try to keep their relationship together even as they must stop Mr. Freeze and Poison Ivy from freezing Gotham City.",
    director_id: ObjectId("636541bf216291acecb8d8f9"),
    genre_id: ObjectId("636541f9216291acecb8d8fb"),
    image_url:
        "https://m.media-amazon.com/images/M/MV5BMGQ5YTM1NmMtYmIxYy00N2VmLWJhZTYtN2EwYTY3MWFhOTczXkEyXkFqcGdeQXVyNTA2NTI0MTY@._V1_FMjpg_UX1000_.jpg",
    featured: true,
};
var movie7 = {
    title: "The Number 23",
    des: "Walter Sparrow becomes obsessed with a novel that he believes was written about him, as more and more similarities between himself and his literary alter ego seem to arise.",
    director_id: ObjectId("636541bf216291acecb8d8f9"),
    genre_id: ObjectId("636541f9216291acecb8d900"),
    image_url:
        "https://m.media-amazon.com/images/M/MV5BZDg0YzAxZGYtNTdkYy00ZmUyLWIwNDQtOTA0NGNlZGZiMjkwXkEyXkFqcGdeQXVyMjQwMjk0NjI@._V1_FMjpg_UX1000_.jpg",
    featured: true,
};
var movie8 = {
    title: "Cousins",
    des: "Two couples go to a mutual friend's wedding and end up swapping partners.",
    director_id: ObjectId("636541bf216291acecb8d8f9"),
    genre_id: ObjectId("636541f9216291acecb8d8fd"),
    image_url:
        "https://m.media-amazon.com/images/M/MV5BMmUwMjI5MjYtZmU5MC00MTcwLWIyNDItMjc2YTIzNWEzOGZlXkEyXkFqcGdeQXVyMTgxMDk4MTE@._V1_FMjpg_UX1000_.jpg",
    featured: true,
};
var movie9 = {
    title: "Avatar",
    des: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
    director_id: ObjectId("636541bf216291acecb8d8f7"),
    genre_id: ObjectId("636541f9216291acecb8d900"),
    image_url:
        "https://m.media-amazon.com/images/M/MV5BNjA3NGExZDktNDlhZC00NjYyLTgwNmUtZWUzMDYwMTZjZWUyXkEyXkFqcGdeQXVyMTU1MDM3NDk0._V1_FMjpg_UX1000_.jpg",
    featured: true,
};
var movie10 = {
    title: "The Godfather",
    des: "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.",
    director_id: ObjectId("636541bf216291acecb8d8fa"),
    genre_id: ObjectId("636541f9216291acecb8d900"),
    image_url:
        "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg",
    featured: true,
};

db.movies.insert([
    movie1,
    movie2,
    movie3,
    movie4,
    movie5,
    movie6,
    movie7,
    movie8,
    movie9,
    movie10,
]);

/* Users -------------------------------------------------------
var userN = {
    "username": "",
    "pass": "",
    "email": "",
    "birth": "",
}
*/
var user1 = {
    username: "user1",
    pass: "user1pass",
    email: "user1@mail.com",
    birth: new Date("1999-05-15"),
};
var user2 = {
    username: "user2",
    pass: "user2pass",
    email: "user2@mail.com",
    birth: new Date("2000-06-10"),
};
var user3 = {
    username: "user3",
    pass: "user3pass",
    email: "user3@mail.com",
    birth: new Date("1980-01-01"),
};
var user4 = {
    username: "user4",
    pass: "user4pass",
    email: "user4@mail.com",
    birth: new Date("2005-01-20"),
};
var user5 = {
    username: "user5",
    pass: "user5pass",
    email: "user5@mail.com",
    birth: new Date("1988-11-15"),
};
db.users.insert([user1, user2, user3, user4, user5]);

// Queries
// All Movies that their director is: 'James Cameron'
db.movies.find({
    director_id: db.directors.findOne({ name: "James Cameron" })._id,
});

// All Movies that their genre is: 'Thriller'
db.movies.find({ genre_id: db.genres.findOne({ name: "Thriller" })._id });

// All Movies that their director is: 'James Cameron' AND genre is: 'Action';
db.movies.find({
    director_id: db.directors.findOne({ name: "James Cameron" })._id,
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
            favList: ObjectId(
                db.movies.findOne({ title: "Batman & Robin" })._id
            ),
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
            favList: ObjectId(
                db.movies.findOne({ title: "The Godfather" })._id
            ),
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
            favList: ObjectId(
                db.movies.findOne({ title: "The Number 23" })._id
            ),
        },
    }
);
// Delete the user: 'user1'
db.users.deleteOne({ username: "user5" });

// Read all users
db.users.find();
