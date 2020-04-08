const DB_NAME = 'attemptDb'
const DB_VERSION = 1

let attemptsDb;

// let request = indexedDB.open(DB_NAME,DB_VERSION)

// request.onerror = e =>
// {
//     console.log('Error opening db',e)
//     reject('Error')
// }

// request.onsuccess = e => {
//     db = e.target.result;
//     resolve(db);
// }

// request.onupgradeneeded = e => {
//     console.log('onupgradeneeded')
//     db = e.target.result;
//     if (!db.objectStoreNames.contains('attempts')) 
//     db.createObjectStore("attempts", { keyPath: "id", autoIncrement:true } )
// }


// function createDb() {
//     return new Promise(resolve =>
//         {
//             setTimeout(() => {
//                 resolve('resolved')
//             },2000);
            
//         });
// }
 
export function getDb() {
    return new Promise((resolve,reject) => {
        if(attemptsDb) {return resolve(attemptsDb); }
        console.log('Opening db',attemptsDb);
        let request = indexedDB.open(DB_NAME,DB_VERSION)

        request.onerror = e =>
        {
            console.log('Error opening db',e)
            reject('Error')
        }

        request.onsuccess = e => {
            attemptsDb = e.target.result;
            resolve(attemptsDb);
        }

        request.onupgradeneeded = e => {
            console.log('onupgradeneeded')
            attemptsDb = e.target.result;
            if (!attemptsDb.objectStoreNames.contains('attempts')) 
                attemptsDb.createObjectStore("attempts", { keyPath: "id", autoIncrement:true } )
        }

    })

}

export function addAttemptToDb(attempt)
{
    return new Promise((resolve) => {
        let transaction = attemptsDb.transaction(['attempts'],'readwrite')
        transaction.oncomplete = e => {
            resolve(e);
        };

        let store = transaction.objectStore('attempts');
        store.add(attempt)


    })
}

