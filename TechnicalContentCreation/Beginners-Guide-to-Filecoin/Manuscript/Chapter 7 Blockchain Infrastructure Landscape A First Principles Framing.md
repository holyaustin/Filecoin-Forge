# Chapter 7: Blockchain Infrastructure Landscape: A First Principles Framing

\#1

Hello everyone, welcome to Beginners Guide to Filecoin Chapter 7 

In this video, I'll introduce the first-principles framing to you,

So to help you have a whole picture of the landscape of blockchain. 

Here we go

\#2 **Background**

Let's begin with some background information:

The elements of computing are storage, computing, and communications. Mainframes, PCs, mobile, and cloud all manifest these elements in their own unique ways. Specialized building blocks emerge to reconcile tradeoffs within a given element.

This video elaborates on the blockchain landscape via first-principles framing: the blocks for each element of computing, and some examples of systems manifesting each block. For each block, I will focus on being illustrative thoroughly.

\#3 **Blockchain** **Building Blocks**

Blockchain technology is manifesting in each block.

As this image shows, here is each element of computing, with related decentralized building blocks:

First, Storage: token storage, database, file system/blobs

Next, Processing: stateful business logic, stateless business logic, high-performance computing

Then, Communications: connect networks of data, of value, and of state

\#4 **Blockchain** **Infrastructure Landscape**

Blockchain technology is manifesting in each block, as this image shows:

And we will introduce each block to you.

\#5 **Storage**

The fundamental computing element of **storage** has the following building blocks.

**Token storage.** 

Tokens are stores of value (e.g. assets, securities) whether it’s Bitcoins, air miles, or digital art copyright. 

The main actions on a token storage system are to issue and transfer tokens (with many variants), while preventing double-spends and the like.

**Bitcoin** and **Zcash** are two prominent “pure play” systems focusing solely on tokens. Ethereum happens to use tokens in service towards its mission of being a world computer. 

Other tokens aren’t internal to a network to power the network itself but are used for incentives in a **higher-level** network where the lower-level infrastructure actually stores the tokens. 

**Database.** 

Databases specialize in storing structured metadata, for example as tables (relational DB), document stores (e.g. JSON), key-value stores, time series, or graphs; and then rapidly retrieving that data via queries (e.g. SQL).

**File system/data blob storage.** 

These are systems to store large files (movies, mp3s, large datasets), organized in a hierarchy of directories and files.

**Data marketplace.** 

These systems connect the data owners (e.g. enterprises) with data consumers (e.g. AI startups).

\#6 **Processing**

Let’s discuss the fundamental computing element of **processing**.

“**Smart contracts**” systems are the popular label for systems that do processing in a decentralized fashion. This actually has two subsets with very different properties: ***stateless (combinational) business logic*** and ***stateful (sequential) business logic***. Stateless vs stateful gives radical differences in complexity, verifiability, etc. There’s a third decentralized processing building block: ***high-performance compute (HPC)*****.**

"**Smart contracts**" systems encompass two subsets, **stateless** and **stateful.**

**Stateless (combinational) business logic.** 

This is any arbitrary logic that does not retain state internally. 

Because they don’t have a state, it’s easy to verify large stateless smart contracts, and therefore to build large verified / secure systems.

**Stateful (sequential) business logic.** 

This is any arbitrary logic that *does* retain state internally. That is, it has memory. 

More generally, stateful business logic is a Turing machine that takes in a sequence of inputs, and returns a sequence of outputs. Systems that manifest (a practical approximation of) this are called Turing-complete systems. Ethereum is the best-known blockchain system that manifests stateful business logic / smart contracts running directly on-chain. 

**High-Performance Compute (****HPC****).** 

This is processing to do “heavy lifting” compute for things like rendering, machine learning, circuit simulation, weather forecasting, protein folding, and more. A compute job here might take hours or even weeks on a cluster of machines (CPUs, GPUs, even [TPUs](https://en.wikipedia.org/wiki/Tensor_processing_unit)).

Bacalhau is a platform for fast, cost-efficient, and secure decentralized HPC that enables users to run compute jobs *where* the data is generated and stored.

\#6 **Communications**

Here, we will cover the third and final fundamental computing element, of **communications.** 

There are many ways to frame communications. 

In this video, I will focus on *connecting networks*. 

It comes in three levels: **data**, **value**, and **state**.

**Data.** 

In the 60s we got the [ARPAnet](https://en.wikipedia.org/wiki/ARPANET). Its success spawned several similar networks like [NPL](https://en.wikipedia.org/wiki/NPL_network) and [CYCLADES](https://en.wikipedia.org/wiki/CYCLADES). A new problem arose: they didn’t talk to each other. Cerf and Kahn invented [TCP/IP](https://de.wikipedia.org/wiki/Transmission_Control_Protocol/Internet_Protocol) in the 70s to connect them, to create a network of networks, which we now call the internet. TCP/IP is now the de-facto standard to connect networks. [OSI](https://en.wikipedia.org/wiki/OSI_model) was a competing set of protocols, but it’s long faded; though, ironically, its model has proved useful. So, despite its age, TCP/IP is nonetheless a decentralized building block, for connecting networks of data.                    

**Value.** 

TCP/IP only connects networks on a *data* level. You can double-spend packets — send the same packet to more than one destination at once — and it doesn’t care.

But what about connecting networks where you can send value across the networks? One way to connect networks while preventing double-spends is to use an exchange. But that’s traditionally pretty heavy. 

**State.** 

Can we go beyond connecting networks of value? Imagine a computer virus with its own Bitcoin wallet that can hop from one network to another. Or a smart contract on Ethereum mainnet that can move its state to another Ethereum net, or another compatible net? This is where Polkadot comes in, to connect networks *of state*.

\#7 **Centralized to decentralized**

The image also emphasized that you there’s a spectrum from fully centralized (left) to fully decentralized (right). This is helpful for updating existing software systems to be more decentralized over time, focusing on updating blocks where decentralization **helps the most**.

\#8

In conclusion, There’s no one magic system called “blockchain” that magically does everything. 

Rather, there are really good building blocks of computing that can be used together to create **effective decentralized applications**. 

We expect that this decentralization trend will accelerate as folks get a better understanding of how the building blocks relate. It’s also more productive than framing everything into one monolith called “blockchain”.

Alright, please thumbs up if you find this video helpful.

More videos that you might be interested in will be updated on KEN Labs Chanel.

So please subscribe in case you miss out~

See you in the next video, Bye!