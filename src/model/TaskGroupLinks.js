import { MultiplyTableLink } from "./MultiplyTableLink.js";

export class TaskGroupLinks
{
    constructor(links)
    {
        this.Links = links
    }
}


export function multiplyTableLinks(store)
{
    let links = [];
    let i = {};
    for(i = 1; i <= 10; i++)
    {   
        let prev = i - 1;
        let link = new MultiplyTableLink(i,`MultiplyTable[${prev}]`,store);
        links.push(link);
    }  
    return new TaskGroupLinks(links);
}