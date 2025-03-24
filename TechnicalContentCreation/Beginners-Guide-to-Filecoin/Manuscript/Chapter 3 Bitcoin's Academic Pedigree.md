# Chapter 3: Bitcoin's Academic Pedigree

\#1

Hello everyone, welcome to Beginners Guide to Filecoin Chapter 3. 

In this video, I will help you to better understand 

Where is the concept of cryptocurrencies built from 

What are the essential parts of Ledger within Bitcoin

And how to ensure the currency has value

Here we go

\#2

Since this video is based on the literature 'Bitcoin's Academic Pedigree' by Arvind Narayanan, 

so let me briefly introduce him to you.

**Arvind Narayanan** is an assistant professor of computer science at Princeton. He leads the Princeton Web Transparency and Accountability Project to uncover how companies collect and use our personal information. Narayanan also leads a research team/ investigating the security, anonymity, and stability of **cryptocurrencies**, as well as novel applications of blockchains. He co-created a massive open online course and a textbook on **Bitcoin and cryptocurrency technologies.** 

\#3

Now, you might be more familiar with Arvind Narayanan, 

So that you can better understand the further information illustrated from 'Bitcoin's Academic Pedigree' 

That explains why we say the concept of cryptocurrencies is built from forgotten ideas in this research literature.

If you've read about Bitcoin in the press and have some familiarity with academic research in the field of cryptography, you might reasonably come away with the following impression: 

Several decades' worth of research on digital cash, beginning with David Chaum, did not lead to commercial success because it required a centralized, banklike server controlling the system, and no banks wanted to sign on. 

Along came Bitcoin, a radically different proposal for decentralized cryptocurrency that didn't need banks, and digital cash finally succeeded. Its inventor, the mysterious Satoshi Nakamoto, was an academic outsider, and Bitcoin bears no resemblance to earlier academic proposals.

This article, 'Bitcoin's Academic Pedigree' challenges that view by showing that nearly all of the technical components of Bitcoin originated in academic literature of the 1980s and 1990s, as you can see in the figure on the right. 

This is not to diminish Nakamoto's achievement, but to point out that he stood on the shoulders of giants. 

Indeed, by tracing the origins of the ideas in Bitcoin, we can zero in on Nakamoto's true leap of insight— 

the specific and complex way in which the underlying components are put together. 

And this helps explain why Bitcoin took so long to be invented. 

By the way, Bitcoin's intellectual history also serves as a case study demonstrating the relationships among 

**academia, outside researchers,** and **practitioners,**  and offers lessons on how these groups can benefit from one another.

\#4

The idea of a ledger is the starting point for understanding Bitcoin. 

 

Ledger is a place to record all transactions that happen in the system, and it is open to and trusted by all system participants. Bitcoin converts this system for recording payments into a currency. 

How can you build a ledger for use in an environment like the Internet where participants may not trust each other? Let's start with the easy part: **the choice of data structure.** 

There are a few desirable properties:

The ledger should be **immutable** or, **more precisely**, **append-only**: you should be able to add new transactions but not remove, modify, or reorder existing ones. 

There should also be a way to obtain a succinct cryptographic digest of the state of the ledger at any time. A digest is a short string that makes it possible to avoid storing the entire ledger, knowing that if the ledger were tampered with in any way, the resulting digest would change, and thus the tampering would be detected. 

The reason for these properties is that, unlike a regular    data structure that's stored on a single machine, the ledger is a global data structure collectively maintained by a mutually untrusting set of participants. 

This contrasts with another approach to decentralizing digital ledgers, in which many participants maintain local ledgers and it is up to the user querying this set of ledgers to resolve any conflicts.

\#5

Here are several essential parts included within the ledger.

**Linked timestamping, Merkle trees,** and **Byzantine** **fault tolerance** **& Proof of Work**

At any rate, bitcoin borrows only the data structure from Haber and Stornetta's work and reengineers its security properties with the addition of the proof-of-work scheme described later in the video. In a simplified version of Haber and Stornetta's proposal, documents are constantly being created and broadcast. 

The creator of each document asserts a time of creation and signs the document, **its timestamp**, and the previously broadcast document. This previous document has signed its own predecessor, so the documents form a long chain with pointers backward in time. 

