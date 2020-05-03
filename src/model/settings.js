
//import { Attempts } from './Attempts.js'

import { Component } from './component.js'

export class Settings extends Component
{
    
    constructor(attemptStore)
    {       
        super('Settings') 
        this.cleared = false;
        this.attemptStore = attemptStore;
 
    }

    async clearHistory()
    {
        await this.attemptStore.clear();
    }
    

}

