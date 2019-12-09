import firebase from 'firebase';
import {_retrieveData} from '../AsyncStore/AsyncFunc';
import {getData, saveDataWithoutDocId, saveData} from '../Utility';

export async function Create_Group(
  group_name,
  group_location,
  group_description,
  group_member,
  group_admins,
) {
  _retrieveData('user').then(result =>
    saveData('Create_Group',result, {
      user_id: result,
      group_name: group_name,
      group_location: group_location,
      group_description: group_description,
      group_member: group_member,
      group_admins: group_admins,
    }),
  );
}
