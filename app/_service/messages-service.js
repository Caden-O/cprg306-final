import { db } from "../_utils/firebase";
import { collection, getDocs, getDoc, setDoc, addDoc, deleteDoc, query, doc } from "firebase/firestore";

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

export const createReport = async (rgMessage, rgUserID, rdMessageID, rdUserID, date, channel) => {
  const docRef = await addDoc(collection(db, "reports", channel, "messages"), {
    reportedUserID: rdUserID,
    reportingUserID: rgUserID,
    reportedMessageID: rdMessageID,
    reportReason: rgMessage,
    reportTime: date,
    channel: channel
  });
  console.log("created new message: ",docRef);
}

export const addUserIfNotExists = async (user) => {
  if (!user) return;
  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    await setDoc(userRef, {
      userID: user.uid,
      username: user.displayName,
      displayName: user.displayName,
      email: user.email,
      img: user.photoURL,
      status: "user",
      accountType: user
    });
    console.log('created new user: ',snap);
  }else{
    console.log('user exists in database :)');
  }
};

export const deleteMessage = async (channel, id) => {
  try {
    const docRef = doc(db, "messages", channel, "messages", id);
    await deleteDoc(docRef);
    console.log("message successfully deleted!");
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