import firebase from 'firebase';
import { _retrieveData } from '../AsyncStore/AsyncFunc';
import { getData, saveDataWithoutDocId } from '../Utility';

export async function Community_Event(
    title,
    phone,
    email,
    category,
    sub_category,
    event_pic,
    date,
    start_time,
    end_time,
    event_description,
    event_loction,
    event_onlyme,
    event_public,
    event_friends,
) {
  _retrieveData('user').then(result =>
    getData('users',result).then(user=>{
      saveDataWithoutDocId('Coummunity_Event', result, 'Coummunity_events', {
        user_id:result,
        user_name:user.name,
        title:title,
        phone:phone,
        email:email,
        category:category,
        sub_category:sub_category,
        event_pic:event_pic,
        date:date,
        start_time:start_time,
        end_time:end_time,
        description:event_description,
        location:event_loction,
        onlyme:event_onlyme,
        friends:event_friends,
        Public:event_public,
      })
    }
      )
    
  );
}