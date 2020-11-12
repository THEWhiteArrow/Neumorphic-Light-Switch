const body = document.querySelector('body');
const title = document.querySelector('h1');
const slider = document.querySelector('#slider');

let mouseY, startY, isMouseDown;
let permision = true;
let pomocnicza = 0, translate = 0;


const init = () => {
   document.addEventListener('mousemove', handleMousemovement);
   slider.addEventListener('dblclick', dblClickSetup);
   slider.addEventListener('mousedown', () => {
      isMouseDown = true;
   });
   document.addEventListener('mouseup', () => {
      isMouseDown = false;
      permision = true;
      pomocnicza = translate;
      console.log(slider.style.transform);
   })
}

const handleMousemovement = (e) => {
   if (isMouseDown) {
      translatingSlider(e);
   }
}

// happens only once at the beginning of the move to avoid bugging
const permisionGranting = () => {
   if (permision) {
      startY = mouseY;
      permision = false;
      console.log(`pomocnicza-${pomocnicza}`);
      console.log(`touch place-${mouseY - 150}`);
   }
}

//translates the slider and changes background-color
const translatingSlider = (e) => {
   mouseY = e.y;

   permisionGranting();
   if (translate >= 0 && translate <= 300) {
      translate = mouseY - startY + pomocnicza;

      if (translate < 0) {
         translate = 0;
      } else if (translate > 300) {
         translate = 300;
      }

      slider.style.transform = `translate(0,${translate}px)`;
      body.style.backgroundColor = `rgba(0, 0, 0, ${(translate) / 300})`;
      title.style.color = `rgb(${translate}, ${translate}, ${translate})`;
   }

}

const dblClickSetup = () => {
   slider.style.transition = 'transform .8s  ease-in-out';
   body.style.transition = 'background-color .8s ease-in-out';
   title.style.transition = 'color .8s ease-in-out';
   if (150 - translate >= 0 && translate !== 0 || translate === 300) {
      translate = 0;
      pomocnicza = 0;
      slider.style.transform = 'translate(0, 0px)';
      title.style.color = 'rgb(0 ,0 , 0)';
      body.style.backgroundColor = 'rgba(255 ,255 , 255)';
   } else if (150 - translate < 0 && translate !== 300 || translate === 0) {
      translate = 300;
      pomocnicza = 300;
      slider.style.transform = 'translate(0, 300px)';
      title.style.color = 'rgb(255 ,255 , 255)';
      body.style.backgroundColor = 'rgb(0 ,0 , 0)';
   }

   setTimeout(function () {
      slider.style.transition = '';
      body.style.transition = '';
      title.style.transition = '';
   }, 800);

}

init();