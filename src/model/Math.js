export function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
       var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
       return v.toString(16);
    });
 }

 export function randomInteger(min,max)
  {
      let value = Math.random() * (max - min + 1) + min;
      let t = Math.floor(+value);
      return t;
  }
  //a + b * c
export let multiply =
    function(a)
      {
          return function(b) // BUG: )
          {
              return a * b;
          }
      }