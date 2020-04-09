const DB_NAME = 'attemptDb'
const DB_VERSION = 1

let attemptsDb;

// *************************** Create Database ************************************//'
 function getDb() {
    return new Promise((resolve,reject) => {
        // if(attemptsDb) {return resolve(attemptsDb); }
        // console.log('Opening db',attemptsDb);
        let request = indexedDB.open(DB_NAME,DB_VERSION)

        request.onerror = e =>
        {
            console.log('Error opening db',e)
            reject('Error')
        }

        request.onsuccess = e => {
            attemptsDb = e.target.result;
            console.log('on success open')
            console.log(attemptsDb)
            resolve(attemptsDb);
        }

        request.onupgradeneeded = e => {
            console.log('onupgradeneeded')
            console.log(attemptsDb)
            attemptsDb = e.target.result;
            if (!attemptsDb.objectStoreNames.contains('attempts')) 
            {
                let store = attemptsDb.createObjectStore("attempts", { keyPath: "id", autoIncrement:true } )
                console.log('create index')
                store.createIndex('round', 'roundId', { unique: false });
                console.log('index created')
            }
            
           
        }

    })

}





// *************************** Add attempts ************************************//

// export function addAttemptToDb(attempt)
// {
//     return new Promise((resolve) => {
//         let transaction = attemptsDb.transaction(['attempts'],'readwrite')
//         transaction.oncomplete = e => {
//             resolve(e);
//         };

//         let store = transaction.objectStore('attempts');
//         store.add(attempt)


//     })
// }


function addAttempt(attempt)
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





// *************************** Get attempts ************************************//

// export function getAttemptsFromDb()
// {
//     return new Promise((resolve) => {

//         console.log('hämta attempts')
//         //hämtade attempts
//         let attempts = [];
//         let transaction = attemptsDb.transaction(['attempts'],'readonly')
//         //returnera attempts
//         transaction.oncomplete = e => {
//             console.log('returnera attempts',e)
//             resolve(attempts);
//         };

//         let store = transaction.objectStore('attempts');
//         store.openCursor().onsuccess = e => {
//             let cursor = e.target.result;
//             if (cursor)
//             {
//                 console.log('add attempts')
//                 attempts.push(cursor.value)
//                 cursor.continue();
//             }
//         }

//     })
// }

// export function getAttemptsPerRound(roundId)
// {
//     return new Promise((resolve) =>{
//         let transaction = attemptsDb.transaction("attempts"); // readonly
//         let attempts = transaction.objectStore("attempts");
//         let attemptsPerRound = attempts.index("round");
    
//         let request = attemptsPerRound.getAll(roundId);
    
//         request.onsuccess = function() {
//             if (request.result !== undefined) {
//                 resolve(request.result); // array of books with price=10
//             } else {
//                 resolve([])
//             }
//         };
//     })

// }

export function getAttemptsPerRound(roundId)
    {
        return new Promise((resolve) =>{
            let transaction = attemptsDb.transaction("attempts"); // readonly
            let attempts = transaction.objectStore("attempts");
            let attemptsPerRound = attempts.index("round");
        
            let request = attemptsPerRound.getAll(roundId);
        
            request.onsuccess = function() {
                if (request.result !== undefined) {
                    resolve(request.result); // array of books with price=10
                } else {
                    resolve([])
                }
            };
        })
    
    }


export  class AttemptStore
{
    //do not call directly 
    //call construct from CreateStore
    constructor()
    {
        
        
    }

    static Create()
    {
        return new AttemptStore();
    }

    async add(attempt)
    {
        await getDb()
        await addAttempt(attempt)
    }

    async attemptsPerRound(roundId)
    {
        await getDb()
        let attempts = await getAttemptsPerRound(roundId)
        console.log(attempts)
        return attempts;

    }


  
}


