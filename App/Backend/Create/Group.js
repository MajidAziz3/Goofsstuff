import firebase from 'firebase';
import {_retrieveData} from '../AsyncStore/AsyncFunc';
import {getData, saveDataWithoutDocId} from '../Utility';

export async function Create_Group(
  group_name,
  group_location,
  group_description,
  category,
  file,
  gruop_member,
  group_admins
) {
  _retrieveData('user').then(result =>
      saveDataWithoutDocId('Create_Group', {
        user_id: result,
        group_name:group_name,
        group_location:group_location,
        group_description:group_description,
        category:category,
        file:file,
        gruop_member:gruop_member,
        group_admins:group_admins
      })
  );
}