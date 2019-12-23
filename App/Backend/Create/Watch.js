import firebase from 'firebase';
import {USER} from '../GlobalConst';
import {_retrieveData} from '../AsyncStore/AsyncFunc';
import {saveDataWithoutDocId, getData} from '../Utility';

export async function Watch(
  firstNameFlage,
  emailFlage,
  location,
  locationFlage,
  vedio_post,
  about_you,
  isChecked,
  watch_like,
  watch_comments,
  lebal,
  watch_favorit,
  uploading_time,
) {
  _retrieveData('user').then(result =>
    getData('users', result).then(user => {
      saveDataWithoutDocId('Watch', {
        user_id: result,
        user_name: user.name,
        description: vedio_post,
        address: locationFlage,
        email: emailFlage,
        name: firstNameFlage,
        about_you: about_you,
        agreement: isChecked,
        location: location,
        email_address: user.email,
        uploading_time: uploading_time,
        like: watch_like,
        favorite: watch_favorit,
        comments: watch_comments,
        label: lebal,
        islike: false,
        isfavorite: false,
      });
    }),
  );
}