An outside user cannot alter a timestamped message since it is signed by the creator, and the creator cannot alter the message without also altering the entire chain of messages that follows. Thus, if you are given a single item in the chain by a trusted source, like another user or a specialized timestamping service, the entire chain up to that point is locked in, immutable, and temporally ordered. 

Further, if you assume that the system rejects documents with incorrect creation times, you can be reasonably assured that documents are at least as old as they claim to be. 

\#6

Bitcoin essentially uses the data structure in Haber and Stornetta's 1991 and 1997 papers, shown in simplified form in Figure 2. 

Of course, in Bitcoin, transactions take the place of documents. 

In each block's **Merkle tree**, the leaf nodes are transactions, and each internal node essentially consists of two pointers. This data structure has two important properties. 

First, the hash of the latest block acts as a digest. A change to any of the transactions (leaf nodes) will necessitate changes propagating all the way to the root of the block, and the roots of all following blocks. 

Thus, if you know the latest hash, you can download the rest of the ledger from an untrusted source and verify that it hasn't changed. A similar argument establishes another important property of the data structure. That is, someone can efficiently prove to you that a particular transaction is included in the ledger. 

This user would have to send you only a small number of nodes in that transaction's block, as well as a small amount of information for every following block. 

The ability to efficiently prove the inclusion of transactions is highly desirable for performance and scalability.

\#7

Linked timestamping alone is not enough to resolve forks, as was shown by Mike Just in 1998.  

The requirements for an Internet currency without a central authority are more stringent. 

A distributed ledger will inevitably have forks, which means that some nodes will think blocking A is the latest block, while other nodes will think it is block B. This could be because of an adversary trying to disrupt the ledger's operation or simply because of network latency, resulting in blocks occasionally being generated near-simultaneously by different nodes unaware of each other's blocks.

In his original white paper, Nakamoto uses some concepts, referring to his protocol as a consensus mechanism and considering faults both in the form of attackers, as well as nodes joining and leaving the network. This is in contrast to his explicit reliance on literature in linked timestamping (and proof of work, which we will discuss next). 

When asked in a mailing-list discussion about Bitcoin's relation to the **Byzantine Generals' Problem** (a thought experiment requiring BFT to solve), Nakamoto asserts that the **proof-of-work** chain solves this problem.

Virtually all fault-tolerant systems assume that a strict majority or supermajority, like more than half or two-thirds of nodes in the system are both honest and reliable. In an open peer-to-peer network, there is no registration of nodes, and they freely join and leave. Thus an adversary can create enough Sybils, or sockpuppet nodes, to overcome the consensus guarantees of the system. The Sybil attack was formalized in 2002 by John Douceur, who turned to a cryptographic construction called **proof of work** to mitigate it.

If you want more detailed information about Byzantine fault tolerance & Proof of Work, go check our Beginners Guide to Filecoin Chapter 2, you won’t be disappointed.

\#8

Nakamoto's genius, then, wasn't any of the individual components of Bitcoin, but rather the intricate way in which they fit together to breathe life into the system. 

The **timestamping** and **Byzantine agreement** researchers didn't hit upon the idea of incentivizing nodes, nor, until 2005, of using proof of work to do away with identities. 

Conversely, the authors of hash cash, b-money, and bit gold didn't incorporate the idea of a consensus algorithm to prevent double-spending. 

In Bitcoin, a **secure ledger** is necessary to prevent double-spending and thus ensure that the currency has value. 

And a **valuable currency** is necessary to reward miners. 

In turn, the strength of **mining power** is necessary to secure the ledger. 

Without it, an adversary could amass more than 50 percent of global mining power, and thereby be able to generate blocks faster than the rest of the network, double-spend transactions, and effectively rewrite history, overrunning the system. 

Thus, bitcoin is **bootstrapped**, with a circular dependence among these three components: 

**secure ledger****,** **valuable currency****, and** **mining power**

\#9

In general, the history described here offers rich and complementary lessons for **practitioners** and **academics**. Practitioners should be skeptical of claims of revolutionary technology. 

As shown here, most of the ideas in Bitcoin that have generated excitement in the enterprise, such as distributed ledgers and Byzantine agreements, actually date back 20 years or more. Recognize that your problem may not require any breakthroughs—there may be long-forgotten solutions in research papers.

Alright, please subscribe to Chanel of KEN Labs!

More videos that you might be interested in are coming soon.

See you in the next video, Bye!