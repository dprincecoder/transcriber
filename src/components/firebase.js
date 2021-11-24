// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDhuZ6vxWvPxpyAJXxHSZoOvHVo89eopLw",
	authDomain: "transcriber056.firebaseapp.com",
	projectId: "transcriber056",
	storageBucket: "transcriber056.appspot.com",
	messagingSenderId: "852306781946",
	appId: "1:852306781946:web:f8a5cc5fba9599459e4b43",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };
