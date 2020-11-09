const body = document.querySelector('body');
const title = document.querySelector('h1');
const slider = document.querySelector('#slider');

const marginTop = slider.offsetTop;
const sliderHeight = slider.offsetHeight;

let mouseY, isMouseDown;
let permision = true;
let inRange = true;
let block = false;
let pomocnicza = 0, transform = 0;
let startY, startOffSet;

const init = () => {
  document.addEventListener('mousemove', handleMousemove);
  slider.addEventListener('dblclick', dblClickSetup);
}

const handleMousemove = () => {
  mousePress();
  if (isMouseDown) {
    translatingSlider();
  }
}

//decides whether mouseKey is pressed or not
const mousePress = () => {
  //onMouse click
  slider.onmousedown = function () {
    isMouseDown = true;
    startOffSet = slider.offsetTop;
  }
  //onMouse release
  document.onmouseup = function () {
    isMouseDown = false;
    permision = true;
    pomocnicza = transform
    console.log(slider.style.transform)
  }
}

// happens only once at the beginning of move to avoid bugging
const permisionGranting = () => {
  if (permision) {
    startY = mouseY;
    permision = false;
    console.log(`pomocnicza${transform}`);
    console.log(`mouseY${transform}`);
  }
}

//translates the slider and changes background-color
const translatingSlider = () => {
  mouseY = window.event.y; //key idea is here (?) -32 +32
  console.log(`transform ${transform}`)
  if (inRange) {
    permisionGranting();
    if (transform >= 0 && transform <= 300) {
      if (block) {
        transform = 0;
      } else {
        transform = mouseY - startY + pomocnicza;
      }
      if (mouseY > marginTop && block === true) {
        block = false;
        startY = mouseY;
        pomocnicza = 0;
      }

      if (transform < 0) {
        transform = 0;
      } else if (transform > 300) {
        transform = 300;
      }
      slider.style.transform = `translate(0,${transform}px)`;
      body.style.backgroundColor = `rgba(0, 0, 0, ${(transform) / 300})`;
      title.style.color = `rgba(${transform}, ${transform}, ${transform}, 0.91)`;
    } else if (transform < 0) {
      slider.style.transform = `translate(0,0px)`;
      // isMouseDown = false;
      inRange = false;
      transform = 0;
    } else {
      slider.style.transform = `translate(0,300px)`;
      // isMouseDown = false;
      inRange = false;
      transform = 300;
    }
  } else if (mouseY >= marginTop && mouseY <= marginTop + 300) {
    inRange = true;


    //tu cos
    if (transform === 0) {
      // startY = marginTop + pomocnicza + 64;
      // transform = 0;
      block = true;
    } else {
      startY = marginTop + pomocnicza;
    }
  }
}

const dblClickSetup = function () {
  this.style.transition = 'transform 0.7s  ease-in-out';
  body.style.transition = 'background-color 0.7s ease-in-out';
  title.style.transition = 'color 0.7s ease-in-out';
  if (150 - transform >= 0 && transform !== 0 || transform === 300) {
    transform = 0;
    pomocnicza = 0;
    this.style.transform = 'translate(0, 0px)';
    title.style.color = 'rgba(0 ,0 , 0, 0.91)';
    body.style.backgroundColor = 'rgba(0 ,0 , 0, 0)';
  } else if (150 - transform < 0 && transform !== 300 || transform === 0) {
    transform = 300;
    pomocnicza = 300;
    this.style.transform = 'translate(0, 300px)';
    title.style.color = 'rgb(255 ,255 , 255)';
    body.style.backgroundColor = 'rgba(0 ,0 , 0, 1)';
  }

  setTimeout(function () {
    slider.style.transition = '';
    body.style.transition = '';
    title.style.transition = '';
  }, 700);

}

init()