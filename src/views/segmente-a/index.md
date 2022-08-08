Generative music-composition based on a virtual 3d environment based on Unreal Engine, programmed in Java, C++, UnrealScript.

Hans-Henning Korb (GER) - Composition, Audio-Editing
Andreas Dzialocha (GER) - Programming, Composition
Simon Museaus (NOR) - Visuals, Mathematics, Programming
Sehera Nawaz (GER) - Mathematics, Programming
Jonas Wendelin (GER) - Installation

Shown at Transnatural Festival 2012, Nemo Science Center, Amsterdam 2012

![Segmente A](/segmente-a/segmente-a-8.png)

![Segmente A](/segmente-a/segmente-a-9.png)

![Segmente A](/segmente-a/segmente-a-10.png)

![Segmente A](/segmente-a/segmente-a-11.png)

The project is based on the Unreal Development Kit (UDK) engine. Next to this tools such as Autodesk Maya, SideFX Houdini and Adobe Photoshop was used to make the necessary geometry and textures. For audio CubeBase and Ableton Live was used. Most of the visual content is achieved by using and modifying features provided by the UDK environment, such as building costume shader and shifting the parameters of dynamics lights and fog elements.

![Segmente A](/segmente-a/segmente-a-7.jpg)

An external Java based editor was build for map-creation. Next to this several minor C++ plug-ins was programed to load data into the UDK. A extensive music simulation system and dynamic simulation system was also programmed into the UDK itself. In total about 7000 lines of code.

![Segmente A](/segmente-a/segmente-a-1.png)

The process was a cross-disciplinary one. From programming to solving mathematical problems, recording music and developing the conceptual and artistic aspects of the projects. The tasks was mainly divide among the main participants, though external musicians and programmers was also involved.

The distributable version of the project is a installable software.

Motion / Visual

The geometric environment is constituted from 8 base segments hand-titled into a vast surface. The segments are fragmented from a hexagonal base, rendering them with certain aperiodic properties. This aperiodicity and the manual tiling process saturates the initial state with little imperfections and irregularities which gets amplified during interaction with the user.

The segments are made with just enough polygons to form a volume. They are massive relative to the size of the user and at the same time almost devoid of information. This massless-massiveness derives form a wish to avoid representation. Representation as in the reference abstracted polygon geometry would provide to a real-world references occurring in an users memory or references frame. We found it more interesting to emphasize the plastic forgery the polygon-paradigm, where empty shells are moved by crude vector and matrix operations. In a sense a minimalistic approach to content creation, where a somewhat generic grid is provided to be influenced with the presence of the user.

The self-similarity of the 8 base segments enforces a architecture or topology with an overall coherence. It can oscillates between being an image and a space, whether one moves or not. Its uniformity imply emptiness, and except for the minor imperfections and irregularities little is exist outside that of the anticipations of the user, which in itself is amplified by the musical presence.

To make the environment dynamic a simulation system gives the person acting in the environment an unintentional influence of the topology of the space. As the user moves the segments in the area onto which he or her focus his or her attention are charged, causing the segments to translate at a minor temporal delay. The discharge rate is far lower than the charging rate and a memory of the path and attention of the user is stored in the surrounding topology.

It all occurs with great subtleness and in great distance of the user, such that there is no direct conscious interaction between the user and the environment, rather the environment imposes a decision making process onto the user, which again makes the user react and inform the environment. A feedback loop emerges then from the curiosity of the user. The synthesis of the landscape is so to say animated by his or her reactions as the incoming data drives the translation of the segments. A sub-conscious subjectivity gets channeled into the piece as one find oneself acting in a seemingly autonomous transforming environment, a kind of noise that would probably be impossible to synthesize.

Composition

Composer, Interpret and Score are musical terms which are impossible to be clearly defined in “Segmente”. The “Score” consists of two main “instructions": a landscape, a virtual space being traveled by the user, defining instrumentation, musical factors and dynamics of specific areas. Every single path of a user constitutes an individual musical dramaturgy. The second instruction is a complex logic of four systems, interpreting the user interaction and the landscape manipulation as musical events.

![Segmente A](/segmente-a/segmente-a-2.png)

![Segmente A](/segmente-a/segmente-a-3.png)

![segmente a](/segmente-a/segmente-a-4.png)

