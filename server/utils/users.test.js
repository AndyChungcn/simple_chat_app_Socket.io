const expect = require("expect");
const { Users } = require("./users");

describe("Users", () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: "1",
        name: "andy",
        room: "nodejs"
      },
      {
        id: "2",
        name: "john",
        room: "javascript"
      },
      {
        id: "3",
        name: "mike",
        room: "javascript"
      }
    ];
  });

  it("should add new user", () => {
    var users = new Users();
    var user = {
      id: "4",
      name: "Andrew",
      room: "iOS"
    };
    users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it("should remove a user", () => {
    var userId = "1";
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it("should not remove user", () => {
    var userId = "99";
    var user = users.removeUser(userId);

    expect(user).toBeUndefined();
    expect(users.users.length).toBe(3);
  });

  it("should find user", () => {
    var userId = "2";
    var user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it("should not find user", () => {
    var userId = "99";
    var user = users.getUser(userId);

    expect(user).toBeUndefined();
  });

  it("should return names for javascript", () => {
    var userList = users.getUserList("javascript");

    expect(userList).toEqual(["john", "mike"]);
  });

  it("should return names for nodejs", () => {
    var userList = users.getUserList("nodejs");

    expect(userList).toEqual(["andy"]);
  });
});
