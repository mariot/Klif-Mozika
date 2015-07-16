# Klif Mozika
HTML5 application based purely on Web technologies.

Application intended to be used in Firefox OS (should also work in Windows, Linux, Mac OS X and Android if Firefox browser installed).

There are some interesting technologies used here:
* [Polymer](http://www.polymer-project.org/) (Web Components)
* [Web Audio API](http://www.w3.org/TR/webaudio/)
* [Aurora.js](https://github.com/audiocogs/aurora.js) (playing and decoding of metadata from some files without native browser support)

Main features:
* generate playlist in normal or random order
* repeat one song, playlist or do not repeat anything
* remember current track in playlist after app restarts (you will not listen the same songs over and over from the beginning)
* create or extend playlist with tracks of specific artist, album, genre, year or rating
* extract meta-tags from music files including album cover and show them in app interface (blurred cover is used as application background)
* sound equalization with graphical equalizer
* pre-installed equalizer presets
* environment sound effects (surround) to imitate real physical spaces
* obviously, play:) files in formats mp3, mp4, flac and alac

# Install from source

* Download and extract content of this repository somewhere on local drive
* Mozilla Firefox > Tools > Web Developer > App Manager
* Add Packaged App
* Choose directory with downloaded and extracted files
* Start Simulator (If you do not have Firefox OS Simulator extension installed yet - you have to install it)
* Press Update in App Manager
* Click "CleverStyle Music" icon on home screen inside simulator

# Contribute

Feel free to share some ideas for new features, report any issues, fork and contribute!

# License
MIT license, see license.txt
