const DB_NAME = 'attemptDb'
const DB_VERSION = 4

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
            function getStore()
            {
                if(!attemptsDb.objectStoreNames.contains('attempts'))
                {
                    return attemptsDb.createObjectStore("attempts", { keyPath: "id", autoIncrement:true } )
                }
                var tx = event.target.transaction;
                return tx.objectStore('attempts');
            }
            let store = getStore()
            if(!store.indexNames.contains('round'))
            {
                store.createIndex('round', 'roundId', { unique: false });
            }
            if(!store.indexNames.contains('taskGroup'))
            {
                store.createIndex('taskGroup', 'taskGroupId', { unique: false });
            }
            if(!store.indexNames.contains('status'))
            {
                store.createIndex('status', 'correct', { unique: false });
            }
         
           
        }

    })

}


// *************************** Add Attempt to Database ************************************//'
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

// *************************** get Attempts per round ************************************//'

function getAttemptsPerRound(roundId)
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


// *************************** get Attempts per taskgroup ************************************//'

function getAttemptsPerTaskGroup(taskGroupId)
{
        return new Promise((resolve) =>{
            let transaction = attemptsDb.transaction("attempts"); // readonly
            let attempts = transaction.objectStore("attempts");
            let attemptsPerRound = attempts.index("taskGroup");
        
            let request = attemptsPerRound.getAll(taskGroupId);
        
            request.onsuccess = function() {
                if (request.result !== undefined) {
                    resolve(request.result); // array of books with price=10
                } else {
                    resolve([])
                }
            };
        })
    
}


function getAttemptsPerCorrectStatus(status)
{
    return new Promise((resolve) =>{
        let transaction = attemptsDb.transaction("attempts"); // readonly
        let attempts = transaction.objectStore("attempts");
        let attemptsPerStatus = attempts.index("status");
    
        let request = attemptsPerStatus.getAll(status);
    
        request.onsuccess = function() {
            if (request.result !== undefined) {
                resolve(request.result); // array of books with price=10
            } else {
                resolve([])
            }
        };
    })
}


function clear()
{
    return new Promise((resolve) =>{

        var transaction = attemptsDb.transaction(["attempts"], "readwrite");

        let store = transaction.objectStore("attempts"); // readonly
       
        let clearRequest = store.clear();

        clearRequest.onsuccess = function(event) {
            resolve()
          // report the success of our clear operation
          console.log(`data is cleared from attemptstore ${event}`)
        };
    })
}






export  class AttemptStore
{

    constructor()
    {
 
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
        return attempts;

    }

    async  answeredTaskIdsPerRound(roundId)
    {
        let attempts = await this.attemptsPerRound(roundId)
        let result = [...new Set(attempts.map((attempt) => attempt.taskId))]
        return result;
    }

    async succesfullTaskIdsPerRound(roundId)
    {
        let attempts = await this.attemptsPerRound(roundId)
        return [...new Set(attempts.filter((attempt) => attempt.correct).map((attempt) => attempt.taskId))]
    }

    async attemptsPerTaskGroup(taskGroupId)
    {
        await getDb()
        let attempts = await getAttemptsPerTaskGroup(taskGroupId)
        return attempts
    }

    async attemptPerStatus(status)
    {
        await getDb()
        let attempts = await getAttemptsPerCorrectStatus(status)
        return attempts
    }

    async clear()
    {
        await getDb()
        await clear()
    }
        
    

}


