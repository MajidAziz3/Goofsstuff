import * as firebase from 'firebase';
import 'firebase/firestore';
import RNFetchBlob from 'react-native-fetch-blob';
import {Platform} from 'react-native';
import {_storeData} from './AsyncStore/AsyncFunc';
import Forms from '../Components/Forms/Forms';

const config = {
  apiKey: 'AIzaSyAxmWs4jA7sWQQb32OKsLG7hOEotX9-RjM',
  authDomain: 'good-stuff-e5570.firebaseapp.com',
  databaseURL: 'https://good-stuff-e5570.firebaseio.com',
  projectId: 'good-stuff-e5570',
  storageBucket: 'good-stuff-e5570.appspot.com',
  messagingSenderId: '1076008934710',
  appId: '1:1076008934710:web:2271ca4becccad935e6797',
  measurementId: 'G-PR728NDRT3',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

// var firebaseConfig = {
//   apiKey: 'AIzaSyDUmkLCvM2SyvevYYbTr9sA6RTxbxnddpU',
//   authDomain: 'good-stuff-191fd.firebaseapp.com',
//   databaseURL: 'https://good-stuff-191fd.firebaseio.com',
//   projectId: 'good-stuff-191fd',
//   storageBucket: 'good-stuff-191fd.appspot.com',
//   messagingSenderId: '400332779156',
//   appId: '1:400332779156:web:ba12bdbbb3a81f542c8e81',
//   measurementId: 'G-Z8H3QJ3CV5',
// };
// // Initialize Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }
export async function getAllOfCollection(collection) {
  let data = [];
  let querySnapshot = await firebase
    .firestore()
    .collection(collection)
    .get();
  querySnapshot.forEach(function(doc) {
    if (doc.exists) {
      data.push(doc.data());
    } else {
    }
  });
  return data;
}

export function getData(collection, doc, objectKey) {
  // check if data exists on the given path
  if (objectKey === undefined) {
    return firebase
      .firestore()
      .collection(collection)
      .doc(doc)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          return doc.data();
        } else {
          return false;
        }
      });
  } else {
    return firebase
      .firestore()
      .collection(collection)
      .doc(doc)
      .get()
      .then(function(doc) {
        if (doc.exists && doc.data()[objectKey] != undefined) {
          return doc.data()[objectKey];
        } else {
          return false;
        }
      });
  }
}

export async function getDocRefByKeyValue(collection, key, value) {
  return firebase
    .firestore()
    .collection(collection)
    .where(key, '==', value)
    .get()
    .then(function(querySnapshot) {
      return querySnapshot.docs[0];
    });
}

export async function getDocByKeyValue(collection, key, value) {
  let data = [];
  let querySnapshot = await firebase
    .firestore()
    .collection(collection)
    .where(key, '==', value)
    .get();
  await querySnapshot.forEach(function(doc) {
    data.push(doc.data());
  });
  return data;
}

export async function getDocWithinRange(collection, doc, strSearch) {
  let strlength = strSearch.length;
  let strFrontCode = strSearch.slice(0, strlength - 1);
  let strEndCode = strSearch.slice(strlength - 1, strSearch.length);

  let startcode = strSearch;
  let endcode =
    strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);

  return firebase
    .firestore()
    .collection(collection)
    .where(doc, '>=', startcode)
    .where(doc, '<', endcode)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {});
    });
}

export async function saveData(collection, doc, jsonObject) {
  await firebase
    .firestore()
    .collection(collection)
    .doc(doc)
    .set(jsonObject, {merge: true})
    .then(result => {
      return result;
    })
    .catch(function(error) {
      alert('Error writing document: ', error);
    });
}