Score Instruction A: Map / Landscape

The map is defined by an external tool, a “map editor” written in Java, which helps creating hexagonal structures consisting of segments (“editor mode”) that later can be exported as an own Segmente-map-file-format being read and processed by the Unreal Engine and then translated into an 3D environment. Mainly the map editor serves as an compositional tool (“score mode”), where instrumentation and dynamics of every segment and parameters of the musical systems can be defined. This already implies a new approach to composition as a more spacial process, understanding orchestration as a huge virtual two-dimensional space where color and sound can be specifically localized, placing brass, string or woodwinds core areas. In addition to that, several parameters of the musical systems can be set for every individual segment. Those settings state a compositional frame and a more vague dynamic influence of musical systems and orchestration-color of the piece. Still the users path can evoke completely different moments.

Score Instruction B: Systems

The musical systems of Segmente are named I. IRRLICHTER, II. KÖRPER a) FLÄCHEN b) PATTERNS, III. ORTE, IV. SPUREN and are core elements of the composition, setting the logic of the music, always interpreting the users behavior. It is implemented as a static program-code in unreal plus several dynamic settings defining musical parameters as for example crescendo / decrescendo lengths and dynamics (ppp - fff) of detailed subsystems. Those dynamic settings can be accessed through the Unreal Engine Editor.

The composition is written for a maximum of 32 orchestra instruments with an dynamic instrumentation, consisting of violins, viola, violoncello, double bass, clarinets, trumpets, piano and electronic synthesizers. The harmonic material is based on a simple 32 note micro-tonal scale, spanning a small quart-interval from c1 to f1, which results in 16 cents steps covering frequencies between 262 and 349 Hertz. There is a underlying meter of 60 bpm (quarter note) although the music is not rhythmical in this sense.

For the installation the music is played on a multi-channel system consisting of four speakers placed around the user to achieve the effect of acoustical isolation from the real space, establishing an artificial acoustic space. Inside the unreal engine there is different self written classes handling the composition, sampling the music, caring about the orchestration and the channel and speaker handling. The musical material consists of recorded “real” plus computer-generated synthesized instruments, resulting in a large sample-library (> 800mb) of small one-note loops or musical miniatures depending on the musical system.

![Segmente A](/segmente-a/segmente-a-5.jpg)

![Segmente A](/segmente-a/segmente-a-6.jpg)

IRRLICHTER is a system consisting of 32 separate small miniatures, aggregates of violin and piano harmonies. The second system KÖRPER consists of two sub-systems FLÄCHEN and PATTERNS. “Flächen” is a system generating micro-tonal clusters, getting its harmonic character and instrument-color from the segments being defined in the map editor and then individually charged by the user. The landscape the user generates could therefore be seen as an “visualization” of a micro-tonal cluster. “Patterns” are 16 different tempered static miniatures between one and 16 bars, but written inside the same quart-interval. Depending on where they have been placed on the map they are being played as an light texture inside the micro-tonal body emerging strange harmonic moments between the contrasting strong dissonances.

SPUREN define the only electro-acoustic element of the composition, enriching the musical color with small “glockenklang”-like synthesizer impulses and deep sinus basses. This system follows a spatial but also temporal logic. Its separated into a spectrum of low to high synthesizer sounds. The more people have been visiting the same place as the current user the more dense the impulses and bigger the spectrum gets. The dramaturgy of the users musical experience is not only led by his own manipulation but also by experiencing the relics in the landscape of past visitors.

ORTE is a special more installation-like system which is mainly being played on its own. It consists of 8 different noisy multi-channel compositions. They are very rarely placed on the map (again with the map editor), creating moments of standstill, freezing the charging and manipulation logic for this period until the user leaves this area.

All those systems run mainly independently. With its strong connection to the visual element of Segmente  and its users interaction it results in an extremely complex chaotic micro-world in the sense of a system which changes rapidly already with small changes of its factors. We found ourselves overwhelmed by this unpredictable dynamic behavior, scaffolding a frame, defining its inner logic and adjusting the parameters but still being surprised of the constantly changing state of the system of all those components working together.

Every session is being protocoled in an external file storing every musical event, its dynamic, note, count and bar so there is the possibility to convert this collected data into MIDI information which can be used to print a “classical” score of the piece opening new perspectives on a generative music being performed by an real ensemble.