// import firebase from 'firebase'; // 4.8.1

// class Fire {
//   constructor() {
//     this.init();
//     this.getAllMessages();
//     this.observeAuth();
//     this.state = {
//       user: null,
//     };
//   }

//   init = () =>
//     firebase.initializeApp({
//       apiKey: 'AIzaSyA4be4vwXO-Zn5IYcxA-trViY3j6LtODjg',
//       authDomain: 'foren-se-customers.firebaseapp.com',
//       databaseURL: 'https://foren-se-customers.firebaseio.com',
//       projectId: 'foren-se-customers',
//       storageBucket: 'foren-se-customers.appspot.com',
//       messagingSenderId: '200064457252',
//       appId: '1:200064457252:web:7ec8aa4d569aac16b156b1',
//       measurementId: 'G-VFK8LKML45',
//     });
//   getAllMessages = async () => {
//     var db = firebase.firestore();
//     const citiesRef = db.collection('messages');
//     const snapshot = await citiesRef
//       .where('senderId', '==', -1)
//       .get()
//       .then(querySnapshot => {
//         if (querySnapshot.empty) {
//           console.log('empty');
//         } else {
//           var doc = querySnapshot.docs[0];
//           console.log('Document data:', doc.data());
//         }
//       })
//       .catch(err => {
//         console.log('Error getting document', err);
//       });
//   };
//   observeAuth = () =>
//     firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

//   onAuthStateChanged = user => {
//     if (!user) {
//       try {
//         firebase.auth().signInAnonymously();
//       } catch ({message}) {
//         alert(message);
//       }
//     } else {
//       firebase.auth().signInAnonymously();
//     }
//   };

//   get uid() {
//     return (firebase.auth().currentUser || {}).uid;
//   }

//   get ref() {
//     return firebase.database().ref('messages');
//   }

//   get messageref() {
//     return this.ref.collection('messages');
//   }

//   parse = snapshot => {
//     const {
//       timestamp: numberStamp,
//       text,
//       user,
//       senderId,
//       receiverId,
//       senderMobile,
//     } = snapshot.val();
//     const {key: _id} = snapshot;
//     const timestamp = new Date(numberStamp);
//     const message = {
//       _id,
//       timestamp,
//       text,
//       user,
//       senderId,
//       receiverId,
//       senderMobile,
//     };
//     return message;
//   };

//   on = callback =>
//     // Create a query against the collection

//     this.ref
//       // .limitToLast(1000)
//       .on('child_added', snapshot => callback(this.parse(snapshot)));

//   get timestamp() {
//     return firebase.database.ServerValue.TIMESTAMP;
//   }
//   // send the message to the Backend
//   send = messages => {
//     for (let i = 0; i < messages.length; i++) {
//       const {text, user, senderId, receiverId, senderMobile} = messages[i];
//       const message = {
//         text,
//         user,
//         timestamp: this.timestamp,
//         senderId,
//         receiverId,
//         senderMobile,
//       };
//       this.append(message);
//     }
//   };

//   append = message => this.ref.push(message);

//   // close the connection to the Backend
//   off() {
//     this.ref.off();
//   }
// }

// Fire.shared = new Fire();
// export default Fire;

import firebase from "firebase"; // 4.8.1

import moment from "moment";
class Fire {
  constructor() {
    this.init();
    // this.getAllMessages();

    this.observeAuth();
    this.state = {
      user: null,
    };
  }

  init = () =>
    firebase.initializeApp({
      apiKey: "AIzaSyA4be4vwXO-Zn5IYcxA-trViY3j6LtODjg",
      authDomain: "foren-se-customers.firebaseapp.com",
      databaseURL: "https://foren-se-customers.firebaseio.com",
      projectId: "foren-se-customers",
      storageBucket: "foren-se-customers.appspot.com",
      messagingSenderId: "200064457252",
      appId: "1:200064457252:web:7ec8aa4d569aac16b156b1",
      measurementId: "G-VFK8LKML45",
    });

