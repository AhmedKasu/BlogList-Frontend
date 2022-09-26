describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.createUser({
      username: 'Blasha',
      name: 'Ahmed Kasu',
      password: '54321',
    });
    cy.createUser({
      username: 'cr7',
      name: 'Cristiano Ronaldo',
      password: '12345',
    });
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.get('form').contains('log in to application');
    cy.get('form').contains('username');
    cy.get('form').contains('password');
    cy.get('form').contains('#submit', 'login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.login({ username: 'Blasha', password: '54321' });
      cy.contains('Blogs');
      cy.contains('Ahmed Kasu logged in');
      cy.contains('logout');
      cy.contains('new blog');
    });
    it('fails with the wrong credentials', function () {
      cy.get('#username').type('Blasha');
      cy.get('#password').type('321');
      cy.get('#submit').click();
      cy.contains('invalid username or password');

      cy.get('#error').should('have.css', 'color', 'rgb(255, 0, 0)');
      cy.get('#error').should('contain', 'invalid username or password');
      cy.get('#error').should('have.css', 'border-style', 'solid');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'Blasha', password: '54321' });
    });
    it('A blog can be created', function () {
      cy.createBlog({
        title: 'e2e testing is fun',
        author: 'Ahmed Kasu',
        url: 'http://www.e2etesting.com',
      });
      cy.contains('e2e testing is fun');
      cy.get('.defaultDiv').contains('e2e testing is fun');
    });
    it('user can like a blog', function () {
      cy.createBlog({
        title: 'e2e testing is fun',
        author: 'Ahmed Kasu',
        url: 'http://www.e2etesting.com',
        likes: 55,
      });
      cy.get('#likesDiv').contains('likes 55');

      cy.get('.view').click();
      cy.get('#like').click();

      cy.get('#likesDiv').contains('likes 56');
    });

    it('user can delete a blog', function () {
      cy.createBlog({
        title: 'The blog to delete',
        author: 'Ahmed Kasu',
        url: 'http://www.e2etesting.com',
        likes: 55,
      });
      cy.get('.view').click();
      cy.get('#delete').click();

      cy.contains('blog successfuly deleted');
      cy.contains('The blog to delete').should('not.exist');

      cy.get('#success').should('contain', 'blog successfuly deleted');
      cy.get('#success').should('have.css', 'color', 'rgb(0, 128, 0)');
      cy.get('#success').should('have.css', 'border-style', 'solid');
    });

    it('users can delete only blogs they create', function () {
      cy.login({ username: 'cr7', password: '12345' });
      cy.createBlog({
        title: 'You can not delete my blog',
        author: 'Cristiano Ronaldo',
        url: 'http://www.e2etesting.com',
        likes: 30,
      });
      cy.get('#logout').click();

      cy.login({ username: 'Blasha', password: '54321' });
      cy.get('.view').click();
      cy.get('#delete').click();

      cy.contains('unauthorised user');
      cy.get('#error').should('contain', 'unauthorised user');
      cy.contains('You can not delete my blog Cristiano Ronaldo');
    });

    it.only('Blogs are sorted by the number of likes', function () {
      cy.createBlog({
        title: 'Mini likes blog',
        author: 'Cristiano Ronaldo',
        url: 'http://www.e2etesting.com',
        likes: 30,
      });
      cy.createBlog({
        title: 'Max likes blog',
        author: 'Cristiano Ronaldo',
        url: 'http://www.e2etesting.com',
        likes: 31,
      });
      cy.get('.blogs').eq(0).should('contain', 'Max likes blog');
      cy.get('.blogs').eq(1).should('contain', 'Mini likes blog');

      cy.get('.defaultDiv')
        .eq(1)
        .get(':nth-child(6) > .defaultDiv > .view')
        .click()
        .get(':nth-child(6) > .onViewClickDiv > #likesDiv > #like')
        .click()
        .click();

      cy.get('.onViewClickDiv')
        .eq(1)
        .get(':nth-child(5) > .onViewClickDiv > :nth-child(1) > .hide')
        .click();

      cy.get('.blogs').eq(0).should('contain', 'Mini likes blog');
      cy.get('.blogs').eq(1).should('contain', 'Max likes blog');
    });
  });
});
