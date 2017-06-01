'use strict';

/**
 * Dependencies
 */
const sgMail = require('../../packages/mail');
const sgClient = sgMail.client;
const baseUrl = process.env.MOCK_HOST || 'http://localhost:4010/';

/**
 * Setup client
 */
before(() => {
  sgClient.setApiKey('SendGrid API Key');
  sgClient.setDefaultRequest('baseUrl', baseUrl);
});

/**
 * Default mock header
 */
beforeEach(() => {
  sgClient.setDefaultHeader('X-Mock', 200);
});

/**
 * Tests
 */
describe('sgMail.send()', () => {

  //Create mail data
  const data = {
    to: 'recipient@example.org',
    from: 'sender@example.org',
    subject: 'Hello world',
    text: 'Hello plain world!',
    html: '<p>Hello HTML world!</p>',
  };

  it('should throw an error when no data provided', () => {
    return expect(sgMail.send()).to.eventually.be.rejectedWith(Error);
  });

  it('should send a basic email', () => {
    sgClient.setDefaultHeader('X-Mock', 201);
    return sgMail.send(data)
      .then(([response, body]) => {
        expect(response.statusCode).to.equal(201);
      });
  });
});
