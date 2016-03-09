var nodemailer = require('nodemailer');
var dotenv = require('dotenv').config();
var wellknown = require('nodemailer-wellknown');
var emailTemplates = require('email-templates');
var path = require('path');
var templatesDir = path.resolve(__dirname, '..', 'views/mailer');

// create reusable transporter object using the default SMTP transport

var config = wellknown('Mailgun');

var defaultTransport = nodemailer.createTransport('SMTP',{
  service: 'Mailgun',
  auth: {
    user: 'postmaster@sandbox01182eceb3ed4af1aca8b93c4b8a9cd5.mailgun.org',
    pass: process.env.MAILGUN_PASS
  }
});

var EmailAddressRequiredError = new Error('email address required');

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"Fred Foo 👥" <foo@blurdybloop.com>', // sender address
    to: 'mb389@outlook.com, baz@blurdybloop.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world 🐴', // plaintext body
    html: '<b>Hello world 🐴</b>' // html body
};

// send mail with defined transport object
exports.sendOne = function (templateName, locals, fn) {
  // make sure that we have an user email
  if (!locals.email) {
    return fn(EmailAddressRequiredError);
  }
  // make sure that we have a message
  if (!locals.subject) {
    return fn(EmailAddressRequiredError);
  }
  emailTemplates(templatesDir, function (err, template) {
    if (err) {
      //console.log(err);
      return fn(err);
    }
    // Send a single email
    template(templateName, locals, function (err, html, text) {
      if (err) {
        //console.log(err);
        return fn(err);
      }
      // if we are testing don't send out an email instead return
      // success and the html and txt strings for inspection
      if (process.env.NODE_ENV === 'test') {
        return fn(null, '250 2.0.0 OK 1350452502 s5sm19782310obo.10', html, text);
      }
      var transport = defaultTransport;
      transport.sendMail(mailOptions, function (err, responseStatus) {
        if (err) {
          return fn(err);
        }
        return fn(null, responseStatus.message, html, text);
      });
    });
  });
};