  checkRoom = async (message, id) => {
    let temp = [];
    await this.db
      .collection("inbox")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log("inbox", doc.data()); // For data inside doc
          // For doc name
          temp.push(doc.id);

          console.log("checkroom_docfind");
        });
        if (temp !== []) {
          const value = temp.find((element) => element === id);
          if (value === undefined) {
            this.addNewRoom(message, id);
          } else {
            this.updatePrevious(message, id);
          }
        } else {
          this.addNewRoom(message, id);
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };
  addNewRoom = (message, id) => {
    console.log("addNewRoom");
    this.db
      .collection("inbox")
      .doc(id)
      .set(message)
      .then(() => {
        console.log("Document successfully written! for inbox screen ");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };
  updatePrevious = (message, id) => {
    this.db
      .collection("inbox")
      .doc(id)
      .update(message)
      .then(() => {
        console.log("Document successfully updated! for inbox screen ");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };
  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = (user) => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    } else {
      firebase.auth().signInAnonymously();
    }
  };

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    return firebase.database().ref("messages");
  }

  get messageref() {
    return this.ref.collection("messages");
  }
  get db() {
    return firebase.firestore();
  }

  parse = (snapshot) => {
    const {
      timestamp: numberStamp,
      text,
      user,
      senderId,
      receiverId,
      senderMobile,
    } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      timestamp,
      text,
      user,
      senderId,
      receiverId,
      senderMobile,
    };
    return message;
  };

  on = (callback) =>
    // Create a query against the collection
    // this.db.collection('-1211').onSnapshot(snapshot => {
    //   snapshot.docChanges().forEach(change => {
    //     console.log('New city: ', change.doc.data());
    //     const {key: _id} = change;
    //     const message = {
    //       timestamp: new Date().getTime(),
    //       text: change.doc.data().text,
    //       user: change.doc.data().user,
    //       senderId: change.doc.data().senderId,
    //       receiverId: change.doc.data().receiverId,
    //       senderMobile: change.doc.data().senderMobile,
    //     };
    //     () => callback(message);
    //   });
    // });
    this.ref
      // .limitToLast(1000)
      .on("child_added", (snapshot) => callback(this.parse(snapshot)));

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  // send the message to the Backend
  send = (messages) => {
    console.log("messages to be send ", messages);
    for (let i = 0; i < messages.length; i++) {
      const {
        text,
        user,
        senderId,
        receiverId,
        senderMobile,
        _id,
        createdAt,
        image,
        type,
        uri,
        location,
      } = messages[i];
      let d = new Date();
      let created = d.toISOString();
      // let created = firebase.database.ServerValue.TIMESTAMP;
      if (type == "text") {
        const message = {
          _id: _id,
          text,
          user,
          timestamp: created,
          senderId,
          receiverId,
          senderMobile,
          createdAt: created,
          type,
        };
        const id = receiverId.concat(senderId);
        this.append(message, id);
      } else if (type == "image") {
        const message = {
          _id: _id,
          text,
          user,
          timestamp: created,
          senderId,
          receiverId,
          senderMobile,
          createdAt: created,
          type,
          image,
        };
        const id = receiverId.concat(senderId);
        this.append(message, id);
      } else if (type == "audio") {
        const message = {
          _id: _id,
          text,
          user,
          timestamp: created,
          senderId,
          receiverId,
          senderMobile,
          createdAt: created,
          type,
          uri,
        };
        const id = receiverId.concat(senderId);
        this.append(message, id);
      } else if (type == "location") {
        const message = {
          _id: _id,
          text,
          user,
          timestamp: created,
          senderId,
          receiverId,
          senderMobile,
          createdAt: created,
          type,
          location,
        };
        const id = receiverId.concat(senderId);
        this.append(message, id);
      }
    }
  };

  append = (message, id) => {
    console.log("append", id);
    this.checkRoom(message, id);
    this.db
      .collection(id)
      .doc(this.messageIdGenerator)
      .set(message)
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };
  // close the connection to the Backend
  off() {
    this.ref.off();
  }
  get messageIdGenerator() {
    // generates uuid.
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      let r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}

Fire.shared = new Fire();
export default Fire;
