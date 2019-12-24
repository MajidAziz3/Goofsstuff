import firebase from 'firebase';
import {saveData, addToArray, getData, saveDataWithoutDocId} from '../Utility';
import {_retrieveData} from '../AsyncStore/AsyncFunc';

export async function Company_Profile(
  company_name,
  location,
  opening,
  closing_time,
  days,
  Descriptions,
  admins,
  members,
  phone,
  rating,
  email,
) {
  _retrieveData('user').then(result =>
    getData('users', result).then(user => {
      saveData('Company_Profile', user.userId, {
        description: Descriptions,
        Company_Name: company_name,
        location: location,
        opening_Time: opening,
        closing_Time: closing_time,
        days: days,
        email: user.email,
        phone: phone,
        rating: rating,
        Company_admins: admins,
        user_name: user.name,
        members: members,
        email: email,
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
