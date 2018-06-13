const expect = require("chai").expect;
describe("Timeline Feature Tests", function() {
  beforeEach(function() {
    browser.url("./");
    browser.waitForExist("#post-editor");
    browser.setValue("#post-editor", "");
  });
  describe("unsuccessful submission are passing", function() {
    it("Empthy submission not allowed", function() {
      const testText = "New feature Test Post";
      browser.click("#submitPost");
      browser.waitForValue("#content-error-text");
      const innerHTML = browser.getHTML("#content-error-text", false);
      expect(innerHTML).to.equal(
        "Your mind is empthy? Please write something for publish!"
      );
    });
    it("Long Content not allowed", function() {
      const testText =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in dolor ligula. Praesent at massa ante. Vivamus eget orci sed magna euismod massa nunc.";
      browser.setValue("#post-editor", testText);
      browser.click("#submitPost");
      browser.waitForValue("#content-error-text");
      const innerHTML = browser.getHTML("#content-error-text", false);
      expect(innerHTML).to.equal(
        "The message is too long (MAX 150 characters allowed)"
      );
    });
  });

  describe("successful submission", function() {
    it("Post new content should appear", function() {
      browser.waitForExist(".timline-posts");
      const beforeInsertCount = $$(".timline-posts > div").length;
      browser.setValue("#post-editor", "New feature Test Post");
      browser.click("#submitPost");

      browser.waitUntil(
        function() {
          return $$(".timline-posts > div").length === beforeInsertCount + 1;
        },
        5000,
        "expected text to be appear in 5s"
      );
    });

    it("Post new content confirmation should apper", function() {
      browser.waitForExist(".timline-posts");
      browser.setValue("#post-editor", "New feature Test Post");
      browser.click("#submitPost");

      browser.waitForExist(".publish-success");
    });
  });

  describe("message delete are passing", function() {
    it("Delete message", function() {
      browser.waitForExist(".timline-posts");
      const beforeInsertCount = $$(".timline-posts > div").length;
      browser.click(".timline-posts .btn-delete");
      browser.waitUntil(
        function() {
          return $$(".timline-posts > div").length === beforeInsertCount - 1;
        },
        5000,
        "expected text to be deleted in 5s"
      );
    });
  });
});
