import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, deleteDoc, query, doc, onSnapshot } from "firebase/firestore";

export const getUsers = async () => {
  const users = []
  const q = query( collection(db, "users") );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    const user = doc.data()
    user.id = doc.id;
    users.push(user);
  });
  return [...users];
}

export const getChannels = async () => {
  const channels = []
  const q = query( collection(db, "messages") );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    const channel = doc.data()
    channel.id = doc.id;
    channels.push(channel);
  });
  return [...channels];
}

export const getMessages = async (channel) => {
  const messages = []
  const q = query( collection(db, "messages", channel, "messages") );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    const message = doc.data()
    message.id = doc.id;
    messages.push(message);
  });
  return [...messages];
}

export const sendMessage = async (userID, message, date, channel) => {  
  const docRef = await addDoc(collection(db, "messages", channel, "messages"), {
    userID: userID,
    text: message,
    date: date,
    hidden: false
  });
  console.log("created new message: ",docRef);
}

export const addUser = async (name, email, imgURL, uid) => {  
  const docRef = await addDoc(collection(db, "users"), {
    username: name,
    displayName: name,
    userID: uid,
    img: imgURL,
    email: email,
    status: 'user',
  });
  console.log("created new user: ",docRef);
}

export const deleteMessage = async (channel, id) => {
  try {
    const docRef = doc(db, "messages", channel, "messages", id);
    await deleteDoc(docRef);
    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error removing document: ", error);
  }
};

// const q = query(collection(db, "messages", "general", "messages"));
// const unsubscribe = onSnapshot(q, (querySnapshot) => {
  // const messages = [];
  // querySnapshot.forEach((doc) => {
  //   const message= doc.data()
  //   message.id = doc.id
  //   messages.push(message)
  // });
//   return([...messages])
// });