import firebase from 'firebase';
import {saveData, addToArray, getData, saveDataWithoutDocId} from '../Utility';
import {_retrieveData} from '../AsyncStore/AsyncFunc';

export async function GreatNewPost(
  description,
  uploading_time,
  comment,
  like,
  favorite,
) {
  _retrieveData('user').then(result =>
    getData('users', result).then(user => {
      saveDataWithoutDocId('GreatNewPost', {
        user_id: result,
        user_name: user.name,
        profile_image: user.profile_picture,
        description: description,
        uploading_time: uploading_time,
        like: like,
        favorite: favorite,
        comments: comment,
      });
    }),
  );

  //   _retrieveData('user').then(result =>
  //     saveData('goodnew', result, {
  //       discription,
  //       lat,
  //       long,
  //       starting_time,
  //       ending_time,
  //       show_to,
  //       date,
  //       title,
  //       Catagory,
  //     }),
  //   );
}
