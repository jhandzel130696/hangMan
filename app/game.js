import {Quote} from "./Quote.js";

class Game {
    currentStep=0;
    lastStep=7;

    quotes=[{
        text:'pan tadeusz',
        category:'Utwor literacki'
    },
        {
            text:'janko muzykant',
            category:'utwor literacki'
        },
        {
            text:'rambo',
            category:'film'
        },{
        text:'transformers',
            category:'film'
        }];
  constructor({
    lettersWrapper,
    categoryWrapper,
    wordWrapper,
    outputWrapper,
  }) {
      this.lettersWraper=lettersWrapper;
      this.categoryWrapper=categoryWrapper;
      this.wordWrapper=wordWrapper;
      this.outputWrapper=outputWrapper;

      const {text,category}=this.quotes[Math.floor(Math.random()*this.quotes.length)];
      this.categoryWrapper.innerText=category;

      this.quote=new Quote(text);


  }
  guess(letter,event){
      event.target.disabled=true;
     if(this.quote.guess(letter)){
         this.drawQuote();
     }else{
         this.currentStep++
         document.getElementsByClassName('step')[this.currentStep].style.opacity=1;
         if(this.currentStep===this.lastStep){
             return this.loosing();
         }
     }

  };
  drawLetters(){
      for(let i=10; i<36;i++){
          const label=(i).toString(36);
          const button=document.createElement('button');
          button.innerHTML =label;
          this.lettersWraper.appendChild(button);
          button.addEventListener('click',(event)=>{
              this.guess(label,event);
          })
      }
  };
  drawQuote(){
      const content=this.quote.getContent();
      this.wordWrapper.innerText=content;
      if (!content.includes('_')){
          this.wining();
      }
  }
  start() {

      document.getElementsByClassName('step')[this.currentStep].style.opacity=1;
      this.drawLetters();
        this.drawQuote();


  }
  wining(){
      this.wordWrapper.innerText='Gratki Wygrales'
        this.lettersWraper.innerText='';
  }
  loosing(){
      this.wordWrapper.innerText='Sorki Przegrales'
      this.lettersWraper.innerText='';
  }

}

const game=new Game({
    lettersWrapper:document.getElementById('letters'),
    categoryWrapper:document.getElementById('category'),
    wordWrapper:document.getElementById('word'),
    outputWrapper:document.getElementById('output'),
});
game.start();


