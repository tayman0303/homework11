let song11, song22, song33;
let fft; let smoothing = 0.8; let bins = 512;
let waveform = [];
let spectrum = [];
let vol;
let size = 15;
let num = 10; 
let grid = []; let min = 150;
let distFromCenter = [];

function preload() {
  song11 = loadSound('AtomicHipHop.mp3');
  song22 = loadSound('PopLoop.wav');
  song33 = loadSound('Frutiger.wav');
}




function setup() 
{
  createCanvas(400, 400, WEBGL);
  fft = new p5.FFT();
  userStartAudio();
  song11.setVolume(0.01);
  song22.setVolume(0.01);
  song33.setVolume(0.01);
  
  let song1Button = createButton("Hellcat");
  let song2Button = createButton("On & On");
  let song3Button = createButton("My Heart");
  let stopButton = createButton("Stop Music")
  
  song1Button.mousePressed(song1);
  song2Button.mousePressed(song2);
  song3Button.mousePressed(song3);
  stopButton.mousePressed(stopMusic);

  
  
  for(let i=0; i<num; i++)
  { grid[i] = [];
    for (let j=0; j<num; j++)
    { grid[i][j] = []; 
      for (let k=0; k<num; k++)
        //FLOOR GIVES CLOSEST INTEGER
      { grid[i][j][k] = floor(noise(2));
       
       let offset = size/2 - num/2*size;
       let x = i*size + offset;
       let y = j*size + offset;
       let z = k*size + offset;
       let distance = dist(x, y, z, 0,0,0);
       
       distFromCenter.push({i,j,k, distance})
       
      }
    }
  }
  distFromCenter.sort(compareDistances);
}

function compareDistances(a,b) {
  return a.distance - b.distance;
}


function draw() {
  background(6.7);
  orbitControl();
  //rotateX(frameCount/1000);
  //rotateZ(frameCount/10000);
  waveform = fft.waveform();
  spectrum = fft.analyze();
  let vol = fft.getEnergy(20,140);

  let totalCubes = num*num*num;
  for (let i=0; i<totalCubes; i++){
    let pos = distFromCenter[i];
    let c = map(spectrum[i], 0, 255, min, 255);
    grid[pos.i][pos.j][pos.k] = c;
  }

  let offset = size/2 - num/2 * size
  translate(offset,offset,offset);
  for(let i=0; i<num; i++)
  {
    for (let j=0; j<num; j++)
    {
         // rotateZ(frameCount/(vol*100));
   //rotateX(frameCount/(vol*10000));
    
      //rotate(45);
      for (let k=0; k<num; k++){
        if (grid[i][j][k] > min) {
         fill(min*vol,num*vol,k/vol);
        strokeWeight(0);
      } else {
        fill(vol*noise(1,3),vol/i, vol-15);
      }
      push();{
    translate(i*size, j*size, k*size)
    box(vol/2,vol/10,vol/2);
      } pop();
    
  
    } 
  }
}
}

function song1(){
  song11.play();
}

function song2(){
  song22.play();
}

function song3(){
  song33.play();
}

function stopMusic(){
  song11.stop();
  song22.stop();
  song33.stop();
}