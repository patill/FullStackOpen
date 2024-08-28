import { listWithManyBlogs } from "./test_helper";

Cypress.Commands.add("createBlog", (content, token) => {
  cy.request({
    url: "http://localhost:3003/api/blogs",
    method: "POST",
    body: content,
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
});

Cypress.Commands.add("login", ({ username, password }) => {
  cy.request({ url: "http://localhost:3000", method: "GET" });
  cy.get("#username").type(username);
  cy.get("#password").type(password);
  cy.get("button").click();
});

describe("Blog app", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      _id: "66cc583a9195d1e7366e18bf",
      name: "Testuser",
      username: "test",
      password: "ValidationPassword",
    };
    const user2 = {
      _id: "66cc583a9195d1e7366e18ba",
      name: "Testuser2",
      username: "notTest",
      password: "ValidationPassword",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user2);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log into application");
  });

  it("user can login", function () {
    cy.get("#username").type("test");
    cy.get("#password").type("ValidationPassword");
    cy.get("button").click();
    cy.contains("Blogs");
  });

  it("Wrong user credentials dont log user in", function () {
    cy.get("#username").type("test2");
    cy.get("#password").type("Validation");
    cy.get("button").click();
    cy.contains("wrong credentials");
  });

  describe("When user is logged in", function () {
    this.beforeEach(function () {
      cy.login({ username: "test", password: "ValidationPassword" });
    });

    it("A new blog can be added", function () {
      cy.contains("Post a new blog").click();
      cy.get("form").contains("Blog").as("blogtitle");
      cy.get("form").contains("Author").as("blogauthor");
      cy.get("form").contains("Url").as("blogurl");
      cy.get("@blogtitle").find("input").type("The testing is going on");
      cy.get("@blogauthor").find("input").type("John Tester");
      cy.get("@blogurl").find("input").type("www.theTesting.com");
      cy.contains("Send").click();

      cy.contains("The testing is going on");
    });

    describe("when there are some blogs", function () {
      beforeEach(function () {
        let token;
        cy.request("POST", "http://localhost:3003/api/login", {
          username: "test",
          password: "ValidationPassword",
        })
          .then((response) => {
            token = response.body;
            console.log(token.token);
          })
          .then(() => {
            listWithManyBlogs.forEach((entry) => {
              cy.createBlog(entry, token.token);
            });
            cy.visit("http://localhost:3000");
          });
      });
      it("one blog has the name Go To Statement Considered Harmful", function () {
        cy.contains("Go To Statement Considered Harmful");
      });

      it("The user can click the like button", function () {
        cy.contains("TDD harms architecture").as("blogentry");
        cy.get("@blogentry").parent().contains("show").click();
        cy.get("@blogentry").parent().find(".blog-likes").as("likes");
        cy.get("@likes").find("button").click();

        cy.contains("TDD harms architecture").as("updatedEntry");
        cy.get("@updatedEntry").parent().contains("likes: 1");
      });

      it("The user who added a blog can also remove it", function () {
        cy.contains("TDD harms architecture").as("blogentry");
        cy.get("@blogentry").parent().contains("show").click();
        cy.get("@blogentry").parent().contains("Remove").click();
        cy.contains("The blog entry has been removed successfully");
      });

      it.only("The user cannot see the remove button of an entry she has not added", function () {
        let token;
        cy.request("POST", "http://localhost:3003/api/login", {
          username: "notTest",
          password: "ValidationPassword",
        })
          .then((response) => {
            token = response.body;
            console.log(token.token);
          })
          .then(() => {
            const entry = {
              title: "Another blog list entry",
              author: "Mick Jagger",
              likes: 100,
            };
            cy.createBlog(entry, token.token);
          });
        cy.visit("http://localhost:3000");

        cy.contains("Another blog list entry").as("entry");
        cy.get("@entry")
          .parent()
          .should("not.contain", "Remove")
          .and("contain", "Testuser2");
      });
    });
  });
});
