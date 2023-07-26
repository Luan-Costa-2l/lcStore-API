import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import dotenv from 'dotenv';
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.NODE_API_KEY,
  authDomain: process.env.NODE_AUTH_DOMAIN,
  projectId: process.env.NODE_PROJECT_ID,
  storageBucket: process.env.NODE_STORAGE_BUCKET,
  messagingSenderId: process.env.NODE_MESSAGING_SENDER_ID,
  appId: process.env.NODE_APP_ID
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const storageRef = ref(storage, 'AdImages');

export const uploadImage = async (file: Express.Multer.File) => {
  const fileRef = ref(storageRef, file.filename);
  let response = await uploadBytes(fileRef, file.buffer);
  if (!response) {
    console.log(new Error(response));
    const defaulUrl = 'https://firebasestorage.googleapis.com/v0/b/lcstore-13d44.appspot.com/o/AdImages%2Fdefault.jpg?alt=media&token=e91ea05e-0e1e-450f-bcfa-44d77820bad2';
    return defaulUrl;
  }
  const url =  await getDownloadURL(fileRef);
  return url;
}