// export async function saveDataWithoutDocId(collection, jsonObject) {
//   let docRef = await firebase
//     .firestore()
//     .collection(collection)
//     .doc();
//   docRef.set(jsonObject);
//   return docRef;
// }
export async function saveDataWithoutDocId(collection, jsonObject) {
  let obj = jsonObject;
  let reff = firebase
    .firestore()
    .collection(collection)
    .add(jsonObject)
    .then(async function(docRef) {
      if (docRef.id) {
        // new Forms().Upload_Image(docRef.id);
        _storeData('ref', docRef.id);
        let doc_Id = docRef.id;
        obj.post_id = docRef.id;
        await firebase
          .firestore()
          .collection(collection)
          .doc(doc_Id)
          .set(obj, {merge: true})
          .then(result => {
            return result;
          })
          .catch(function(error) {
            alert('Error writing document: ', error);
          });
      }
    });

  // reff.set(obj);
  return reff;
  // docRef.set(jsonObject);
  // return docRef;
}
export async function addToArray(collection, doc, array, value) {
  let docRef = await firebase
    .firestore()
    .collection(collection)
    .doc(doc);
  let docData = await docRef.get();
  if (docData.exists && docData.data()[array] != undefined) {
    docRef.set(
      {
        [array]: firebase.firestore.FieldValue.arrayUnion(value),
      },
      {merge: true},
    );
  } else {
    saveData(collection, doc, {[array]: [value]});
  }
}

export async function uploadCommunityImage(
  imgUri,
  //  mime = 'video/mp4',
  mime = 'image/jpeg',
  imagePath,
  name,
  databaseCollection,
  docRef,
  sub_category,
) {
  //blob
  const Blob = RNFetchBlob.polyfill.Blob;
  const fs = RNFetchBlob.fs;
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  window.Blob = Blob;

  const uploadUri =
    Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
  const imageRef = firebase.storage().ref(imagePath);

  let readingFile = await fs.readFile(uploadUri, 'base64');
  let blob = await Blob.build(readingFile, {type: `${mime};BASE64`});

  let uploadTask = imageRef.put(blob, {contentType: mime, name: name});

  // let progress = 0;
  //Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED,
    function(snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      if (progress < 30) progress += 10;
      else if (progress >= 30) progress += 5;
      else if (progress >= 85) progress += 1;
      else if (progress >= 95) progress += 0.1;

      _storeData('imageUploadProgress', progress.toString());
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          break;
        case firebase.storage.TaskState.RUNNING:
          break;
      }
    },
    function(error) {
      _storeData('imageUploadProgress', '-1');
    },
    function() {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        firebase
          .firestore()
          .collection(databaseCollection)
          .doc(docRef)
          .update({football: [{imageUrl: downloadURL}]});
        //   addToArray(databaseCollection, docRef,sub_category, {imageUrl: downloadURL}).then(
        //     () => {
        //       _storeData('imageUploadProgress', '100');
        //     },
        //   );
      });
    },
  );
}

export async function deleteArray(collection, doc, array, index) {
  let docRef = await firebase
    .firestore()
    .collection(collection)
    .doc(doc);
  let docData = await docRef.get();

  if (docData.exists && docData.data()[array][index] != undefined) {
    docRef.update({
      [array]: firebase.firestore.FieldValue.arrayRemove(
        docData.data()[array][index],
      ),
    });
  }
}

export async function uploadJobImage(
  imgUri,
  //  mime = 'video/mp4',
  mime = 'image/jpeg',
  imagePath,
  name,
  databaseCollection,
  docRef,
  job_category,
  job_title,
  email_address_job,
  job_description,
  job_compensation,
  about_job,
  phone_job,
  uploading_time,
  company_name,
  location,
  user_name,
) {
  //blob
  const Blob = RNFetchBlob.polyfill.Blob;
  const fs = RNFetchBlob.fs;
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  window.Blob = Blob;

  const uploadUri =
    Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
  const imageRef = firebase.storage().ref(imagePath);

  let readingFile = await fs.readFile(uploadUri, 'base64');
  let blob = await Blob.build(readingFile, {type: `${mime};BASE64`});

  let uploadTask = imageRef.put(blob, {contentType: mime, name: name});

  // let progress = 0;
  //Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED,
    function(snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      if (progress < 30) progress += 10;
      else if (progress >= 30) progress += 5;
      else if (progress >= 85) progress += 1;
      else if (progress >= 95) progress += 0.1;

      _storeData('imageUploadProgress', progress.toString());
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          break;
        case firebase.storage.TaskState.RUNNING:
          break;
      }
    },
    function(error) {
      _storeData('imageUploadProgress', '-1');
    },
    function() {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log(
          imgUri,
          imagePath,
          name,
          databaseCollection,
          docRef,
          job_category,
          job_title,
          email_address_job,
          job_description,
          job_compensation,
          about_job,
          phone_job,
          uploading_time,
          company_name,
          location,
          user_name,
          'titel',
        );
        addToArray(databaseCollection, docRef, job_category, {
          imageUrl: downloadURL,
          userId: docRef,
          category: job_category,
          description: job_description,
          location: location,
          title: job_title,
          user_name: user_name,
          email: email_address_job,
          phone: phone_job,
          date: uploading_time,
          compensation: job_compensation,
          company_name: company_name,
          about_job: about_job,
        }).then(() => {
          _storeData('imageUploadProgress', '100');
        });
      });
    },
  );
}

