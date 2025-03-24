# Chapter 10: Filecoin Blockspace Market

\#1

Hello everyone, welcome to Beginners Guide to Filecoin Chapter 10 

In this video, I'll give you a sense of **Commodity Markets**

What **Blockspace** is

So to better **understand Gas in Filecoin**

Here we go

\#2 **Introduction**

Commodities are basic raw materials that serve as the basis for the production of everyday goods and services. The history of commodities is a reflection of civilization itself. Humans waged wars against each other to seek control over the most important resources; from rice, to metals, to spices, to oil. As more aspects of the global economy and daily activities migrate to the cryptoeconomy, what will become the most sought-after commodity of the new era?

\#3 **Commodity Markets: A Historical Overview**

As early as 4500 BC, denizens of ancient Sumer used clay tokens and tablets to denominate dates for future deliveries of goods and rules for settlement in what was essentially a futures contract. Nearly 3000 years later, one of Hammurabi’s codes outlined payment rules for farmers that had mortgaged their properties. Farmers had to pay off their debt using the grain they produced but reserved the right to not pay in the event of a crop failure. These basic rules helped producers manage their risk and in turn, allowed for more stable agricultural production.

These financial arrangements would continue to evolve and standardize. One of the first formal commodity exchanges was the Dojima Rice Exchange in 1697. Instead of actual rice, merchants would trade “rice tickets”- claims to rice in their warehouses. Using rice tickets as a basis, the merchants developed many derivative contracts that are now commonly traded today, such as short sales, forwards, and options. Over a century later, the Chicago Board of Trade would be set up and grow to become the global leader in the grain and agricultural futures and options markets, where the volume of these financial contracts is much larger than the volume of the physical commodities.

**These developments showcase that financial abstractions in commodity markets let commodity producers and consumers better manage their risks, and therefore allow them to effectively scale their operations.**

**As commodity markets matured and became more sophisticated, so did the types of financial instruments available to help manage related risks.** Today, they cover almost every commodity, from sugar to coffee to gold, and energy markets.

And because commodity production is affected by a wide range of physical attributes, **the stable consumption and production of commodities do not come naturally; commodity production is always accompanied by** **robust** **commodity markets. Without these markets, the flow of commodities is prone to** **volatility****.**

\#4 **The Metaversal Epoch**

As more aspects of daily activities transition to digital, the value of related resources, like data and compute, has skyrocketed. While the underlying technology of the digital era is still relatively nascent, thanks to Moore’s Law and the abstract nature of software development, its rate of acceleration is nothing short of astounding. For these reasons, phrases like *“data is the new oil”* have become relatively common.

As Dijkstra commented in 1972, *“I do not know of any other technology covering a ratio of 10¹⁰ or more: the computer, by virtue of its fantastic speed, seems to be the first to provide us with an environment where highly hierarchical artifacts are both possible and necessary.*” At this point, it ceases to be useful to think of the digital universe as a physical phenomenon. Software is instead what Abelson and Sussman call “procedural epistemology”. It has become an infinite medium for human expression.

This naturally makes people wonder — where does this path ultimately lead us to? Many works of science fiction have depicted various versions of the Metaverse, but all seem to settle on a baseline: a parallel digital reality to material reality, replete with its own worlds, economies, and digital assets. Matthew Ball describes it more specifically as “a **massively scaled** and **interoperable network of real-time rendered 3D virtual worlds** which can be **experienced synchronously** and **persistently** by an **effectively unlimited number of users** with an **individual sense of presence** and with **continuity of data**, such as identity, history, entitlements, objects, communications, and payments.” Ball further mentions that cryptonetworks will span and drive several categories critical to the realization of the Metaverse, mainly compute, interoperability tools and standards, and payments.

In reality, it’s tenable that given enough time and technological advancement, distributed networks backed by crypto-economic schemes will govern everything: how Metaverse data is stored, rendered, and accessed. It will also likely guide the development of Metaversal social structures; already we’ve seen how DeFi and crypto games have driven users to prefer user-owned protocols and sharing of concrete economic incentives for usage rather than rent extraction.

