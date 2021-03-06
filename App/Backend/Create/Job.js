import firebase from 'firebase';
import {_retrieveData} from '../AsyncStore/AsyncFunc';
import {getData, saveDataWithoutDocId, addToArray} from '../Utility';

export async function Create_Job(
  job_category,
  img,
  job_title,
  email_address_job,
  job_description,
  job_compensation,
  about_job,
  phone_job,
  uploading_time,
  company_name,
) {
  _retrieveData('user').then(result =>
    getData('Company_Profile', result).then(user => {
      if (user) {
        addToArray('Create_Job', result, job_category, {
          user_id: result,
          user_name: user.user_name,

          title: job_title,
          phone: phone_job,
          email: email_address_job,
          category: job_category,
          img: img,
          company_pic: user.imageUrl,
          description: job_description,
          company_name: company_name,
          job_compensation: job_compensation,
          about_job: about_job,
          date: uploading_time,
          location: user.location,
          userImg: user.userImg,
        });
      } else {
        alert('please for job you have to add company first');
      }
    }),
  );
}
