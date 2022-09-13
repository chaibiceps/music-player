if(document.querySelector(".popupp"))  {
// gif pause play function 

// let isplaying = false;
// let playanim =  document.querySelector(".big-btn")

// function changebg(){
//     if(!isplaying  ){
//         isplaying=true
      
//         document.querySelector("#image").src = "gif/bloom.gif"
//     }
//     else{
//         isplaying=false
       
//         document.querySelector("#image").src = "images/bloom.jpg"

//     }
  
// }

// playanim.addEventListener("click", changebg)


// declaring variables 

const playbtn = document.querySelector("#play")
let prevbtn = document.querySelector("#previous")
let nextbtn = document.querySelector("#next")
let title = document.querySelector("#songtitle")
let audio = document.querySelector("#audio")
let artistname = document.querySelector(".song-artist")
const cover = document.querySelector("#image");
let musiContainer = document.querySelector("#music-container")
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

const songs = ['afternoon', 'bloom', 'water wood']

let songIndex = 0

loadSong(songs[songIndex])

function loadSong(song) {
    title.innerText = song
    audio.src = `music/${song}.mp3`
    cover.src = `gif/${song}.gif`
   
}

function playSong() {
    musiContainer.classList.add('play')
    playbtn.querySelector('i.fas').classList.remove('icon-play')
    playbtn.querySelector('i.fas').classList.add('icon-pause')
    audio.play()

}
function pauseSong (){
    musiContainer.classList.remove('play')
    playbtn.querySelector('i.fas').classList.add('icon-play')
    playbtn.querySelector('i.fas').classList.remove('icon-pause')
    audio.pause()


}

function prevsong(){
    songIndex--
    if(songIndex <0){
        songIndex= songs.length - 1

    }
    loadSong(songs[songIndex])
    playSong()
}

function nextsong(){
    songIndex++
    if (songIndex > songs.length -1){
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  }
  
  // Set progress bar
  function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
  
    audio.currentTime = (clickX / width) * duration;
  }
  
  //get duration & currentTime for Time of song
  function DurTime (e) {
      const {duration,currentTime} = e.srcElement;
      var sec;
      var sec_d;
  
      // define minutes currentTime
      let min = (currentTime==null)? 0:
       Math.floor(currentTime/60);
       min = min <10 ? '0'+min:min;
  
      // define seconds currentTime
      function get_sec (x) {
          if(Math.floor(x) >= 60){
              
              for (var i = 1; i<=60; i++){
                  if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
                      sec = Math.floor(x) - (60*i);
                      sec = sec <10 ? '0'+sec:sec;
                  }
              }
          }else{
               sec = Math.floor(x);
               sec = sec <10 ? '0'+sec:sec;
           }
      } 
  
      get_sec (currentTime,sec);
  
      // change currentTime DOM
      currTime.innerHTML = min +':'+ sec;
  
      // define minutes duration
      let min_d = (isNaN(duration) === true)? '0':
          Math.floor(duration/60);
       min_d = min_d <10 ? '0'+min_d:min_d;
  
  
       function get_sec_d (x) {
          if(Math.floor(x) >= 60){
              
              for (var i = 1; i<=60; i++){
                  if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
                      sec_d = Math.floor(x) - (60*i);
                      sec_d = sec_d <10 ? '0'+sec_d:sec_d;
                  }
              }
          }else{
               sec_d = (isNaN(duration) === true)? '0':
               Math.floor(x);
               sec_d = sec_d <10 ? '0'+sec_d:sec_d;
           }
      } 
  
      // define seconds duration
      
      get_sec_d (duration);
  
      // change duration DOM
      durTime.innerHTML = min_d +':'+ sec_d;
          
  };





//event listeners  "
playbtn.addEventListener('click',()=>{
const musicplaying = musiContainer.classList.contains('play')
    
if (musicplaying ) {
    pauseSong()
   

} else {
    playSong()
}
})
document.body.onkeyup = function(e){
    if(e.keyCode == 32){
    const musicplaying = musiContainer.classList.contains('play')
        
    if (musicplaying ) {
        pauseSong()
       
    
    } else {
        playSong()
    }
    }
}

prevbtn.addEventListener('click', prevsong)
// put left arrow function here
document.onkeydown = checkKey;

function checkKey(e) {
    if (e.keyCode == '37'){
        prevsong()
    }
}
nextbtn.addEventListener('click',nextsong)
// put right arrow function here
function checkKey(e) {
    if (e.keyCode == '39'){
        nextsong()
    }
}


audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// Time of song
audio.addEventListener('timeupdate',DurTime);

}