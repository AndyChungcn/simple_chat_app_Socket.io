const expect = require("expect");
const { generateMessage, generateLocationMessage } = require("./message");

describe("generateMessage", () => {
  it("should generate correct message object", () => {
    var from = "andy";
    var text = "how is going";
    var message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({ from, text });
  });
});

describe("generateLocationMessage", () => {
  it("should generate correct location message object", () => {
    var from = "andy";
    var lat = 12;
    var lon = 13;
    var url = "https://www.google.com/maps?q=12,13";

    var message = generateLocationMessage("andy", lat, lon);

    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({ from, url });
  });
});
