import firebase from 'firebase';
import {_retrieveData} from '../AsyncStore/AsyncFunc';
import {getData, saveDataWithoutDocId, saveData, addToArray} from '../Utility';

export async function Create_Group(
  group_name,
  group_location,
  group_description,
  group_member,
  group_admins,
) {
  _retrieveData('user').then(result =>
    addToArray('Create_Group', result, 'groups', {
      user_id: result,
      group_name: group_name,
      group_location: group_location,
      group_description: group_description,
      group_member: group_member,
      group_admins: group_admins,
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/good-stuff-191fd.appspot.com/o/1576330231727.JPEG?alt=media&token=eab92e56-2b7c-4854-bdb9-ce6720a549b6',
    }),
  );
}
