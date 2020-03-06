// export default function main_model()
// {
//     return { name: 'daniel', age: 12 };
// }

export default class MainModel
{
    constructor()
    {
        this.user = { name: 'daniel', age: 12 };
        this.name = 'orvar';
    }
    user()
    {       
        return this.user;
    }

    changeName()
    {
        let tempName = this.user.name;
        this.user.name = this.name;
        this.name = tempName;
    }
}


