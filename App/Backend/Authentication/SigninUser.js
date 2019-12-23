import firebase from 'firebase';
import { _storeData } from '../AsyncStore/AsyncFunc';

export async function signinUser(email, password) {
  console.log("pass",email,password)
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(result => {
      _storeData('user',result.user.uid)
    })
    .catch(err => alert(err));
}