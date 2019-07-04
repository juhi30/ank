import { client } from 'nightwatch-api';
import { createMember, changePasswordUsingTempPassword } from '../../toolboxes/member.toolbox';
import { logout } from '../../toolboxes/login.toolbox';

const memberFeeder = require('../../feeder/member.feeder');
const helper = require('../../toolboxes/helpers.toolbox');

describe('Members Page', () => {
  test('Adding a new Member with Admin Role', async () => {
    global.newCanaryUserOne = `${memberFeeder.memberUsername}_${helper.randomNumber}`;
    const memberDetails = [{ element: '@memberFirstName', value: memberFeeder.memberFirstName },
      { element: '@memberLastName', value: memberFeeder.memberLastName },
      { element: '@memberUsername', value: global.newCanaryUserOne },
      { element: '@memberEmailAddress', value: memberFeeder.memberEmail }];
    const roles = ['@adminRole', '@memberRole', '@billingAdminRole'];

    await createMember(memberDetails, roles, 'NEW_CANARY_MEMBER_TEMP_PASSWORD');
  });

  test('Adding another Member with Admin Role', async () => {
    global.newCanaryUserTwo = `${memberFeeder.memberUsername2}_${helper.randomNumber}`;
    const memberDetails2 = [{ element: '@memberFirstName', value: memberFeeder.memberFirstName2 },
      { element: '@memberLastName', value: memberFeeder.memberLastName2 },
      { element: '@memberUsername', value: global.newCanaryUserTwo },
      { element: '@memberEmailAddress', value: `${memberFeeder.email}+${helper.randomNumber}@gmail.com` }];
    const roles = ['@adminRole', '@memberRole'];

    await createMember(memberDetails2, roles, 'NEW_CANARY_MEMBER2_TEMP_PASSWORD');
  });

  test('Logout as CCR', async () => {
    await logout();
  });

  test('Login as second Member with Admin Role', async () => {
    const { memberPassword } = memberFeeder;
    const tempPassword2 = global.NEW_CANARY_MEMBER2_TEMP_PASSWORD;
    const login = client.page.LoginPage();

    await changePasswordUsingTempPassword(global.newCanaryUserTwo, memberPassword, tempPassword2);
    // Below lines have been added to by pass confirm email modal
    await login.clickConfirmEmailOnEmailModal()
      .pause(1000);
  });

  test('Logout as member 2', async () => {
    await logout();
  });

  test('Login as New Member with Admin Role', async () => {
    const { memberPassword } = memberFeeder;
    const tempPassword = global.NEW_CANARY_MEMBER_TEMP_PASSWORD;
    const login = client.page.LoginPage();

    await changePasswordUsingTempPassword(global.newCanaryUserOne, memberPassword, tempPassword);
    // Below lines have been added to by pass confirm email modal
    await login.clickConfirmEmailOnEmailModal()
      .pause(1000);
  });

  test('Logout as member 1', async () => {
    await logout();
  });
});
