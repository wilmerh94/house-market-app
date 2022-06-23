# Project with React, Vite, Firebase, FireStore, React Router, Toastify, Leaflet and PNPM

## **Market House App**

---

This app is a market house app.
In this app you can buy and sell products, and you can also see the products that you have bought.

Created by Wilmer Herrera

### **Configuration for React, Vite and SVG files**

---

In our terminal we're going to run the following commands:

If you want to start from scratch

```
pnpm create vite my-market-app -- --template react
cd my-market-app
pnpm i
pnpm i react-router-dom
pnpm i firebase
pnpm i react-toastify
```

We need to install this package to be able to run SVG files on Vite

```
pnpm i @honkhonk/vite-plugin-svgr -d
```

### **Vite Configuration for React and SVG files**

After we run vite command in our terminal we are going to have a file calle **vite.config.js**

```
import { defineConfig } from 'vite';
import svgr from '@honkhonk/vite-plugin-svgr';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
plugins: [react(), svgr()],
esbuild: {
jsxFactory: 'h',
jsxFragment: 'Fragment',
},
});

```

### **FireBase Configuration**

We are going to create a file call
**firebase.config.js**
All this information is in the Firebase Console. After you create your project is firebase website.

```
/* eslint-disable @typescript-eslint/no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCB8LycpoRPzysKbL51Yo8MyDqg0Nucwd4',
  authDomain: 'house-market-1.firebaseapp.com',
  projectId: 'house-market-1',
  storageBucket: 'house-market-1.appspot.com',
  messagingSenderId: '710008416596',
  appId: '1:710008416596:web:f7c71d523dd858085f00c1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

```

#### Changing the FireStore Rules

---

You are going to go to FireStore DataBase, then Rules and use this code:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Listings
    match /listings/{listing} {
     allow read;
      allow create: if request.auth != null && request.resource.data.imgUrls.size() < 7;
     allow delete: if resource.data.userRef == request.auth.uid;
    }

    // Users
    match /users/{user} {
     allow read;
     allow create;
     allow update: if request.auth.uid == user
    }
  }
}
```

Then for your FireStore Storage rules are going to be this:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read;
      allow write: if
      request.auth != null &&
      request.resource.size < 2 * 1024 * 1024 && //2MB
      request.resource.contentType.matches('image/.*')
    }
  }
}

```

### Collection in firestore

To use collection on your code you need to create Index collection in FireStore this way you can pull data to your code and then
Example

- Collection: Listing
- Query Scope: Collection

| Field     |            |
| --------- | ---------- |
| type      | Ascending  |
| timestamp | Descending |

- Collection: Listing
- Query Scope: Collection

| Field     |            |
| --------- | ---------- |
| userRef   | Ascending  |
| timestamp | Descending |

- Collection: Listing
- Query Scope: Collection

| Field     |            |
| --------- | ---------- |
| offer     | Ascending  |
| timestamp | Descending |

I used this one for this project

### **Configuration with React Router v6**

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <React.StrictMode>
  <BrowserRouter>
   <App />
  </BrowserRouter>
 </React.StrictMode>,
);

```

### Configuration for React Toastify

In the App.jsx we are going to add the following

```
import { ToastContainer } from 'react-toastify';
```

And inside of are JSX code:
` <ToastContainer />`

### How can I get data from firebase

In the component we want to render we are going to add the following code:

```
import {
 collection,
 getDocs,
 where,
 orderBy,
 limit,
 startAfter,
 query,
} from 'firebase/firestore';
import { useParams } from 'react-router-dom';

```

Where db is pass down from are firebase configuration
Inside of collection where you see listing we are going to use the name of the database we have in firestore
What is inside of query is the parameters we need from are database to be rendered.

```useEffect(() => {
  const fetchListings = async () => {
   try {
    // get reference
    const listingsRef = collection(db, 'listings');

    // Create query object
    const q = query(
     listingsRef,
     where('type', '==', params.categoryName),
     orderBy('timestamp', 'desc'),
     limit(10),
    );
    //  Execute query
    const querySnap = await getDocs(q);
    const listings = [];
    querySnap.forEach((doc) => {
     return listings.push({ id: doc.id, data: doc.data() });
    });
    setListings(listings);
    setLoading(false);
   } catch (error) {
    toast.error('Could not fetch listings');
   }
  };
  fetchListings();
 }, [params.categoryName]);


```

### Adding Leaflet and React-Leaflet

```
pnpm i leaflet react-leaflet

     <MapContainer
      style={{ height: '100%', width: '100%' }}
      center={[listing.geolocation.lat, listing.geolocation.lng]}
      zoom={13}
      scrollWheelZoom={false}>
      <TileLayer
       attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
       url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
      />

      <Marker position={[listing.geolocation.lat, listing.geolocation.lng]}>
       <Popup>{listing.location}</Popup>
      </Marker>
     </MapContainer>

```
