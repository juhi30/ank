import { client } from 'nightwatch-api';
import { logout } from '../../toolboxes/login.toolbox';

const messageFeeder = require('../../feeder/message.feeder');
const patientFeeder = require('../../feeder/patient.feeder');
const contactFeeder = require('../../feeder/contact.feeder');
const helper = require('../../toolboxes/helpers.toolbox');

describe('Patient Login Page Tests Cases', () => {
  const patient = client.page.PatientPage();
  const contact = client.page.ContactsPage();
  const convo = client.page.ConvoThreadPage();
  const patientName = `${contactFeeder.contactNewFirstName} ${contactFeeder.contactNewLastName}`;

  test('Send a rhino secure message from selected contact', async () => {
    await contact.navigate()
      .openContactChat(patientName);

    await convo.sendRhinosecureMessage(messageFeeder.rhinosecureMessage);

    client.refresh();
  });

  test('Get patient registration link', async () => {
    await convo.verifyAutoResponse('@rhinoSecureAutoResponseLink')
      .getPatientLink('NEW_CANARY_PATIENT_SIGNUP_LINK');
  });

  test('logout as member', async () => {
    await logout();
  });

  test('Register Patient through rhino secure auto response', async () => {
    global.usernameForPatient = `${patientFeeder.patientUserName}_${helper.randomNumber}`;
    global.emailForPatient = `${patientFeeder.patientEmail}+${helper.randomNumber}@rhino.com`;
    await patient.navigate()
      .registerPatient(global.usernameForPatient,
        global.emailForPatient,
        patientFeeder.patientPassword);
  });

  test('Verify sent message to patient', async () => {
    await patient.verifySentMessage();
  });

  test('logout as patient', async () => {
    await logout();
  });
});
