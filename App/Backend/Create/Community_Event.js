import firebase from 'firebase';
import {_retrieveData} from '../AsyncStore/AsyncFunc';
import {getData, saveDataWithoutDocId} from '../Utility';

export async function Community_Event(
  Event_Category,
  event_sub_category,
  location_event,
  event_date,
  event_description,
  event_start_timing,
  phone_number,
  email_address,
  invite_friends,
  joining_members,
  title,
  img,
  ending_timing_event,
  company_atteeched,
) {
  _retrieveData('user').then(result =>
    getData('users', result).then(user => {
      saveDataWithoutDocId('Coummunity_Event', {
        user_id: result,
        user_name: user.name,
        title: title,
        phone: phone_number,
        email: email_address,
        category: Event_Category,
        sub_category: event_sub_category,
        event_pic: img,
        date: event_date,
        start_time: event_start_timing,
        end_time: ending_timing_event,
        description: event_description,
        location: location_event,
        attech_company: company_atteeched,
        invite_friends: invite_friends,
        joining_members: joining_members,
      });
    }),
  );
}
