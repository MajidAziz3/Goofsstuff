import firebase from 'firebase';
import firestore from 'firebase/firestore';
import {saveData} from './Utility';
import {_storeData} from './AsyncStore/AsyncFunc';
import {USER} from './GlobalConst';

export async function signUp(
  full_name,
  email,
  bio,
  location,
  likes,
  profile_picture,
  groups,
  Date_Of_Birth,
  password,
  friends,
  pending_friends,
  favorite,
  family_member,
  affirmation,
  healthy,
  kindness,
  send_request,
  familyInvitation,
) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function(user) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async () => {
          await _storeData('user', user.user.uid);
          await saveData('users', user.user.uid, {
            userId: user.user.uid,
            name: full_name,
            email: email,
            date_of_birth: Date_Of_Birth,
            friends: friends,
            pending_friends: pending_friends,
            favorite: favorite,
            family_member: family_member,
            bio: bio,
            groups: groups,
            likes: likes,
            location: location,
            profile_picture: profile_picture,
            affirmation: affirmation,
            healthy: healthy,
            kindness: kindness,
            send_request: send_request,
            familyInvitation: familyInvitation,
            group_invitation:familyInvitation
          }).then(res => {
            return res;
          });
        })
        .catch(err => alert(err));
    })
    .catch(function(error) {
      alert(error.code + ': ' + error.message);
    });
}

export async function signIn(email, password) {
  let success = true;
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      success = false;
      alert(error.code + ': ' + error.message);
    });
  return success;
}

export async function getCurrentUserId() {
  var user = firebase.auth().currentUser;

  if (user != null) {
    return user.uid;
  }
}
