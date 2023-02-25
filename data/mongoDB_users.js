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