export async function uploadGroupImage(
  imgUri,
  //  mime = 'video/mp4',
  mime = 'image/jpeg',
  imagePath,
  name,
  databaseCollection,
  docRef,
  group_admins,
  group_member,
  group_description,
  group_location,
  group_name,
) {
  //blob
  const Blob = RNFetchBlob.polyfill.Blob;
  const fs = RNFetchBlob.fs;
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  window.Blob = Blob;

  const uploadUri =
    Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
  const imageRef = firebase.storage().ref(imagePath);

  let readingFile = await fs.readFile(uploadUri, 'base64');
  let blob = await Blob.build(readingFile, {type: `${mime};BASE64`});

  let uploadTask = imageRef.put(blob, {contentType: mime, name: name});

  // let progress = 0;
  //Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED,
    function(snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      if (progress < 30) progress += 10;
      else if (progress >= 30) progress += 5;
      else if (progress >= 85) progress += 1;
      else if (progress >= 95) progress += 0.1;

      _storeData('imageUploadProgress', progress.toString());
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          break;
        case firebase.storage.TaskState.RUNNING:
          break;
      }
    },
    function(error) {
      _storeData('imageUploadProgress', '-1');
    },
    function() {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        addToArray(databaseCollection, docRef, 'group', {
          imageUrl: downloadURL,
          userId: docRef,
          group_admins: group_admins,
          group_description: group_description,
          group_location: group_location,
          group_member: group_member,
          group_name: group_name,
        }).then(() => {
          _storeData('imageUploadProgress', '100');
        });
      });
    },
  );
}

export async function uploadImage(
  imgUri,
  //  mime = 'video/mp4',
  mime = 'image/jpeg',
  imagePath,
  name,
  databaseCollection,
  docRef,
) {
  //blob
  const Blob = RNFetchBlob.polyfill.Blob;
  const fs = RNFetchBlob.fs;
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  window.Blob = Blob;

  const uploadUri =
    Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
  const imageRef = firebase.storage().ref(imagePath);

  let readingFile = await fs.readFile(uploadUri, 'base64');
  let blob = await Blob.build(readingFile, {type: `${mime};BASE64`});

  let uploadTask = imageRef.put(blob, {contentType: mime, name: name});

  // let progress = 0;
  //Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED,
    function(snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      if (progress < 30) progress += 10;
      else if (progress >= 30) progress += 5;
      else if (progress >= 85) progress += 1;
      else if (progress >= 95) progress += 0.1;

      _storeData('imageUploadProgress', progress.toString());
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          break;
        case firebase.storage.TaskState.RUNNING:
          break;
      }
    },
    function(error) {
      _storeData('imageUploadProgress', '-1');
    },
    function() {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        saveData(databaseCollection, docRef, {imageUrl: downloadURL}).then(
          () => {
            _storeData('imageUploadProgress', '100');
          },
        );
      });
    },
  );
}

export async function uploadFamilyPostImage(
  imgUri,
  //  mime = 'video/mp4',
  mime = 'image/jpeg',
  imagePath,
  name,
  databaseCollection,
  docRef,
  username,
  userprofile_picture,
  familyName,
  view,
  like,
  favorite,
  uploading_time,
  description,
) {
  //blob
  const Blob = RNFetchBlob.polyfill.Blob;
  const fs = RNFetchBlob.fs;
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  window.Blob = Blob;

  const uploadUri =
    Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
  const imageRef = firebase.storage().ref(imagePath);
  let readingFile = await fs.readFile(uploadUri, 'base64');
  let blob = await Blob.build(readingFile, {type: `${mime};BASE64`});

  let uploadTask = imageRef.put(blob, {contentType: mime, name: name});

  // let progress = 0;
  //Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED,
    snapshot => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      if (progress < 30) progress += 10;
      else if (progress >= 30) progress += 5;
      else if (progress >= 85) progress += 1;
      else if (progress >= 95) progress += 0.1;

      _storeData('imageUploadProgress', progress.toString());
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          break;
        case firebase.storage.TaskState.RUNNING:
          break;
      }
    },
    error => {
      _storeData('imageUploadProgress', '-1');
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
        addToArray(databaseCollection, docRef, 'family', {
          name: username,
          profile_picture: userprofile_picture,
          familyName: familyName,
          view: view,
          like: like,
          favorite: favorite,
          time: uploading_time,
          description: description,
          userId: docRef,
          imageUrl: downloadURL,
        }).then(() => {
          _storeData('imageUploadProgress', '100');
        });
      });
    },
  );
}

