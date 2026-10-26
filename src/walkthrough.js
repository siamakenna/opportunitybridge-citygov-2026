const video=document.getElementById('walkthrough-video'),caption=document.getElementById('walkthrough-caption'),track=video.textTracks[0];
// Captions remain large below the player; baked-in captions stay in the original video.
if(track){track.mode='hidden';const update=()=>{const cues=[...track.activeCues||[]];if(cues.length)caption.textContent=cues.map(c=>c.text).join(' ');};track.addEventListener('cuechange',update);video.querySelector('track').addEventListener('load',update);}
