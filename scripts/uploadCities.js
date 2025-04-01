const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc, collection } = require("firebase/firestore");
const fs = require('fs');

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase app and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Read cities data from file
const citiesData = JSON.parse(fs.readFileSync('./public/assets/data/details.json', 'utf-8'));

// Function to upload data to Firestore
const uploadCitiesWithTours = async () => {
  for (const city of citiesData.cities) {
    try {
      const cityRef = doc(db, 'cities', city.id);
      await setDoc(cityRef, {
        id: city.id,
        slug: city.slug,
        name: city.name
      });

      console.log(`City "${city.name}" uploaded successfully!`);

      // Upload tours for each city
      for (const tour of city.tours) {
        const tourRef = doc(collection(cityRef, 'tours'), tour.id);
        await setDoc(tourRef, tour);
        console.log(`  ➜ Tour "${tour.title}" added under "${city.name}"`);
      }

    } catch (error) {
      console.error(`Error uploading city ${city.name}: `, error);
    }
  }
};

// Execute the upload function
uploadCitiesWithTours();