export async function uploadVisionImage(
  imgUri,
  //  mime = 'video/mp4',
  mime = 'image/jpeg',
  imagePath,
  name,
  databaseCollection,
  docRef,
) {
  //blob
  const Blob = RNFetchBlob.polyfill.Blob;
  const fs = RNFetchBlob.fs;
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  window.Blob = Blob;

  const uploadUri =
    Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
  const imageRef = firebase.storage().ref(imagePath);
  let readingFile = await fs.readFile(uploadUri, 'base64');
  let blob = await Blob.build(readingFile, {type: `${mime};BASE64`});

  let uploadTask = imageRef.put(blob, {contentType: mime, name: name});

  // let progress = 0;
  //Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED,
    snapshot => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      if (progress < 30) progress += 10;
      else if (progress >= 30) progress += 5;
      else if (progress >= 85) progress += 1;
      else if (progress >= 95) progress += 0.1;

      _storeData('imageUploadProgress', progress.toString());
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          break;
        case firebase.storage.TaskState.RUNNING:
          break;
      }
    },
    error => {
      _storeData('imageUploadProgress', '-1');
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(async downloadURL => {
        await addToArray(
          databaseCollection,
          docRef,
          'vision',
          downloadURL,
        ).then(() => {
          _storeData('imageUploadProgress', '100');
        });
      });
    },
  );
}

export async function uploadUserImage(
  imgUri,
  //  mime = 'video/mp4',
  mime = 'image/jpeg',
  imagePath,
  name,
  databaseCollection,
  docRef,
) {
  //blob
  const Blob = RNFetchBlob.polyfill.Blob;
  const fs = RNFetchBlob.fs;
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  window.Blob = Blob;

  const uploadUri =
    Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
  const imageRef = firebase.storage().ref(imagePath);

  let readingFile = await fs.readFile(uploadUri, 'base64');
  let blob = await Blob.build(readingFile, {type: `${mime};BASE64`});

  let uploadTask = imageRef.put(blob, {contentType: mime, name: name});

  // let progress = 0;
  //Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED,
    function(snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      if (progress < 30) progress += 10;
      else if (progress >= 30) progress += 5;
      else if (progress >= 85) progress += 1;
      else if (progress >= 95) progress += 0.1;

      _storeData('imageUploadProgress', progress.toString());
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          break;
        case firebase.storage.TaskState.RUNNING:
          break;
      }
    },
    function(error) {
      _storeData('imageUploadProgress', '-1');
    },
    function() {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(async downloadURL => {
        await firebase
          .firestore()
          .collection(databaseCollection)
          .doc(docRef)
          .update({profile_picture: downloadURL})
          // .then(async()=>)
          // await saveData(databaseCollection, docRef, {
          //   profile_picture: downloadURL,
          // })
          .then(() => {
            _storeData('imageUploadProgress', '100');
          });
      });
    },
  );
}

