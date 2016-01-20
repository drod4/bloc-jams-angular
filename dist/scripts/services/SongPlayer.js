(function () {
    function SongPlayer($rootScope, Fixtures) {
         /**
        * @desc Song player object that is injected by the factory service 
        * @type {Object}
        */
        var SongPlayer = {};
        var currentAlbum = Fixtures.getAlbum();
        SongPlayer.currentAlbum = currentAlbum;
        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
        
        /**
        * @function setSong
        * @desc Stops playing if playing, and instantiates currentbuzzObjectnew with new song object
        * @param {Object} song
        */
        var setSong = function (song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                    SongPlayer.volume = currentBuzzObject.getVolume();
                });
            });

            SongPlayer.currentSong = song;
        };

        /**
        * @function playSong
        * @desc Plays the currentBuzzObject and sets the song.playing to true
        * @param {Object} song
        */
        var playSong = function (song) {
            currentBuzzObject.play();
            song.playing = true;
        }
        
        /**
        * @function stopSong
        * @desc Stops playing the current song
        * @param {Object} song
        */
        var stopSong = function (song) {
            currentBuzzObject.stop();
            song.playing = null;
        }
        
         /**
        * @function getSongIndex
        * @desc Looks up and returns the song number of the song
        * @param {Object} song
        * @returns song number {number}
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        /**
        * @desc The currently playing song object
        * @type {Object}
        */
        SongPlayer.currentSong = null;
        
        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;
 		SongPlayer.volume  = 0;
        SongPlayer.maxVolume  = 100;
        
        /**
        * @function play
        * @desc Sets the song and calls playSong() 
        * @param {Object} song
        */
        SongPlayer.play = function (song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                }
            }
        };

        /**
        * @function pause
        * @desc Pauses the playing of the currentBuzzObject 
        * @param {Object} song
        */
        SongPlayer.pause = function (song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /**
        * @function previous
        * @desc  Play the previous song.  Stop playing if already at the first song.
        * @param none
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
         };
        
        /**
        * @function next
        * @desc  Play the previous song.  Stop playing if already at the last song.
        * @param none
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex < currentAlbum.songs) {
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
         };        
        
        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        
        SongPlayer.setVolume = function(volume){
            if(currentBuzzObject){
 		         currentBuzzObject.setVolume(volume);
            }
        };
        
        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();

//(function () {
//    function SongPlayer($rootScope, Fixtures) {
//         /**
//        * @desc Song player object that is injected by the factory service 
//        * @type {Object}
//        */
//        var SongPlayer = {};
//        var currentAlbum = Fixtures.getAlbum();
//        SongPlayer.currentAlbum = currentAlbum;
//        
//        /**
//        * @desc Buzz object audio file
//        * @type {Object}
//        */
//        var currentBuzzObject = null;
//        
//        /**
//        * @function setSong
//        * @desc Stops playing if playing, and instantiates currentbuzzObjectnew with new song object
//        * @param {Object} song
//        */
//        var setSong = function (song) {
//            if (currentBuzzObject) {
//                currentBuzzObject.stop();
//                SongPlayer.currentSong.playing = null;
//            }
//
//            currentBuzzObject = new buzz.sound(song.audioUrl, {
//                formats: ['mp3'],
//                preload: true
//            });
//            
//            currentBuzzObject.bind('timeupdate', function() {
//                $rootScope.$apply(function() {
//                    SongPlayer.currentTime = currentBuzzObject.getTime();
//                    SongPlayer.volume = currentBuzzObject.getVolume();
//                });
//            });
//
//            SongPlayer.currentSong = song;
//        };
//
//        /**
//        * @function playSong
//        * @desc Plays the currentBuzzObject and sets the song.playing to true
//        * @param {Object} song
//        */
//        var playSong = function (song) {
//            currentBuzzObject.play();
//            song.playing = true;
//        }
//        
//        /**
//        * @function stopSong
//        * @desc Stops playing the current song
//        * @param {Object} song
//        */
//        var stopSong = function (song) {
//            currentBuzzObject.stop();
//            song.playing = null;
//        }
//        
//         /**
//        * @function getSongIndex
//        * @desc Looks up and returns the song number of the song
//        * @param {Object} song
//        * @returns song number {number}
//        */
//        var getSongIndex = function(song) {
//            return currentAlbum.songs.indexOf(song);
//        };
//        
//        /**
//        * @desc The currently playing song object
//        * @type {Object}
//        */
//        SongPlayer.currentSong = null;
//        
//        /**
//        * @desc Current playback time (in seconds) of currently playing song
//        * @type {Number}
//        */
//        SongPlayer.currentTime = null;
// 		SongPlayer.volume  = 0;
//        SongPlayer.maxVolume  = 100;
//        
//        /**
//        * @function play
//        * @desc Sets the song and calls playSong() 
//        * @param {Object} song
//        */
//        SongPlayer.play = function (song) {
//            song = song || SongPlayer.currentSong;
//            if (SongPlayer.currentSong !== song) {
//                setSong(song);
//                playSong(song);
//            } else if (SongPlayer.currentSong === song) {
//                if (currentBuzzObject.isPaused()) {
//                    currentBuzzObject.play();
//                }
//            }
//        };
//
//        /**
//        * @function pause
//        * @desc Pauses the playing of the currentBuzzObject 
//        * @param {Object} song
//        */
//        SongPlayer.pause = function (song) {
//            song = song || SongPlayer.currentSong;
//            currentBuzzObject.pause();
//            song.playing = false;
//        };
//        
//        /**
//        * @function previous
//        * @desc  Play the previous song.  Stop playing if already at the first song.
//        * @param none
//        */
//        SongPlayer.previous = function() {
//            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
//            currentSongIndex--;
//            
//            if (currentSongIndex < 0) {
//                stopSong(song);
//            } else {
//                var song = currentAlbum.songs[currentSongIndex];
//                setSong(song);
//                playSong(song);
//            }
//         };
//        
//        /**
//        * @function next
//        * @desc  Play the previous song.  Stop playing if already at the last song.
//        * @param none
//        */
//        SongPlayer.next = function() {
//            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
//            currentSongIndex++;
//            
//            if (currentSongIndex < currentAlbum.songs) {
//                stopSong(song);
//            } else {
//                var song = currentAlbum.songs[currentSongIndex];
//                setSong(song);
//                playSong(song);
//            }
//         };        
//        
//        /**
//        * @function setCurrentTime
//        * @desc Set current time (in seconds) of currently playing song
//        * @param {Number} time
//        */
//        SongPlayer.setCurrentTime = function(time) {
//            if (currentBuzzObject) {
//                currentBuzzObject.setTime(time);
//            }
//        };
//        
//        SongPlayer.setVolume = function(volume){
//            if(currentBuzzObject){
// 		         currentBuzzObject.setVolume(volume);
//            }
//        };
//        
//        return SongPlayer;
//    }
//
//    angular
//        .module('blocJams')
//        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
//})();