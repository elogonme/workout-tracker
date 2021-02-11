let db;
// create a new db request for a "workout" database.
const request = window.indexedDB.open("workouts", 1);

request.onupgradeneeded = function (event) {
  db = event.target.result;
  // create object store called "pending-workouts" and set autoIncrement to true
  db.createObjectStore("pending-workouts", { autoIncrement: true });
};

request.onsuccess = function (event) {
  db = event.target.result;

  if (navigator.onLine) {
    console.log('checking db from db.js')
    checkDatabase();
  }
};

request.onerror = function (event) {
  console.log(event);
};

function saveWorkout(workout) {
  // create a transaction on the pending-workouts db with readwrite access
  const transaction = db.transaction(["pending-workouts"], "readwrite");
  // access your pending object store
  const pendingStore = transaction.objectStore("pending-workouts");
  // add record to your store with add method.
  pendingStore.add(workout);
}

function checkDatabase() {
  console.log('Checking DB');
  // open a transaction on your pending db
  const transaction = db.transaction(["pending-workouts"], "readwrite");
  // access your pending object store
  const pendingStore = transaction.objectStore("pending-workouts");
  // get all records from store and set to a variable
  let getAll = pendingStore.getAll();

  getAll.onsuccess = function () {
    if (getAll.result.length > 0) {
      console.log('bulk post');
      fetch('/api/workouts-bulk', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then( async () => {
          // if successful, open a transaction on your pending db
          const transaction = db.transaction(["pending-workouts"], "readwrite");
          // access your pending object store
          const pendingStore = transaction.objectStore("pending-workouts");
          // clear all items in your store
          pendingStore.clear();
        });
    }
  };
}

// listen for app coming back online
window.addEventListener('online', checkDatabase);
