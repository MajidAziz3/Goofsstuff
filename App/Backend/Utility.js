import * as firebase from 'firebase';
import 'firebase/firestore';
import RNFetchBlob from 'react-native-fetch-blob';
import {Platform} from 'react-native';

// const config = {
//   apiKey: 'AIzaSyD61wFXmxfskdl9ts3fu8XvjOtGgwp07fo',
//   authDomain: 'smeet-7d3d8.firebaseapp.com',
//   databaseURL: 'https://smeet-7d3d8.firebaseio.com',
//   projectId: 'smeet-7d3d8',
//   storageBucket: 'smeet-7d3d8.appspot.com',
//   messagingSenderId: '1069142316343',
//   appId: '1:1069142316343:web:fac015a6768f83de',
//   timestampsInSnapshots: true,
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(config);
// }

var firebaseConfig = {
  apiKey: 'AIzaSyDUmkLCvM2SyvevYYbTr9sA6RTxbxnddpU',
  authDomain: 'good-stuff-191fd.firebaseapp.com',
  databaseURL: 'https://good-stuff-191fd.firebaseio.com',
  projectId: 'good-stuff-191fd',
  storageBucket: 'good-stuff-191fd.appspot.com',
  messagingSenderId: '400332779156',
  appId: '1:400332779156:web:ba12bdbbb3a81f542c8e81',
  measurementId: 'G-Z8H3QJ3CV5',
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export async function getAllOfCollection(collection) {
  let data = [];
  let querySnapshot = await firebase
    .firestore()
    .collection(collection)
    .get();
  querySnapshot.forEach(function(doc) {
    if (doc.exists) {
      //console.log(doc.data());
      data.push(doc.data());
    } else {
      console.log('No document found!');
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
      querySnapshot.forEach(function(doc) {
        console.log(doc.data());
      });
    });
}

export async function saveData(collection, doc, jsonObject) {
  await firebase
    .firestore()
    .collection(collection)
    .doc(doc)
    .set(jsonObject, {merge: true})
    .then(result => {
      console.log('res', result);
      return result;
    })
    .catch(function(error) {
      alert('Error writing document: ', error);
    });
  //console.log("Document successfully written!");
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
      console.log('Document written with ID: ', docRef.id);
      if (docRef.id) {
        console.log('rrrrrrrrrrrrrrr', docRef.id)
       let doc_Id=docRef.id
        obj.post_id = docRef.id;
        await firebase
        .firestore()
        .collection(collection)
        .doc(doc_Id)
        .set(obj, {merge: true})
        .then(result => {
          console.log('res', result);
          return result;
        })
        .catch(function(error) {
          alert('Error writing document: ', error);
        });
      }
    })
    
    reff.set(obj);
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
    docRef.update({
      [array]: firebase.firestore.FieldValue.arrayUnion(value),
    });
  } else {
    saveData(collection, doc, {[array]: [value]});
  }
}

export async function uploadImage(
  imgUri,
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

  let progress = 0;
  //Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED,
    function(snapshot) {
      // console.log('Bytes transferred ' + snapshot.bytesTransferred);
      // console.log('Total bytes ' + snapshot.totalBytes);
      // var progress = ( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );
      if (progress < 30) progress += 10;
      else if (progress >= 30) progress += 5;
      else if (progress >= 85) progress += 1;
      else if (progress >= 95) progress += 0.1;

      _storeData('imageUploadProgress', progress.toString());
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED:
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING:
          console.log('Upload is running');
          break;
      }
    },
    function(error) {
      console.log(error);
      _storeData('imageUploadProgress', '-1');
    },
    function() {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
        saveData(databaseCollection, docRef, {imageUrl: downloadURL}).then(
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
