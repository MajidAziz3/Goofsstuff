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
      console.log('desired sadgjas', Event_Category, event_sub_category);
      if (Event_Category == 'Sport') {
      //   switch(event_sub_category){
      //     case 'Cricket':
      //         addToArray('Sport', result, 'cricket', {
      //           user_id: result,
      //           user_name: user.name,
      //           title: title,
      //           phone: phone_number,
      //           email: email_address,
      //           category: Event_Category,
      //           sub_category: event_sub_category,
      //           event_pic: img,
      //           date: event_date,
      //           start_time: event_start_timing,
      //           end_time: ending_timing_event,
      //           description: event_description,
      //           location: location_event,
      //           attech_company: company_atteeched,
      //           invite_friends: invite_friends,
      //           joining_members: joining_members,
      //         });
      //         case 'baseball':
      //             addToArray('Sport', result, 'baseball', {
      //               user_id: result,
      //               user_name: user.name,
      //               title: title,
      //               phone: phone_number,
      //               email: email_address,
      //               category: Event_Category,
      //               sub_category: event_sub_category,
      //               event_pic: img,
      //               date: event_date,
      //               start_time: event_start_timing,
      //               end_time: ending_timing_event,
      //               description: event_description,
      //               location: location_event,
      //               attech_company: company_atteeched,
      //               invite_friends: invite_friends,
      //               joining_members: joining_members,
      //             });
      //             default:
      //                 addToArray('Sport', result, 'football', {
      //                   user_id: result,
      //                   user_name: user.name,
      //                   title: title,
      //                   phone: phone_number,
      //                   email: email_address,
      //                   category: Event_Category,
      //                   sub_category: event_sub_category,
      //                   event_pic: img,
      //                   date: event_date,
      //                   start_time: event_start_timing,
      //                   end_time: ending_timing_event,
      //                   description: event_description,
      //                   location: location_event,
      //                   attech_company: company_atteeched,
      //                   invite_friends: invite_friends,
      //                   joining_members: joining_members,
      //                 });
      //   }
      // }
      //   else{
      //     switch(event_sub_category){
      //       case 'Other':
      //           addToArray('Event', result, 'other', {
      //             user_id: result,
      //             user_name: user.name,
      //             title: title,
      //             phone: phone_number,
      //             email: email_address,
      //             category: Event_Category,
      //             sub_category: event_sub_category,
      //             event_pic: img,
      //             date: event_date,
      //             start_time: event_start_timing,
      //             end_time: ending_timing_event,
      //             description: event_description,
      //             location: location_event,
      //             attech_company: company_atteeched,
      //             invite_friends: invite_friends,
      //             joining_members: joining_members,
      //           });
      //           case 'Party':
      //               addToArray('Event', result, 'Party', {
      //                 user_id: result,
      //                 user_name: user.name,
      //                 title: title,
      //                 phone: phone_number,
      //                 email: email_address,
      //                 category: Event_Category,
      //                 sub_category: event_sub_category,
      //                 event_pic: img,
      //                 date: event_date,
      //                 start_time: event_start_timing,
      //                 end_time: ending_timing_event,
      //                 description: event_description,
      //                 location: location_event,
      //                 attech_company: company_atteeched,
      //                 invite_friends: invite_friends,
      //                 joining_members: joining_members,
      //               });
      //               default:
      //                   addToArray('Event', result, 'birthday', {
      //                     user_id: result,
      //                     user_name: user.name,
      //                     title: title,
      //                     phone: phone_number,
      //                     email: email_address,
      //                     category: Event_Category,
      //                     sub_category: event_sub_category,
      //                     event_pic: img,
      //                     date: event_date,
      //                     start_time: event_start_timing,
      //                     end_time: ending_timing_event,
      //                     description: event_description,
      //                     location: location_event,
      //                     attech_company: company_atteeched,
      //                     invite_friends: invite_friends,
      //                     joining_members: joining_members,
      //                   });
      //   }
        if (!event_sub_category.localeCompare('football'))
          addToArray('Sport', result, 'football', {
            user_id: result,
            user_name: user.name,
            user_pic:user.profile_picture,
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
          else if (!event_sub_category.localeCompare('Cricket'))
          addToArray('Sport', result, 'cricket', {
            user_id: result,
            user_name: user.name,
            user_pic:user.profile_picture,
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
        else {
          addToArray('Sport', result, 'BaseBall', {
            user_id: result,
            user_name: user.name,
            user_pic:user.profile_picture,
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
      }
      else{ 
        if (!event_sub_category.localeCompare('birthday'))
        addToArray('Event', result, 'birthday', {
          user_id: result,
          user_name: user.name,
          user_pic:user.profile_picture,
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
        else if (!event_sub_category.localeCompare('Party'))
        addToArray('Event', result, 'Party', {
          user_id: result,
          user_name: user.name,
          user_pic:user.profile_picture,
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
      else {
        addToArray('Event', result, 'Other', {
          user_id: result,
          user_name: user.name,
          user_pic:user.profile_picture,
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
        }
    }),
  );
}
