import { createGroup, addChannelRouteToGroup, routeGroupToChannel } from '../../toolboxes/group.toolbox';
import { memberLogin } from '../../toolboxes/login.toolbox';

const channelFeeder = require('../../feeder/channel.feeder');
const groupFeeder = require('../../feeder/group.feeder');
const memberFeeder = require('../../feeder/member.feeder');

describe(' Automated Test Cases - Groups', () => {
  test('Login as member', async () => {
    await memberLogin(memberFeeder.memberUsername, memberFeeder.memberPassword);
  });

  test('Create Groups - Patient Type', async () => {
    const groupDetails = {
      name: groupFeeder.patientTypeGroup,
      purpose: groupFeeder.purpose,
      memberName: memberFeeder.memberName,
      anotherMember: memberFeeder.memberName2,
    };

    const routeDetails = [{ memberName: groupDetails.memberName },
      { memberName: groupDetails.anotherMember }];

    await createGroup(groupDetails, '@patientOption', '@patientGroupListView', routeDetails);
  });

  test('Add Channel Routes to patient Type Group', async () => {
    const groupDetails = {
      channelName: groupFeeder.patientGroupChannel,
      purpose: groupFeeder.newGroupPurpose,
      timeZone: channelFeeder.timeZone,
      groupName: groupFeeder.patientTypeGroup,
    };

    await addChannelRouteToGroup(groupDetails, '@patientGroupListView', '@rhinoSecureType');
  });

  test('Create Group - Team Type', async () => {
    const groupDetails = {
      name: groupFeeder.teamTypeGroup,
      purpose: groupFeeder.purpose,
      memberName: memberFeeder.memberName,
      anotherMember: memberFeeder.memberName2,
    };

    const routeDetails = [{ memberName: groupDetails.memberName },
      { memberName: groupDetails.anotherMember }];

    await createGroup(groupDetails, '@teamOption', '@teamGroupListView', routeDetails);
  });

  test('Create Group - Patient And Team Type', async () => {
    const groupDetails = {
      name: groupFeeder.patientAndTeamType,
      purpose: groupFeeder.purpose,
      memberName: memberFeeder.memberName,
      anotherMember: memberFeeder.memberName2,
    };

    const routeDetails = [{ memberName: groupDetails.memberName },
      { memberName: groupDetails.anotherMember }];

    await createGroup(groupDetails, '@patientAndTeamOption', '@patientAndTeamGroupListView', routeDetails);
  });

  // test('Convert Patient Group to Patient and team type Group', async () => {
  //   const groupEditDetails = {
  //     newName: groupFeeder.updatedPatientTypeGroup,
  //     newPurpose: groupFeeder.newGroupPurpose,
  //     newGroupType: '@patientAndTeamOption',
  //     memberName: memberFeeder.memberName,
  //   };

  //   await convertGroupTypeToAnotherGroupType(groupEditDetails, '@patientGroupListView', '@updatedPatientGroup_ListView');
  // });

  // test('Convert Team Group to Patient and team type Group', async () => {
  //   const groupEditDetails = {
  //     newName: groupFeeder.updatedTeamTypeGroup,
  //     newPurpose: groupFeeder.newGroupPurpose,
  //     newGroupType: '@patientAndTeamOption',
  //     memberName: memberFeeder.memberName,
  //   };

  //   await convertGroupTypeToAnotherGroupType(groupEditDetails, '@teamGroupListView', '@updatedTeamGroup_ListView');
  // });

  test('Add Channel Routes to Patient And Team Type Group', async () => {
    const groupDetails = {
      channelName: groupFeeder.patientAndTeamGroupChannel,
      purpose: groupFeeder.newGroupPurpose,
      timeZone: channelFeeder.timeZone,
      groupName: groupFeeder.patientAndTeamType,
    };

    await addChannelRouteToGroup(groupDetails, '@patientAndTeamGroupListView', '@rhinoSecureType');
  });

  test('Route New Phone Type Channel to Patient And Team Type Group', async () => {
    await routeGroupToChannel('@patientAndTeamGroupListView', '@updatedChannelTitle', groupFeeder.patientAndTeamType, '@patientAndTeamGroupResult');
  });
});
