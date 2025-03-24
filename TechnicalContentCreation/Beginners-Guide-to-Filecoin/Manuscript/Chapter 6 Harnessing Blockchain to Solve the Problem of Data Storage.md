# Chapter 6: Harnessing Blockchain to Solve the Problem of Data Storage

\#1

Hello everyone, welcome to Beginners Guide to Filecoin Chapter 6 

In this video, I will help you to better understand 

What the DCS triangle is

How Filecoin runs decentralized storage

What are the challenges ensuring the security of data storage within the Filecoin Blockchain

And how Filecoin reaches for scalability

Here we go

\#2  **Storage** 

To help you get the whole picture, we need to acknowledge what storage is beforehand.

Storage is defined as **the retention of retrievable data.**

\#3 **Local Storage** 

Here are several basic types of file storage.

The first one is Local Storage, which is used to store persistent data in the browser cache without any expiration time.

The simple trivial case is Client writes to the local file system

The defects of Local Storage are obvious, such as:

- Single point of failure.
- Bottleneck when other clients request data.
- The client is responsible for security. 

\#4 **Centralized Storage**

Then the second one is centralized data storage. 

In centralized data storage, storage providers provide unified API for clients for CRUD(Create, Read, Update, Delete) operation.

clients store and maintain data in a single location as one central unit, 

which means there is always a central platform to take control of each individual's data.

\#5 **Decentralized storage**

And here comes the third one, decentralized storage.

In decentralized data storage, each storage provider separately provides API for each client.

Decentralized storage involves storing data across multiple computers or nodes connected to a P2P network like BitTorrent or an InterPlanetary File System, in short IPFS, protocol. 

Data uploaded onto a decentralized storage system is split into small pieces and sent to multiple nodes across the network for storage.

\#6 **Incentivized Decentralized Storage Systems** 

Incentivized Decentralized Storage Systems use **crypto-economic protocols to ensure desirable properties** of the storage system.

And it is backed by blockchains to support these protocols.

There are two different goals when designing such an incentive system:

- **Decentralized File Storage Service for End-Users** 
  - Provide contracts between client and storage provider 
  - And provide payment for certain storage time intervals and SLAs 

- **Permanent File Archive** 
  - Provides protocol to ensure that no file is ever forgotten 

\#7 **DCS** **triangles**

However, blockchains, the record-keeping technology behind Bitcoin and other cryptocurrencies and tokens, face their own challenges. That's DCS triangles.

The DCS triangle, as the picture shown on the right, describes the top tradeoffs that decentralized systems must consider, which are **Decentralization, Consensus,** and **Scalability.**

The DCS theorem states that a decentralized system cannot have all three properties simultaneously.

Protocol Labs is grappling with these challenges as we prepare to launch Filecoin, a blockchain-based system to democratize file storage.

Filecoin is a **cryptocurrency-powered storage network** that lets anyone contribute unused storage space to store the world’s information. Its mission is to create a decentralized, efficient, and robust foundation for humanity’s information.

\#8 **Decentralization of storage**

Let’s unpack what we mean by a robust foundation using the DCS triangle.

In 2015, Protocol Labs launched IPFS, a technology that decentralizes the web by addressing information based on what it is, not where it is. Addressing using a **cryptographic hash** of the content makes the data unalterable, can identify **duplicates** across the network, and enables any host to store and provide the data. This makes decentralization more efficient.

Filecoin shares many common components with **IPFS** including content addressing. Developers can integrate with these modular components to build in encryption and redundancy. 

Currently, Filecoin can support user-defined smart contracts enabling its storage to be **programmable** along with easier integrations with other networks and tools.

\#9 ***Consensus*** **Across Many Actors**

Every new technology faces barriers to entry, and each blockchain application has its own unique set of challenges. Some face **hardware** or **timing requirement** challenges; others are challenged by **energy consumption**. 

Filecoin incentivizes *consensus* about the state of what has been uniquely stored in the world, including a market for this, in a way that anyone can verify.

At its core are two Proofs-of-Storage that provide a more useful alternative to Bitcoin’s Proof-of-Work: **PoRep** and **PoSt,** which we've mentioned in the  Previous video  Beginners Guide to Filecoin Chapter 5.

With these proofs, the Filecoin protocol creates a trustless market for storage resources, amassing them into a self-healing, robust storage network on which anyone in the world can rely and join. 

\#10 ***Scalability*** **of the Protocol**

Since protocol security and solid proofs constructions have been paramount, Filecoin laid out higher **hardware** **requirements** for block mining and storage mining.

Any part of protocol where a new market may arise opens up opportunities for community participants to leverage what they can do best: block mining, storage mining, retrieval mining, repair mining, as well as potentially offloading computation and other services.

With a strong foundation for trustless coordination in its protocol, Filecoin participants can achieve consensus around the decentralization of storage and use these evolving specialized markets to achieve future scalability.

\#11

In general, 

Filecoin, developed by Protocol Labs, is a blockchain-based system to democratize file storage. 

Protocol Labs is grappling with technical barriers and maintaining consensus while building a scalable decentralized storage solution.