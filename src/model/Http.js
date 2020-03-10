


// export function httpGet()
//     {
//         let xmlhttp = new XMLHttpRequest();
//         xmlhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             var myObj = JSON.parse(this.responseText);
//             document.getElementById("demo").innerHTML = myObj.name;
//         xmlhttp.open("GET",'http://localhost:55514/api/hello',true)
//         xmlhttp.send
 
//     }


    

const internalGet =
    async () => {
     
            const response = await fetch('http://localhost:55514/api/hello');
            const json = await response.json();
            return json
     
}

export function httpGet() 
    {
        let json = {}
        let get = internalGet();
        get.then((x) => json.r = x);
        return json;
        
 
     
    }