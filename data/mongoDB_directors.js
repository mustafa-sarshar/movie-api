/* Diretors -------------------------------------------------
var directorN = {
    "name": "",
    "bio": "",
    "birth": "",
    "death": ""
}
*/
var directors = [];


directors.push({
  name: "Jonathan Demme",
  bio: "Robert Jonathan Demme was an American director, producer, and screenwriter.",
  birth: new Date("1944-01-01"),
  death: new Date("2017-01-01"),
});

directors.push({
  name: "Judd Apatow",
  bio: "Judd Apatow is an American producer, writer, director, actor and stand-up comedian.",
  birth: new Date("1967-01-01"),
  death: "",
});

directors.push({
  name: "James Cameron",
  bio: "James Francis Cameron was born on August 16, 1954 in Kapuskasing, Ontario, Canada. He moved to the United States in 1971. The son of an engineer, he majored in physics at California State University before switching to English, and eventually dropping out. He then drove a truck to support his screenwriting ambition. He landed his first professional film job as art director, miniature-set builder, and process-projection supervisor on Roger Corman's Battle Beyond the Stars (1980) and had his first experience as a director with a two week stint on Piranha II: The Spawning (1981) before being fired.",
  birth: new Date("1954-08-16"),
  death: "",
});

directors.push({
  name: "Sam Raimi",
  bio: 'Highly inventive U.S. film director/producer/writer/actor Sam Raimi first came to the attention of film fans with the savage, yet darkly humorous, low-budget horror film, The Evil Dead (1981). From his childhood, Raimi was a fan of the cinema and, before he was ten-years-old, he was out making movies with an 8mm camera. He was a devoted fan of The Three Stooges, so much of Raimi\'s film work in his teens, with good friends Bruce Campbell and Rob Tapert, was slapstick comedy based around what they had observed from "Stooges" movies.',
  birth: new Date("1959-10-23"),
  death: "",
});

directors.push({
  name: "Joel Schumacher",
  bio: 'Joel Schumacher was an American film director, film producer, screenwriter and fashion designer from New York City. He rose to fame in the 1980s for directing the coming-of-age drama "St. Elmo\'s Fire" (1985), and the vampire-themed horror film "The Lost Boys" (1987). In the 1990s, he worked on two controversial superhero films "Batman Forever" (1995) and "Batman & Robin" (1997). His final high-profile film was "The Phantom of the Opera" (2004). It was an adaptation of Andrew Lloyd Webber\'s 1986 musical, rather than the original novel. Towards the end of his career, Schumacher primarily worked on low-profile films with small budgets.',
  birth: new Date("1939-08-29"),
  death: new Date("2020-06-22"),
});

directors.push({
  name: "Francis Ford Coppola",
  bio: "Francis Ford Coppola born April 7, 1939) is an American film director, producer, and screenwriter. He is considered one of the major figures of the New Hollywood filmmaking movement of the 1960s and 1970s. Coppola is the recipient of five Academy Awards, six Golden Globe Awards, two Palmes d'Or, and a British Academy Film Award (BAFTA).",
  birth: new Date("1939-04-07"),
  death: "",
});

directors.push({
  name: "Steven Spielberg",
  bio: "One of the most influential personalities in the history of cinema, Steven Spielberg is Hollywood's best known director and one of the wealthiest filmmakers in the world. He has an extraordinary number of commercially successful and critically acclaimed credits to his name, either as a director, producer or writer since launching the summer blockbuster with Jaws (1975), and he has done more to define popular film-making since the mid-1970s than anyone else.",
  birth: new Date("1946-12-18"),
  death: "",
});

db.directors.insert(directors);
