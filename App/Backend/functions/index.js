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
    .document('Orders/{id}')
    .onUpdate(async (change, context) => {
        console.log(context)
        console.log(change.after.data())
        console.log(change.before.data())

        length = change.after.data().Orders.length
        let Order = change.after.data().Orders[length-1]
        console.log(Order)

        await getRestaurant(Order.restaurantId).then((Restaurants)=>{

            if(Order.cancelled == true)
            {
            const payload = {
                notification: {
                    title: "Reservation Cancelled",
                    body: `Reservation # ${Order.reservationCode} cancelled from ${Order.customerName}.`,
                    // icon: follower.photoURL
                }
            };
            
            console.log(payload)
            return admin.messaging().sendToDevice(Restaurants.fcmToken, payload).then(reponse => {
                return console.log(`A new notification for ${Order}`);
            });
        }
        else{
            const payload = {
                notification: {
                    title: "New Reservation",
                    body: `${Order.customerName} has reserved slot for date ${Order.date} and time ${Order.time}\nReservation code ${Order.reservationCode}.`,
                    // icon: follower.photoURL
                }
            };
            
            console.log(payload)
            return admin.messaging().sendToDevice(Restaurants.fcmToken, payload).then(reponse => {
                return console.log(`A new notification for ${Order}`);
            });
        }
           

        });        
    });