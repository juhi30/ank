import { client } from 'nightwatch-api';
import * as memberToolbox from '../../toolboxes/login.toolbox';
import * as contactToolbox from '../../toolboxes/contact.toolbox';
import * as bulkActionToolbox from '../../toolboxes/bulkActions.toolbox';
import * as orgPreferencesToolbox from '../../toolboxes/orgPrefrences.toolbox';
import * as messageToolbox from '../../toolboxes/messaging.toolbox';

const bulkActions = client.page.BulkActionsPage();


const memberFeeder = require('../../feeder/member.feeder');
const contactFeeder = require('../../feeder/contact.feeder');
const messageFeeder = require('../../feeder/message.feeder');
const groupFeeder = require('../../feeder/group.feeder');

describe('Bulk Action automation test cases', () => {
  const contactName = `${contactFeeder.anotherContactFirstName} ${contactFeeder.anotherContactLastName}`;
  const bulkContactName1 = `${contactFeeder.bulkContactFirstName1} ${contactFeeder.bulkContactLastName1}`;
  const bulkContactName2 = `${contactFeeder.bulkContactFirstName2} ${contactFeeder.bulkContactLastName2}`;
  const bulkContactName3 = `${contactFeeder.bulkContactFirstName3} ${contactFeeder.bulkContactLastName3}`;
  const bulkContactName4 = `${contactFeeder.bulkContactFirstName4} ${contactFeeder.bulkContactLastName4}`;
  const bulkContactName5 = `${contactFeeder.bulkContactFirstName5} ${contactFeeder.bulkContactLastName5}`;
  const bulkContactName6 = `${contactFeeder.bulkContactFirstName6} ${contactFeeder.bulkContactLastName6}`;
  const bulkContactName7 = `${contactFeeder.bulkContactFirstName7} ${contactFeeder.bulkContactLastName7}`;

  beforeAll(async () => {
    await memberToolbox.memberLogin(memberFeeder.newMemberUsername, memberFeeder.newMemberPassword);

    const contactDetails1 = [{ element: '@firstNameInput', value: contactFeeder.bulkContactFirstName1 },
      { element: '@lastNameInput', value: contactFeeder.bulkContactLastName1 },
      { element: '@birthDateInput', value: contactFeeder.bulkContactBirthDate1 },
      { element: '@phoneNumberInput', value: contactFeeder.bulkContactFirstPhoneNumber1 },
    ];

    const contactDetails2 = [{ element: '@firstNameInput', value: contactFeeder.bulkContactFirstName2 },
      { element: '@lastNameInput', value: contactFeeder.bulkContactLastName2 },
      { element: '@birthDateInput', value: contactFeeder.bulkContactBirthDate2 },
      { element: '@phoneNumberInput', value: contactFeeder.bulkContactFirstPhoneNumber2 },
    ];

    const contactDetails3 = [{ element: '@firstNameInput', value: contactFeeder.bulkContactFirstName3 },
      { element: '@lastNameInput', value: contactFeeder.bulkContactLastName3 },
      { element: '@birthDateInput', value: contactFeeder.bulkContactBirthDate3 },
      { element: '@phoneNumberInput', value: contactFeeder.bulkContactFirstPhoneNumber3 },
    ];

    const contactDetails4 = [{ element: '@firstNameInput', value: contactFeeder.bulkContactFirstName4 },
      { element: '@lastNameInput', value: contactFeeder.bulkContactLastName4 },
      { element: '@birthDateInput', value: contactFeeder.bulkContactBirthDate4 },
      { element: '@phoneNumberInput', value: contactFeeder.bulkContactFirstPhoneNumber4 },
    ];
    await contactToolbox.createContact(contactDetails1, '@patientOption');
    await contactToolbox.createContact(contactDetails2, '@patientOption');
    await contactToolbox.createContact(contactDetails3, '@patientOption');
    await contactToolbox.createContact(contactDetails4, '@patientOption');

    // my requirements
    // await messageToolbox.sendADirectMessageToContact(messageFeeder.directChatMessage, '@searchContactModalTitle', contactFeeder.anotherContactFirstName);
    // await messageToolbox.sendGroupMessageToContact('@patientAndTeamGroup_PatientInbox',
    // '@searchContactModalTitle', contactFeeder.anotherContactFirstName, messageFeeder.groupPatientMessage);
    // await bulkActions.selectActionAgainstCheckboxOption('@PatientTeamGroup', '@assign', contactFeeder.anotherContactFirstName);
  });

  test('Create Threads on the inbox page', async () => {
    await bulkActionToolbox.messageViaPatientGroup(contactName, messageFeeder.groupPatientMessage, groupFeeder.patientGroupChannel);
    await bulkActionToolbox.messageViaPAndTGroup(bulkContactName1, messageFeeder.groupPatientMessage);
    await bulkActionToolbox.messageViaPAndTGroup(bulkContactName2, messageFeeder.groupPatientMessage);
    await bulkActionToolbox.messageViaDirect(bulkContactName3, messageFeeder.groupPatientMessage);
    await bulkActionToolbox.messageViaDirect(bulkContactName4, messageFeeder.groupPatientMessage);
  });

  test('Verify action items according the selection criteria - Direct Inbox', async () => {
    await bulkActionToolbox.actionVerificationDirectInbox('@directInbox', bulkContactName4);
    await bulkActionToolbox.checkActionVerificationForNone();
  });

  test('Assign thread to Group and Verify action items according the selection criteria', async () => {
    await bulkActionToolbox.assignThreadToMemberAndGroup('@patientGroup', contactName, '@assign', '@groupSearchInput', groupFeeder.patientAndTeamType, '@patientAndTeamGroup_PatientInbox');
    await bulkActionToolbox.actionVerificationPatientGroup('@patientAndTeamGroup_PatientInbox', contactName);
  });

  test('Assign to self and Verify action items according the selection criteria', async () => {
    await bulkActionToolbox.assignToSelf('@patientAndTeamGroup_PatientInbox', contactName, '@assignedToMe');
    await bulkActionToolbox.AssignedToMeActionVerification('@assignedToMe', bulkContactName1);
  });

  test('Verify action items according the selection criteria - Following Inbox', async () => {
    await bulkActionToolbox.actionVerificationFollowingInbox('@followingInbox', contactName);
    await bulkActionToolbox.checkActionVerificationForNone();
  });

  // ----- When close By assignee is OFF -------
  test('AssignedToMeInbox select all threads and check for the action option', async () => {
    await bulkActionToolbox.checkForAssignmentCompleteOptionForATMThreads();
  });

  test('DirectInbox select all threads and check for the action option', async () => {
    await bulkActionToolbox.checkForCloseConOptionForDirectThreads();
  });

  test('PatientTeamGroupInbox select assigned thread and check for the action option', async () => {
    await bulkActionToolbox.checkForCloseConOptionForPateintTeamForAssignedThread();
  });

  test('PatientTeamGroupInbox select default thread and check for the action option', async () => {
    await bulkActionToolbox.checkForCloseConOptionForPateintTeamForDefaultThread();
  });

  test('PatientTeamGroupInbox select all threads and check for the action option', async () => {
    await messageToolbox.openClosedContact(contactFeeder.randomContactName, messageFeeder.noteMessage);
    await bulkActionToolbox.assignThreadToMemberAndGroup('@patientAndTeamGroup_PatientInbox', contactFeeder.randomContactName, '@groupSearchInput', groupFeeder.patientAndTeamType, '@assignUpdateSuccessMessage');
    await bulkActionToolbox.assignThreadToMemberAndGroup('@directInbox', contactFeeder.randomContactName, '@patientAndTeamGroup_PatientInbox', groupFeeder.patientAndTeamType, '@assignUpdateSuccessMessage');
    await bulkActionToolbox.checkForCloseConOptionForPateintTeamForAllThreads();
  });

  // ------- When close by assignee is ON --------
  test('AssignedToMeInbox select all threads and check for the action option when CBA is OFF', async () => {
    await orgPreferencesToolbox.enableCloseByAssignee();
    await bulkActionToolbox.checkForAssignmentCompleteOptionForATMThreadsCBAOn();
  });

  test('DirectInbox select all threads and check for the action option when CBA is OFF', async () => {
    await bulkActionToolbox.checkForCloseConOptionForDirectThreadsCBAOn();
  });

  test('PatientTeamGroupInbox select assigned threads and check for the action option when CBA is ON', async () => {
    await bulkActionToolbox.checkForCloseConOptionForPateintTeamForAssignedThreadCBAOn();
  });

  test('PatientTeamGroupInbox select default threads and check for the action option when CBA is ON', async () => {
    await bulkActionToolbox.checkForCloseConOptionForPateintTeamForDefaultThreadCBAOn();
  });

  test('PatientTeamGroupInbox select all threads and check for the action option when CBA is ON', async () => {
    await bulkActionToolbox.checkForCloseConOptionForPateintTeamForAllThreadsCBAOn();
  });
});