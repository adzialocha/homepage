p2panda aims to provide everything you need to build modern, privacy-respecting and secure local-first applications.

We have adopted a modular approach—allowing projects the freedom to pick what they need and integrate it with minimal friction. We believe this approach contributes the most to a wider, interoperable p2p ecosystem which outlives “framework lock-in”.

Many of our Rust crates operate over raw bytes and are fully compatible with your own data types and any CRDT. In case you don't plan on building your own peer-to-peer protocol, we have you covered with all features required to build a mobile or desktop application.

We're using existing libraries like iroh and well-established standards such as BLAKE3, Ed25519, STUN, CBOR, TLS, QUIC, Double Ratchet and more - as long as they give us the radical offline-first guarantee we need.

We want collaboration, encryption and access-control to work even when operating over unstable or ephemeral connections. Towards this end, we're actively working alongside researchers to design and implement resilient solutions.

p2panda is "broadcast-only" at it’s heart, making any data not only offline-first but also compatible with post-internet communication infrastructure, such as shortwave, packet radio, Bluetooth Low Energy, LoRa or simply a USB stick.

p2panda is a very multifaceted project: We maintain our crates, apply for grants, design protocols and do research in radically distributed data-types. We organise community events and write peer-to-peer applications with our friends and collaborators.

**Background**

p2panda emerged out of activities around the self-curated zine BLATT 3000 (2014) and subsequent festivals VERANTWORTUNG 3000 (2016) and HOFFNUNG 3000 (2017), the latter of these being the catalyst for building a custom platform designed to help communities organise in a decentralised manner, also called HOFFNUNG 3000.

While exploring building a p2p festival platform we met many people from the communities around Secure Scuttlebutt, DAT / Hypercore, Cabal, Chaos Computer Club, Fediverse, Antiuniversity Now, Pixelache trying to understand how this technology affects the way we organise ourselves.

This led to a group of people interested in realising a protocol for p2p communication, which ultimately should serve as a tool to build applications, like a festival tool and more. We've been meeting regularly on Mondays since 2019 to hack p2panda and have recently reached the point where we have a publicly running demo project. We have also been active in some other projects including the Liebe Chaos Verein, organising a p2p gathering and a reading group in Berlin. Obviously we're still going to organise another festival sometime.

**Funding**

This project has received funding from the European Union’s Horizon 2020 research and innovation programme within the framework of the NGI-POINTER Project funded under grant agreement No 871528, NGI-ASSURE No 957073 and NGI0-ENTRUST No 101069594.
