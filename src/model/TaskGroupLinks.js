import { MultiplyTableLink } from "./multiplyTableLink.js"
import { Component } from './component.js'
export class TaskGroupLinks extends Component
{
    constructor(componentName,links)
    {
        super(componentName)
        this.Links = links

    }

    static Create(links)
    {
        return new TaskGroupLinks('TaskGroupLinks',links)
    }
}


export function multiplyTableLinks(store)
{
    let links = [];
    let i = {};
    for(i = 1; i <= 10; i++)
    {   
        let prev = i - 1;
        let link = new MultiplyTableLink(i,i,`MultiplyTable[${prev}]`,store);
        links.push(link);
    }  
    return  TaskGroupLinks.Create(links);
}