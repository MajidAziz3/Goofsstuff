const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
let db = admin.firestore();
db.settings({timestampsInSnapshots: true});

function getRestaurant(restaurantToken) {
    let userRef = db.collection('Restaurants').doc(restaurantToken);
    let getDoc = userRef.get()
        .then(doc => {
            if (!doc.exists) {
                return 0
            } else {
                return doc.data()
            }
        })
        .catch(err => {
        });
    return getDoc;
}

function getUser(userToken) {
    let userRef = db.collection('Users').doc(userToken);
    let getDoc = userRef.get()
        .then(doc => {
            if (!doc.exists) {
                return 0
            } else {
                return doc.data()
            }
        })
        .catch(err => {
        });
    return getDoc;
}

    exports.sendNotification = functions.firestore
    .document('users/{id}')
    .onUpdate(async (change, context) => {
        console.log(context)
        console.log(change.after.data().send_request)
        index = change.after.data().send_request.length
        request = change.after.data().send_request[index-1]
        console.log('Request',request);

        await getUser(request.userId).then(async(reciever)=>{
            await getUser(context.params.id).then(async(sender)=>{
                const payload = {
                            notification: {
                                title: "Friend Request",
                                body: `${sender.name} sent you a friend request.`,
                                // icon: follower.photoURL
                            }
                        };
                        
                        console.log(payload)
                        return admin.messaging().sendToDevice(reciever.fcmToken, payload).then(reponse => {
                            return console.log(`A new notification`);
                        });

            })
        })
         // console.log(change.before.data())
        // const payload = {
        //         notification: {
        //             title: "Friend Request",
        //             body: `Reservation # ${Order.reservationCode} cancelled from ${Order.customerName}.`,
        //             // icon: follower.photoURL
        //         }
        //     };
            
        //     console.log(payload)
        //     return admin.messaging().sendToDevice(Restaurants.fcmToken, payload).then(reponse => {
        //         return console.log(`A new notification for ${Order}`);
        //     });
    });