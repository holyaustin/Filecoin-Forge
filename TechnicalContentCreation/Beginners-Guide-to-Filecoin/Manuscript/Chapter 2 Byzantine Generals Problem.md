# Chapter 2: Byzantine Generals Problem

\#1

Hello everyone, welcome to Beginners Guide to Filecoin Chapter 2. 

In this video, I will help you to better understand 

what Byzantine Generals' Problem is

what a Byzantine fault in blockchain

And how to solve the Byzantine general problem.

Here we go

\#2

As we all know, a reliable computer system must be able to function even if one or more of its components fails. A failing component may display a frequently overlooked behavior, 

such as delivering contradicting data/ to different sections of the system. 

The Byzantine generals' problem is an abstract expression of the problem of/ dealing with this type of failure.

The Byzantine generals problem is a game theory problem that describes: 

How difficult it is for dispersed parties to reach a consensus without the help of a trusted central party. 

And how can members of a network agree on a specific reality/ when no one can verify the identities of other members.

\#3

If we look back at the history of Byzantine Generals' Problems, we will find:

A research article "The Byzantine Generals Problem,"  by Leslie Lamport, Robert Shostak, and Marshall Pease, was published in 1982. Although the Byzantine generals' problem had been studied in computer science before 1982, this was one of the first attempts to translate it into parallel and proposed solutions. 

To address the problem of the Byzantine generals, loyal generals need a safe means to agree on a plan (known as **consensus**) and carry it out (known as coordination). 

While solving the Byzantine generals' problem is a difficult task, we now better understand the fundamental problem. 

It's critical to note that, as the example suggests, the concept can be applied to military communications. 

\#4

For your better understanding, we can use an analogy to illustrate the Byzantine generals' problem. 

Imagine, several divisions of the Byzantine army are stationed just outside of an enemy’s city, prepared for war. The only way for various generals to connect is through a messenger. They must agree on a course of action. 

However, we must presume that certain generals, intent on keeping loyal generals from deciding on a single course of action, are traitors. To ensure that a tiny group of traitors cannot interrupt communications, an algorithm is required. 

This issue affects all types of computer systems, not only those used in military applications. 

The Byzantine generals' problem must be solved if a dispersed group of nodes,such as computers or other physical devices, need to achieve reliable communications.

\#5

In every distributed computer system, Byzantine failures are virtually unavoidable.

There are several reasons why a distributed computer system could fail. 

This could be a software defect, a hardware malfunction, or a malicious attack when applied to real-world computer systems. In every distributed computer system, Byzantine failures are virtually unavoidable.

Let's imagine there's a power outage and all of the nodes go offline simultaneously. Now, the question arises, if the network is still operational and capable of sustaining reliable communication. Or does the system as a whole stop working or become open to attacks all of a sudden?

Byzantine fault tolerance is the ability to defend against these conditions. 

Networks that can endure more Byzantine failures are said to have a higher tolerance, implying that they are more secure than those that can't.

The actual incidence and taxonomy of Byzantine faults in various systems is a vast and challenging subject. 

It can, however, be specified in such a way that a formal definition of Byzantine fault tolerance emerges.

\#6

Only **decentralized systems** are susceptible to the Byzantine generals' problem, as they lack a dependable source of information and have no way of confirming the information they get from other network users. 

In **centralized systems**, an authority is trusted to disseminate accurate information while preventing the spread of erroneous or fraudulent information across the network.

For example, in the traditional financial system, banks are trusted to provide clients with accurate balances and transaction histories. If a bank tries to deceive or mislead its consumers, the central bank or government is authorized to restore faith.

\#7

The Byzantine general problem can be solved with the help of a blockchain. 

A blockchain creates a layer that can be trusted without needing to trust every individual. This is accomplished by a network of nodes coming together to agree on the truth before it is recorded. If the general is unsure about the substance of communication, the other generals can verify it using what they know to be true.

Once one node has recorded it, a copy is sent to all other nodes in the network, making the information redundant. The PoW consensus algorithm is designed to achieve this goal. Bad actors will still try to game the system because the information isn't always accurate. 

Since the system was designed to be utilized by the general public, fault-tolerant mechanisms and security are in place in a blockchain. In this scenario, cryptography was required to ensure that the messages could not be altered. 

The system provides key pairs for digitally signing a communication to verify identity as proof that it comes from the persons purported to have sent it. Once messages have been authenticated, they are recorded for transparency and historical proof of accountability.

\#8

With regard to money, Bitcoin was the first realized solution to the Byzantine generals problem. 

Bitcoin needs the means to handle ownership and avoid double-spending as a monetary system. 

Bitcoin employs a blockchain, or a public, distributed ledger, that stores a history of all transactions to accomplish this/ in a trustless manner. The blockchain, in the Byzantine generals analogy, is the truth that all parties must agree on.

If all the nodes in the Bitcoin network could agree on which transactions happened when and in what order, they could verify Bitcoin ownership and create a working, trustless monetary system without the need for centralized authority.

\#9

Satoshi devised a means to use cryptographic security and public-key encryption/ to answer the Byzantine general problem in a digital electronic network. 

To prevent data tampering, cryptographic security uses hashing, a process of encoding. 

And the identity of a network user is verified via public key encryption.

In blockchains, Miners validate blocks and compete with other miners to solve cryptographic puzzles

to produce blocks as part of a PoW consensus method. This work comes at a high cost to the creator, incentivizing them to share accurate information.

By employing a proof-of-work consensus mechanism, Bitcoin overcame the Byzantine general problem and established a clear, objective rulebook for blockchain. 

There can be no disagreement or tampering with the information on the Bitcoin network because the rules are objective. The system for selecting who can mint new Bitcoin and the laws regulating which transactions are valid or invalid are both objectives.  

Therefore, the Byzantine generals problem is solved by miners who are similar to generals in Satoshi's version of the blockchain.

\#10

For blockchains, solving the Byzantine Generals Problem means reaching network consensus in spite of many bad actors trying to steal from you, as well as the potential for various parts of the network to be down or malfunction. 

 Managing this task even for a short period of time is challenging, but achieving such a feat perpetually/ is a much more difficult undertaking.

Alright, please thumbs up if you find this video helpful.

More videos that you might be interested in are coming soon, so please subscribe to KEN L

abs Chanel in case you miss out! 

Bye!