Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogUser', JSON.stringify(body));
    cy.visit('http://localhost:3000');
  });
});

Cypress.Commands.add('createUser', ({ username, name, password }) => {
  cy.request('POST', 'http://localhost:3003/api/users', {
    username,
    name,
    password,
  });
});

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: {
      title,
      author,
      url,
      likes,
    },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedBlogUser')).token
      }`,
    },
  });
  cy.visit('http://localhost:3000');
});
