var cloud1 = document.getElementById('cloud1');
var cloud2 = document.getElementById('cloud2');
var input1 = document.getElementById('input1');
var gameOver = document.getElementById('gameOver');
var heart1 = document.getElementById('heart');
var heart2 = heart1.cloneNode(true);
var heart3 = heart1.cloneNode(true);
var cloud1_1 = cloud1.cloneNode(true);
var cloud1_2 = cloud1.cloneNode(true);
var cloud1_3 = cloud2.cloneNode(true);
var cloud1_4 = cloud2.cloneNode(true);
var cloud1_5 = cloud1.cloneNode(true);
var cloud1_6 = cloud2.cloneNode(true);
var cloud1_7 = cloud2.cloneNode(true);
var cloud1_8 = cloud2.cloneNode(true);
var cloud1_9 = cloud2.cloneNode(true);
var cloud1_10 = cloud2.cloneNode(true);
var cloud1_11 = cloud2.cloneNode(true);
var cloud1_12 = cloud2.cloneNode(true);
var cloud1_13 = cloud2.cloneNode(true);
var cloud1_14 = cloud2.cloneNode(true);

var submitButton = document.getElementById('button1');
var startButton = document.getElementById('button2');
var score = document.getElementById('score');
var answer1 = -1, answer2 = -1, answer3 = -1, answer4 = -1, answer5 = -1, answer6 = -1;
var answers = [answer1, answer2, answer3, answer4, answer5, answer6];
var a, b, c, aa, bb;
var sample1, sample2, sample3, sample4, sample5, sample6;
var samples = [sample1, sample2, sample3, sample4, sample5, sample6];
var current_i = 0;


document.getElementById('container').appendChild(heart2);
document.getElementById('container').appendChild(heart3);

heart1.style.transform = "translate(-417px, -615px) scale(0.31, 0.31)";
heart2.style.transform = "translate(-384px, -705px) scale(0.31, 0.31)";
heart3.style.transform = "translate(-351px, -795px) scale(0.31, 0.31)";

var clY = [-850, -770, -860, -700, -830, -750, -850, -770, -840, -720, -820, -680, -830, -700];

var gameScore = 0;
var cl_timeout = 100;

var cl_speed = 0.5; //cloud speed 
var cl_maxI = 300;  //iterations count 
var cl_opacity = 10; //primary opacity 
var cl_opStep = 0.00825; //opacity reduce step 
var cl_clouds = [cloud1_1, cloud1_2, cloud1_3, cloud1_4, cloud1_5, cloud1_6, cloud1_7, cloud1_8, cloud1_9, cloud1_10, cloud1_11, cloud1_12, cloud1_13, cloud1_14];
var cl_i = 0;
var firstTimeout = true;
var submitVerify = true;
var hearts = [heart1, heart2, heart3];
var h_i = 2;

function start() {
  
  gameScore = 0;
  score.innerHTML = "Score: 0";
  cl_timeout = 100;
  cl_speed = 0.5; 
  cl_maxI = 300;   
  cl_opacity = 10;  
  cl_opStep = 0.00825;
  cl_i = 0;
  firstTimeout = true;
  submitVerify = true;
  hearts = [heart1, heart2, heart3];
  h_i = 2;
  startButton.style.visibility = "hidden";
  submitButton.style.visibility = "visible";
  input1.style.visibility = "visible";
  heart1.style.visibility = "visible";
  heart2.style.visibility = "visible";
  heart3.style.visibility = "visible";
  score.style.visibility = "visible";
  gameOver.style.visibility = "hidden";
  
  for (var z = 0; z < 14; z++){
    try{
      cl_clouds[z].style.visibility == 'hidden';
      document.getElementById('container').removeChild(cl_clouds[z]);
    } catch (err) {}
    
  }
     
  for (var c = 0; c < 14; c++){
  cl_clouds[c].setAttribute('data-foo', "-");
  cl_clouds[c].setAttribute('data-foo1', c);
  cl_clouds[c].setAttribute('data-ifsubmitted', false);
}
  
  runClouds();
}

