import firebase from 'firebase';
import {saveData, addToArray, getData, saveDataWithoutDocId} from '../Utility';
import {_retrieveData} from '../AsyncStore/AsyncFunc';

export async function JobPost(
  news_descriptions,
  uploading_time,
  like,
  favorite,
  comments,
) {
  _retrieveData('user').then(result =>
    getData('users', result).then(user => {
      saveDataWithoutDocId('jobPost', {
        user_id: result,
        user_name: user.name,
        profile_image: user.profile_picture,
        description: news_descriptions,
        uploading_time: uploading_time,
        like: like,
        favorite: favorite,
        comments: comments,
        islike: false,
        isfavorite: false,
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