As the paradigm shifts toward users owning a stake in the platforms they use, it becomes less and less tenable that they’re willing to cede control of their digital selves to a few centralized authorities such as Facebook and Microsoft (and this is already happening). **The** **Metaverse** **is likely an inevitability rather than a possibility, and will accordingly rely on cryptonetworks to realize not only mass adoption but sustainable and user-aligned growth. Accordingly, blockspace will become the central commodity of the Metaverse.**

\#5. **Blockspace Commodities** 

We built massive markets at a global scale to ensure we have stable food and energy production to sustain the growth of our societies. So, what kind of market will emerge from blockspace, the foundational commodity of the Metaverse?

Fundamentally, blockspace is the representative unit of a shared layer of computation and state across multiple users; the blockchain exists as a record of changes and additions to this state and crypto networks serve as markets for the production and usage of blockspace.

Users issuing transactions with fees attached signal their demand to purchase blockspace to change the network’s global state and node operators (miners, validators, etc.) Participating in consensus provide security to the network by producing blockspace consisting of these state changes. While this sounds simple enough, the blockspace market dynamic is quite complex.

\#6 **What is Blockspace?**

Blockspace, also known as block size or block weight, refers to the limited amount of data that can be stored on the blockchain in each block. In networks such as Ethereum and Bitcoin, blocks are the units of data that record transactions and are added to the blockchain on a regular basis. Each block has a fixed size or capacity; this determines the maximum amount of data that can be stored in it and thus the number of transactions included in the block. This capacity is a key factor in the performance and scalability of a blockchain network, as it affects the number of transactions that can be processed in a given time period. With every block’s data being stored on each validator’s system, blockspace can directly impact the overall size of the blockchain.

\#7 **different  blockspace**

Every network has different economic considerations.

The dynamic interplay between the demand for blockspace and the quantity of blockspace available determines the price of transaction fees.

In Ethereum, blockspace is limited by the “gas limit,” which is the maximum amount of computational work, measured in “gas“,  that can be included in a block. Gas is the hypernym that abstracts the true ‘under the hood’ workings of Ethereum (and other blockchains) when performing computation. 

On the other hand, for Bitcoin, blockspace is limited by block size, which is the maximum number of bytes of data that can be stored in a block. Bitcoin’s blockspace capacity is 1 megabyte (MB), enabling each block to, on average, store 2,000 transactions worth of data. 

 Filecoin’s consensus mechanism is built on a variation of this called tipsets. Blocks in Filecoin are ordered by epoch. Each new block refers back to at least one block (parent) produced in the prior epoch. A tipset is made up of valid blocks that have the same parents and were mined in the same epoch.

\#8 **Understanding Gas in Filecoin**

Filecoin is a peer-to-peer network that stores files, with built-in economic incentives to ensure files are stored reliably over time. Filecoin is making the web more secure and efficient with a decentralized data storage marketplace, protocol, and cryptocurrency. It is a blockchain-based decentralized digital storage and data retrieval method, allowing users to rent unused hard drive space reliably and with confidence.

Gas refers to the fee or pricing value required to successfully conduct a transaction on the Filecoin blockchain. Often priced in the smallest and common fractions of the cryptocurrency fil (FIL) - attoFIL - the gas is used to allocate resources of the Filecoin network so that transactions can occur.

The supply and demand between the network's miners determine the exact price of the gas. Miners can decline to process a transaction if the gas price does not meet their threshold for users on the network who seek processing power.

The concept of gas was introduced to maintain a distinct value layer that solely indicates the consumption toward computational expenses on the Filecoin network. A separate unit for this purpose enables a practical distinction between the actual valuation of the cryptocurrency (FIL) and the computational cost of using the filecoin network.

Filecoin miners, who perform all the important tasks of verifying and processing transactions on the network, are awarded a particular fee in return for computational services. **If the gas price limit is too low, miners can choose to ignore such transactions**. As such, the price of gas fluctuates (priced in FIL) with supply and demand for processing power.

\#9

In conclusion, 

The impact of blockspace on transaction costs is a significant factor in the dynamics of blockchain technology. When the demand for blockspace exceeds the available supply, transaction fees can rise significantly. This is because the market for blockspace is driven by supply and demand, with users willing to pay higher fees to have their transactions included in the next block.

Alright, please thumbs up if you find this video helpful.

More videos that you might be interested in are coming soon 

So please subscribe to KEN Labs Chanel. in case you miss out~

See you in the next video, Bye!