# ConvergentCarDealership
Car Dealership App
A simple React + Firebase application for browsing and sorting a list of cars, viewing detailed information, and authenticating users.

Key Features
Car Listings: Displays a grid of available cars, each with images, price, and basic info.
Search & Sort: Users can search by make/model and sort cars by attributes like price or year, in ascending or descending order.
Car Detail Page: Offers detailed car information, including higher-resolution images, mileage, transmission type, and more.
Authentication: Users can register and log in via Firebase Authentication.
Tech Stack
React for the front-end.
Tailwind CSS for styling and responsive layout.
Firebase Firestore (optional) to store car data.
Firebase Authentication to handle user sign-up and login.
Setup & Installation
Clone this repository:
bash
Copy
Edit
git clone https://github.com/yourusername/car-dealership.git
Install dependencies:
bash
Copy
Edit
cd car-dealership
npm install
Configure Firebase:
Create or reuse a Firebase project.
In src/firebase.js, insert your Firebase config and export initialized auth and db.
Run the development server:
bash
Copy
Edit
npm start
App is accessible at http://localhost:3000.
Usage
Login/Register: Create an account or log in to unlock any protected features (like adding a new car).
List & Search: Sort cars by make, model, year, or price; apply text search on car attributes.
View Details: Click a car to see an in-depth page with images, specs, and condition info.
