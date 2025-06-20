The Tiny Chronicler is a travelling electronic instrument chronicling the changing Earth from the perspectives of different voices. The device collects and interprets stories, texts, audio, and video fragments to generate music compositions and poetic collages. These compositions coalesce through a workshopping process into an evening-length live performance. The instrument is designed to be used as the centrepiece of intermedia performances by the music ensemble Passepartout Duo.

![Tiny Chronicler](/tinychronicler/tinychronicler-1.jpg)

By importing a voice recording, pictures and videos into the Tiny Chronicler, it generates a musical score which can then be performed. Through the use of two MIDI instruments connected to the Tinyc Chronicler the duo follows the score, creating an audiovisual performance based on the recorded story. By connecting with local communities during their travels, the Passepartout Duo will conduct interviews with people, capturing a glimpse of that particular time and place. For each individual's voice there will be a unique piece of music, and these recordings will eventually create a new type of artistic archive.

![Tiny Chronicler](/tinychronicler/tinychronicler-2.jpg)

Tiny Chronicler is a hybrid instrument / composition sealed in a case which can easily be transported. The source code and blueprints to build the box are published as open source. It contains a computer with a web interface to upload images, audio recordings and video files to generate musical compositions based on the uploads with the help of Machine Learning and Pattern Matching. Every generated composition can be printed as a score with a built-in printer. The pieces are finally performed live with the duo and Tiny Chronicler together. These intermedial performances consist of music, video projection, lights and the original voice recording.

**Software**

Tiny Chronicler is a custom Python application consisting of a HTTP server with a React web application frontend and multiple services running in the background: Hardware controllers (LED matrix, thermal printer), score generation pipeline backed by the Vosk Speech-To-Text AI model and lastly a performance scheduler, sending OSC commands to a PureData patch (for audio output) and web-browser (for video output).

![Tiny Chronicler](/tinychronicler/tinychronicler-3.jpg)

On start of the Raspberry Pi a WiFi-hotspot is established with which users can log onto the device’s local network (http://tinychronicler.local). The operating system automatically starts the Tiny Chronicler software which runs a web server offering a React web app to allow users to upload images, videos and audio files on the Raspberry Pi storage via a simple interface. This solution allows anyone to access the Tiny Chronicler from any other computer or even smartphone, as long as the Raspberry Pi is turned on.

After uploading and managing so called “Chronicles” the user can choose to generate new “Compositions” based on the uploaded materials. This kicks in a background process where the uploaded audio material is analyzed and matched with pre-defined musical fragments, composed by Marta Forsberg. The analysis is a multi-step process consisting of a speech-to-text conversion (Vosk ML) to obtain data on the timings of the persons speech in the audio recording. These timings are then matched with another pattern analysis to the musical fragments. Other media, like video, image and the original audio file is arranged around these musical fragments. Finally the resulting “Composition” is stored in the database.

From now on the “Composition” can be printed with the built-in thermal printer. The printed score is based on a custom musical notation system, helping the musicians to follow which musical fragments are performed when.

![Tiny Chronicler](/tinychronicler/tinychronicler-4.jpg)

To perform the “Composition”, the user can activate the performance mode. This will start the performance scheduler controlling all hardware. The LED matrix and a “virtual voice” of the Tiny Chronicler lead the musicians as some sort of conductor, giving them a rhythmical reference and count-ins.

While the musicians perform the score with the guidance of the Tiny Chronicler, the uploaded image and video material is shown with an external projector (HDMI output) to the audience. This is realized with another web browser, internally running in fullscreen on the Raspberry Pi, receiving OSC events from the scheduler about which video or image file to show next.

The musical material itself is generated based on a PureData patch, as well running on the Pi. The musicians trigger the samples with MIDI via USB, as they are connected with two MIDI keyboards to the Tiny Chronicler.

![Tiny Chronicler](/tinychronicler/tinychronicler-5.jpg)

All the independent processes (Python program, web browser, PureData etc.) are designed and coordinated in a way where the Tiny Chronicler is ready to receive new material, generate or print compositions or start a performance at any time as soon as it is connected to a power source, without any keyboard, mouse or external screen required.

**Hardware**

Tiny Chronicler
* Raspberry Pi 4 Model B w. HDMI output
* Sound card for Raspberry Pi (HifiBerry DAC2 Pro)
* 32x32 Pixel LED matrix (Adafruit)
* Arduino MEGA 2560 as LED matrix controller
* Thermal printer (Sparkfun)
* Custom Laser-Cut Metal Enclosure

For Performance
* External Projector
* 2x USB MIDI keyboard

![Tiny Chronicler](/tinychronicler/tinychronicler-6.jpg)

**Credits**

* Marta Forsberg (Musical Composition, Concept)
* Andreas Dzialocha (Software- and Hardware-Development, Concept)
* Nicoletta Favari (Performance, Concept)
* Christopher Salvito (Performance, Hardware-Design, Concept)

**Residency**

Collaborative residency at Studio eOle, 16.-22.10.2022, Toulouse, France.

**Funding**

This project is kindly supported by Konstnärsnämnden, Sweden.

![Tiny Chronicler](/tinychronicler/tinychronicler-7.jpg)
