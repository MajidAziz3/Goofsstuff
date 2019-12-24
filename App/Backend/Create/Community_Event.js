import firebase from 'firebase';
import {_retrieveData} from '../AsyncStore/AsyncFunc';
import {getData, saveDataWithoutDocId, addToArray} from '../Utility';

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
      if (Event_Category == 'Sport') {
        addToArray('Sport', result, event_sub_category, {
          user_id: result,
          user_name: user.name,
          user_pic: user.profile_picture,
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
      } else if (Event_Category == 'OutDoor') {
        addToArray(Event_Category, result, event_sub_category, {
          user_id: result,
          user_name: user.name,
          user_pic: user.profile_picture,
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
      } else {
        addToArray(Event_Category, result, event_sub_category, {
          user_id: result,
          user_name: user.name,
          user_pic: user.profile_picture,
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
      }
    }),
  );
}
