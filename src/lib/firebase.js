import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBVLKQhwUxk2KfNkBe8axaZjAJNQS134ZQ",
    authDomain: "fir-sample-54eed.firebaseapp.com",
    projectId: "fir-sample-54eed",
    storageBucket: "fir-sample-54eed.appspot.com",
    messagingSenderId: "249505086",
    appId: "1:249505086:web:fb0ac8f80b050f4e3fb86f"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  
const db = firebase.firestore();
export const auth = firebase.auth();
export default firebase;

export const getFirebaseItems = async () => {
  try {
    const snapshot = await db
      .collection("todos")
      .get();
    const items = snapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id })
    );
    return items;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const addFirebaseItem = async (item) => {
  try {
    const todoRef = db.collection("todos");
    await todoRef.add(item);
  } catch (err) {
    console.log(err);
  }
};

export const updateFirebaseItem = async (item, id) => {
  try {
    const todoRef = db.collection("todos").doc(id);
    await todoRef.update(item);
  } catch (err) {
    console.log(err);
  }
};

export const clearFirebaseItem = async (item) => {
  const todoRef = db.collection("todos").doc(item.id);
  await todoRef.delete().then(function () {
  }).catch(function (err) {
    console.log(err);
  });
};