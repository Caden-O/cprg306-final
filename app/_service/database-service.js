import { db } from "../_utils/firebase";
import { collection, getDocs, getDoc, setDoc, addDoc, deleteDoc, query, doc, onSnapshot } from "firebase/firestore";

export const listenToMessages = (channel, onMessagesUpdate) => {
  const q = query(collection(db, "messages", channel, "messages"));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const messages = [];

    querySnapshot.forEach((doc) => {
      const message = doc.data();
      message.id = doc.id;
      messages.push(message);
    });

    onMessagesUpdate(messages);
  });

  return unsubscribe;
};

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

export const createReport = async (rdUserID, rgUserID, rdMessageID, rdMessageText, rgMessage, date, channel) => {  
  const docRef = await addDoc(collection(db, "reports", channel, "messages"), {
    reportedUserID: rdUserID,
    reportingUserID: rgUserID,
    reportedMessageID: rdMessageID,
    reportedMessageText: rdMessageText,
    reportReason: rgMessage,
    reportTime: date,
  });
  console.log("created new message: ",docRef);
}

export const addUserIfNotExists = async (user) => {
  if (user == null) return;
  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);
  if (!snap.exists()) {
    const provider = user.providerData?.[0]?.providerId ?? "unknown";
    await setDoc(userRef, {
      userID: user.uid,
      username: user.displayName || user.email?.split("@")[0] || "user",
      displayName: user.displayName || "User",
      email: user.email ?? null,
      img: user.photoURL ?? null,
      provider: provider,
      status: "user",
    });

    console.log("Created new user:", user.uid);
  } else {
    console.log("User exists in database");
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