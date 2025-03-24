# Chapter 5: A research perspective on Filecoin

\#1

Hello everyone, welcome to Beginners Guide to Filecoin Chapter 5

In this video, I will help you to better understand 

The technological and conceptual advances leading to the creation of Filecoin

And Filecoin’s development, from inception to implementation

Here we go

\#2

The Filecoin network is launching in the middle of a revolution in Internet architecture, 

where vulnerable centralized services dependent on trusted parties are being replaced with resilient decentralized solutions based on verifiable computation, and internet services are being relocated from inefficient central monoliths to the far reaches of the network by **peer-to-peer** **markets**.

Filecoin represents an evolution in protocols and services adapted to the needs of the revolution in internet architecture: **an open-source decentralized storage network** with **built-in economic incentives** to ensure that files are stored **reliably** over time. 

Filecoin and other blockchain networks like Bitcoin and Ethereum are pioneering examples of Open Services. They are **decentralized** platforms where **commercial service** providers —from corporations to individuals—, can compete in an **open market.**

Filecoin is a living project, and here we trace the evolutionary trajectory of revolutionary technology. 

We will describe the technological and conceptual advances leading to the creation of the first modern networks based on distributed ledger technology. Then we will also focus on Filecoin’s development, from inception to implementation.

\#3 **Standing on the shoulders of giants**

It would be impossible to capture all of the advances in **cryptography, distributed systems,** **and  crypto-economics** that have contributed to the development of Filecoin.

For distributed systems, we've discussed Byzantine fault-tolerant and other information related in the previous videos.

And for cryptography, there are certain peaks in the technological landscape that stand out in the upgrade of RSA cryptosystem, collision-resistance.

And for cryptocurrency, we might trace the roots of the modern  era to 1998 when the publication of hashcash and b-money marks the development of crypto-economics 

\#4 **The post-Bitcoin landscape**

The arrival of Bitcoin initiated a rapid florescence in the development of distributed ledger technology, inaugurating the modern blockchain era. This period saw a number of innovations in both underlying **technologies** and **overlaid applications**.

Bitcoin’s practical breakthrough was its **proof-of-work consensus algorithm**, which created a reliable system for managing and tracking token ownership in a distributed system. It was established that satisfactory solutions to the Byzantine Generals' problem were realistically possible.

\#5 **The post-Bitcoin landscape**

Then, Blockchain developers immediately began to implement further innovations on the problem of **consensus** and performed slightly useful work based on a **proof-of-work protocol** such as: 

**Peercoin****,** **Primecoin****,** and **Permacoin****.**

Ethereum ([whitepaper](https://ethereum.org/en/whitepaper/), **2013**) launched based on a proof-of-work consensus protocol ([Ethash](https://eth.wiki/en/concepts/ethash/ethash)); the network intends to shift to a proof-of-stake protocol in [Eth 2.0](https://ethereum.org/en/eth2/). Ethereum explicitly foregrounded the potential for blockchain networks to serve as a platform for decentralized applications, helping to create the market for decentralized file storage, among other novel blockchain applications. Ethreum’s blockchain-as-a-platform model has created a [vibrant ecosystem ](https://www.stateofthedapps.com/rankings/platform/ethereum)of third-party [dApps](https://en.wikipedia.org/wiki/Decentralized_application) (decentralized applications) and inspired some creative thinking about the types of applications the decentralized web (including Filecoin) can support.

\#6 **The 2014 Filecoin whitepaper**

The first version of Filecoin, a cryptocurrency and file storage network enabling the outsourcing of data storage to a distributed network of service providers, was published in **2014**.

In the 2014 proposal, Filecoin’s useful storage service is layered atop **Bitcoin-style proof-of-work consensus**: in addition to solving a cryptographic puzzle, Filecoin miners would complete a *proof-of-retrievability* establishing that they were storing a particular file. 

\#7 **The 2017 Filecoin whitepaper**

In **2017**, Protocol Labs announced Filecoin, the decentralized storage network, and market first envisioned in the 2014 whitepaper. 

The 2017 Filecoin construction built on the foundations laid by its **2014 predecessor** to introduce several **significant conceptual** and **technological advances**:

1. **IPFS**: 

In 2015, the launch of [IPFS](https://ipfs.io/) — a peer-to-peer hypermedia protocol for storing and sharing data in a distributed file system**.** 

1. **The Filecoin Proof System:**

The 2017 Filecoin construction described two new proofs-of-storage: *proof-of-replication* (PoRep) and *proof-of-spacetime* (PoSt)*.* 

- Filecoin’s **PoRep** (proof-of-replication) allows storage providers (miners on the Filecoin network) to verifiably demonstrate that they are storing data replicas in physically independent locations. 
- Filecoin’s **PoSt** (proof-of-spacetime) algorithm is used to prove that a particular data replica is being stored throughout the agreed-upon period of time. 

Filecoin uses **zk-SNARK** **technology** to publish PoRep and PoSt on-chain in a compact format.

1. **Refactoring Consensus:**

The 2017 Filecoin proposal introduced **a** **consensus protocol based on useful work**, where the probability that a miner is elected to create a new block is proportional to their active storage relative to the rest of the network.

This new consensus protocol uses a **secret leader election** to select the miners who will extend the chain by mining new blocks. Leader election in Filecoin builds on extant protocols *PoA**,* *Snow White**, and* *Algorand* to choose miners based on the power committed to a **candidate's history**. Filecoin’s leader elections and its **block reward system** based on useful work create a system of incentives aligning miners and clients, with the goal of the network: providing useful storage.

\#7 **D-rand** 

Filecoin requires **high-entropy, unbiased, publicly verifiable, and unpredictable randomness** to conduct the leader elections, which determine which miner will generate the next block on the blockchain and earn that block’s rewards, and for the generation of **PoRep** and **PoSt**. 

**Drand** provides this “**good randomness**”, allowing Filecoin to guarantee ***liveness*** — client consensus on the history of the Filecoin blockchain — and *v****erifiable*** *storage*.

\#8 **Building the future**

The Filecoin network exploded onto the blockchain scene in October 2020, introducing an exciting new configuration of technology and incentives to the nascent Web 3.0 space. 

Predicting — and shaping — the trajectory of new technology is a complex process.

Protocol Labs researchers have some ideas about research areas that might be interesting to watch in the future:

*zk-SNARKs, VRFs, VDFs, Depth* *Robust* *Graphs,* *Vector* *Commitments, and BLS signatures*

aiming to enhance scalability, integrity verification, and cryptographic primitives. 

\#9 **Conclusion**

The Filecoin **research community** drives breakthroughs that will **accelerate the evolution** of the Filecoin network. But the real technological accelerant will be Filecoin’s ongoing widespread adoption by the broader **Web 3.0** community, bringing research into contact with reality to create **new technologies** and **applications**.

Alright, please subscribe to Chanel of KEN Labs!

More videos that you might be interested in are coming soon.

See you in the next video, Bye!