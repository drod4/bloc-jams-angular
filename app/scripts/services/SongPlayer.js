(function() {
     function SongPlayer(Fixtures) {
          var SongPlayer = {};
         
         
     /** Injected the Fixtures service into the SongPlayer service */
         
         var currentAlbum = Fixtures.getAlbum();
         
    /**
    * @desc Current selected song
    * @type {Object}
    */
         
 /**
 * @desc Buzz object audio file
 * @type {Object}
 */
         
     var currentBuzzObject = null;
         
 /**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */

         
         var setSong = function(song) {
    if (currentBuzzObject) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
    }
 
    currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
    });
 
    SongPlayer.currentSong = song;
 };
         
         var stopSong = function(song){
              currentBuzzObject.stop();
             song.playing = null;
          };
         
         /**
        * @function playSong
        * @desc Plays selected song and changes the playing variable to true
        * @param {Object} song
        */
         
         var playSong = function(song){
            currentBuzzObject.play();
            song.playing = true;
        };
         
         /** a function to get the index of a song */
         
         var getSongIndex = function(song) {
     return currentAlbum.songs.indexOf(song);
 };
         
         /**
* @desc Active song object from list of songs
* @type {Object}
*/
         SongPlayer.currentSong = null;
         
         
         SongPlayer.play = function(song) {
             song = song || SongPlayer.currentSong;
             if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);   
                song.playing = true;    
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                playSong(song);
             
         }
       }
    };
         
             
     
        
            
     };
    
    /** @function next
    * @desc Changes the currentSong to the previous song by incrementing the song index
       */
        
    SongPlayer.next = function(){
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            var song = currentAlbum.songs[currentSongIndex];
            
            if(currentSongIndex > currentAlbum.songs.length - 1){
                stopSong(SongPlayer.currentSong);
            } else {
                setSong(song);
                playSong(song);
            }
        };
        
        
         
         SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
 };
    
    /** method to go to previous song */
    
    SongPlayer.previous = function() {
     var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     currentSongIndex--;
        if (currentSongIndex < 0) {
         currentBuzzObject.stop();
         SongPlayer.currentSong.playing = null;
     } else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
     };

    return SongPlayer;
 };
    
    /** Update the "previous" method with stop the currently playing song, and
set the value of the currently playing song to the first song. */
     
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();