function runClouds() {
 
      current_i = Math.trunc(Math.random()*5);
      cloudMath();      
      console.log("Dear cheater! The answear is: " + answers[current_i]);
  
      try {
        if ((cl_i >= 0)&&(cl_i < 7)) {
          document.getElementById('container').removeChild(cl_clouds[cl_i+7]);
          cl_clouds[cl_i+7].style.visibility = "hidden";
          cl_clouds[cl_i+7].dataset.ifsubmitted = false;
          cl_clouds[cl_i+7].setAttribute('data-foo', "-");
        }
        if ((cl_i >= 7)&&(cl_i < 14)) {
          document.getElementById('container').removeChild(cl_clouds[cl_i-7]);
          cl_clouds[cl_i-7].style.visibility = "hidden";
          cl_clouds[cl_i-7].dataset.ifsubmitted = false;
          cl_clouds[cl_i-7].setAttribute('data-foo', "-");
        }
      } 
      catch (err) {}
      
      if (gameOver.style.visibility == "hidden"){
        cl_clouds[cl_i].style.visibility = "visible";
        cl_clouds[cl_i].querySelectorAll('div:last-child')[2].innerHTML = samples[current_i];    
        document.getElementById('container').appendChild(cl_clouds[cl_i]);
        cl_clouds[cl_i].setAttribute('data-foo', cl_i);
      }
            
      if ((gameScore >= 10)&&(gameScore < 20)) { cl_speed = 1; cl_opacity = 9; cl_opStep = 0.015; }
      if ((gameScore >= 20)&&(gameScore < 40)) { cl_speed = 1.5; cl_opacity = 7; cl_opStep = 0.0173;}
      if ((gameScore >= 40)&&(gameScore < 50)) { cl_speed = 2; cl_opacity = 6; cl_opStep = 0.01965;}
      if (gameScore >= 50) { cl_speed = 2.5; cl_opacity = 5.5; cl_opStep = 0.023;}
    
      cloudMove(cl_clouds[cl_i], -310, clY[cl_i], cl_speed, cl_maxI, 10, cl_opacity, cl_opStep);

        
      if (cl_i < 13){cl_i += 1;} else {cl_i = 0;}    
} 

var x;

function submit() {
    
  if (submitVerify == true){    
             
      if (cl_i == 0){x = 13;} else {x = cl_i - 1;}
            
      if (answers[current_i] == input1.value) {                   
               
        gameScore += 1;
        score.innerHTML = "Score: " + gameScore;       

        document.getElementById('container').removeChild(cl_clouds[x]);
        cl_clouds[x].dataset.ifsubmitted = true;
        cl_clouds[x].setAttribute('data-foo', "-");

        if (hearts[0].style.visibility == 'visible') {
           cl_timeout = 100;
           runClouds();
        }             

        submitVerify = false;
        setTimeout (function() { submitVerify = true; }, 1000);    
      }
   
      
  }
  
  input1.value="";  
}

//cloudMove parameters: Cloud name, i0, y offset, cloud speed, iterations count, timeout size, opacity0, opacity step
function cloudMove (cloud, i, y, speed, iterations, time, opacity, opacityStep)
{
  setTimeout(function() {  
    cloud.style.transform = "translate(" + i + "px," + y + "px)";
    cloud.style.opacity = opacity;
        
    if (i < iterations){
      i += speed;
      opacity -= opacityStep;      
      cloudMove(cloud, i, y, speed, iterations, time, opacity, opacityStep);
    }
    else{          
      //Cloud finished its way, no answer   
        if (document.getElementById('container').querySelector('[data-foo1="'+ cloud.dataset.foo1 + '"]') != null){
          if (hearts[0].style.visibility == 'visible') {
            cl_timeout = 100;
            runClouds();
          }
          hearts[h_i].style.visibility = 'hidden';
          if (h_i == 0){gameover();}
          h_i--;
          
        }         
    }
  }, time);
}

function validateInput(inp) {
  inp.value = inp.value.replace(/[^\d]*/g, '');
}

function gameover(){
  startButton.style.visibility = "visible";
  gameOver.style.visibility = "visible";
  submitButton.style.visibility = "hidden";
  input1.style.visibility = "hidden";
  score.style.visibility = "hidden";
  gameOver.innerHTML = "Game over! Your score is " + gameScore + " :)";
  
  for (var z = 0; z < 14; z++){
    try {
      cl_clouds[z].style.visibility == 'hidden';
      document.getElementById('container').removeChild(cl_clouds[z]);
    } catch (err) {}
    
  }
  
}

function cloudMath(){
  //a*b, aa*b, a*bb, aa+b, a+bb, aa+bb, aa-b
  a = Math.trunc(Math.random()*(9 - 1) + 1);
  b = Math.trunc(Math.random()*(9 - 1) + 1);
  c = Math.trunc(Math.random()*(9 - 1) + 1);
  aa = Math.trunc(Math.random()*(99 - 10) + 10);
  bb = Math.trunc(Math.random()*(99 - 10) + 10);
  sample1 = a + " * " + b; answer1 = a*b; //a * b
  sample2 = aa + " - " + b; answer2 = aa-b; //aa - b
  sample3 = a + " + " + bb; answer3 = a+bb; //a + bb
  sample4 = a + "+" + b + "+" + c; answer4 = a+b+c; //a + b + c
  sample5 = aa + " + " + bb; answer5 = aa+bb; //aa + bb
  sample6 = aa + " * " + b; answer6 = aa*b; //aa * b  
  
  answers = [answer1, answer2, answer3, answer4, answer5, answer6];
  samples = [sample1, sample2, sample3, sample4, sample5, sample6];
}