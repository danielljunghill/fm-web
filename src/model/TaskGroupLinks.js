
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