export async function uploadImageComment(
  imgUri,
  //  mime = 'video/mp4',
  mime = 'image/jpeg',
  imagePath,
  name,
  databaseCollection,
  docRef,
  comments,
  userId,
  username,
  uploadingTime,
  userPic,
) {
  console.log(
    'image',
    imgUri,
    (mime = 'image/jpeg'),
    imagePath,
    name,
    databaseCollection,
    docRef,
    comments,
    userId,
    username,
    uploadingTime,
    userPic,
  );
  if (!imgUri) {
    addToArray(databaseCollection, docRef, 'comments', {
      comments: comments,
      userId: userId,
      userImage: userPic,
      user_name: username,
      time: uploadingTime,
    });
    return;
  }

  //blob
  const Blob = RNFetchBlob.polyfill.Blob;
  const fs = RNFetchBlob.fs;
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  window.Blob = Blob;

  const uploadUri =
    Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
  const imageRef = firebase.storage().ref(imagePath);

  let readingFile = await fs.readFile(uploadUri, 'base64');
  let blob = await Blob.build(readingFile, {type: `${mime};BASE64`});

  let uploadTask = imageRef.put(blob, {contentType: mime, name: name});

  // let progress = 0;
  //Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED,
    snapshot => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      if (progress < 30) progress += 10;
      else if (progress >= 30) progress += 5;
      else if (progress >= 85) progress += 1;
      else if (progress >= 95) progress += 0.1;

      _storeData('imageUploadProgress', progress.toString());
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          break;
        case firebase.storage.TaskState.RUNNING:
          break;
      }
    },
    error => {
      _storeData('imageUploadProgress', '-1');
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref
        .getDownloadURL()
        .then(async function(downloadURL) {
          await addToArray(databaseCollection, docRef, 'comments', {
            imageUrl: downloadURL,
            comments: comments,
            userId: userId,
            userImage: userPic,
            user_name: username,
            time: uploadingTime,
          });
        });
      // });
    },
  );
}

export async function uploadFamilyVideo(
  imgUri,
  //  mime = 'video/mp4',
  mime = 'video/mp4',
  imagePath,
  name,
  databaseCollection,
  docRef,
  username,
  userprofile_picture,
  familyName,
  view,
  like,
  favorite,
  uploading_time,
  description,
) {
  //blob
  const Blob = RNFetchBlob.polyfill.Blob;
  const fs = RNFetchBlob.fs;
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  window.Blob = Blob;

  const uploadUri =
    Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
  const imageRef = firebase.storage().ref(imagePath);

  let readingFile = await fs.readFile(uploadUri, 'base64');
  let blob = await Blob.build(readingFile, {type: `${mime};BASE64`});

  let uploadTask = imageRef.put(blob, {contentType: mime, name: name});

  // let progress = 0;
  //Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED,
    function(snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      if (progress < 30) progress += 10;
      else if (progress >= 30) progress += 5;
      else if (progress >= 85) progress += 1;
      else if (progress >= 95) progress += 0.1;

      _storeData('imageUploadProgress', progress.toString());
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          break;
        case firebase.storage.TaskState.RUNNING:
          break;
      }
    },
    function(error) {
      _storeData('imageUploadProgress', '-1');
    },
    function() {
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        addToArray(databaseCollection, docRef, 'family', {
          name: username,
          profile_picture: userprofile_picture,
          familyName: familyName,
          view: view,
          like: like,
          favorite: favorite,
          time: uploading_time,
          description: description,
          userId: docRef,
          videoUrl: downloadURL,
        }).then(() => {
          _storeData('imageUploadProgress', '100');
        });
      });
    },
  );
}

export async function uploadVideo(
  imgUri,
  //  mime = 'video/mp4',
  mime = 'video/mp4',
  imagePath,
  name,
  databaseCollection,
  docRef,
) {
  //blob
  const Blob = RNFetchBlob.polyfill.Blob;
  const fs = RNFetchBlob.fs;
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  window.Blob = Blob;

  const uploadUri =
    Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
  const imageRef = firebase.storage().ref(imagePath);

  let readingFile = await fs.readFile(uploadUri, 'base64');
  let blob = await Blob.build(readingFile, {type: `${mime};BASE64`});

  let uploadTask = imageRef.put(blob, {contentType: mime, name: name});

  // let progress = 0;
  //Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED,
    function(snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      if (progress < 30) progress += 10;
      else if (progress >= 30) progress += 5;
      else if (progress >= 85) progress += 1;
      else if (progress >= 95) progress += 0.1;

      _storeData('imageUploadProgress', progress.toString());
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          break;
        case firebase.storage.TaskState.RUNNING:
          break;
      }
    },
    function(error) {
      _storeData('imageUploadProgress', '-1');
    },
    function() {
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        saveData(databaseCollection, docRef, {videoUrl: downloadURL}).then(
          () => {
            _storeData('imageUploadProgress', '100');
          },
        );
      });
    },
  );
}

export async function downloadImage(folder, imageName) {
  var storageRef = firebase.storage().ref();
  var pathRef = storageRef.child(folder + '/' + imageName);

  let url = await pathRef.getDownloadURL();
  return url;
}

export default firebase;
