

export class WordTranslator
{
    constructor(id,words)
    {
        this.words = new Map(words);
        for (let w of words) 
        {
            this.words.set(w.language,w.value)
        }
        this.id = id    
    }

    translate(language)
    {       
        let word = this.words.get(language)
        return word;
    }

}

export class Translators
{
    constructor()
    {
        this.words = new Map();    
        this.langaugeCode = "sv"   
    }
    addWord(word)
    {
        if(!this.words.has(word.id))
        {
            console.log('set word ' + word.id)
            console.log(word)
            this.words.set(word.id, word);
        }
    }
    getWord(id)
    {
     
        this.words.has(id)
        {
           let word = this.words.get(id)  
           return word.translate(this.langaugeCode)
        }     
             
    }
    toggleLanguage()
    {
        console.log('toggelLanguag ' + this.langaugeCode )
        if(this.langaugeCode == "sv")
        {
            this.langaugeCode = "en"
            return;
        }
        this.langaugeCode = "sv"
        
    }

}

let translator = new Translators()
let goBack = [{language:'en', value:'Go back'}, {language:'sv', value:'Gå tillbaka'}]
let answer = [{language:'en', value:'Answer'}, {language:'sv', value:'Svara'}]
let goToNextQuestion = [{language:'en', value:'Go to next question'}, {language:'sv', value:'Gå till nästa fråga'}]
translator.addWord(new WordTranslator('Go_back',goBack))
translator.addWord(new WordTranslator('Answer',answer))
translator.addWord(new WordTranslator('goToNextQuestion',goToNextQuestion))

export default function getTranslator()
{
    return translator;
}






    