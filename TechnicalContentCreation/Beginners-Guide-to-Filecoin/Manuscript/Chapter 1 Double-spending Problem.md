# Chapter 1: Double-spending Problem

#1

Hello everyone, welcome to  Beginners Guide to Filecoin Chapter 1.

In this video, I will help you to better understand 

what Double-spending problem is

why does it matter to digital currency 

And how blockchain technology tackles this problem

Here we go



#2

While we are purchasing, there are only two ways to process any transaction –

- One is a transaction that uses virtual/digital currency is referred to as **online** transactions.
- The other one is a transaction that uses actual cash or money which is referred to as **offline** transactions.

Spending money more than once results in double-spending. 

The double spending issue is never possible with physical currency. 

However, double-spending can occur with digital currency like Bitcoin.



#3

To help you better understand the double-spending problem, let’s take a small example：

One day, you visit a restaurant and order a pot of coffee worth $5 and you pay with cash. When you pay for your coffee in a restaurant, the cashier immediately acknowledges your payment and gives you your coffee. 

But what if you can spend “that same $5” again to make another purchase? 

The double-spending problem refers to a single individual who can utilize the same funds several times.

Now you may ask, Is it possible to copy paper money? Yes. In order to duplicate a dollar bill, one would need special equipment and the right kind of paper to do so.

But there is no possibility of double-spending when using physical paper money, because if an individual has a 100-dollar bill and hands it over to someone, the individual is left with nothing to double-spend.



#4

However, this is not the case with digital money,

double spending is a problem, and here is why:

- Digital money is far different from physical money.

Digital money is a set of codes that can be copied and sent to several recipients.

- When you use digital money to make a transaction, the transaction is broadcast to all of the nodes within the network.
- Nodes must wait for the transaction to be received and confirmed, **which takes time**.

**Those three features above consequent following problems:**

Since it would be possible to fake the transaction.

So what prevents someone from duplicating a transaction and retransmitting it before the confirmation of the transaction from the network?

Since the network would not be able to tell which transaction was authentic.    

So how to figure out which record is correct?

If an individual or organization can easily duplicate his or her digital assets, the assets will eventually lose their value. For this reason, third parties, such as banks and PayPal, keep ledgers that guarantee that no double spending occurs. On the other hand, central banks can print money out of thin air through their fractional reserves to solve the problem, but this eventually, leads to the oversupply of currency and, ultimately, inflation.



#5

So, Bitcoin chooses to tackle the double-spending problem by using blockchain technology

Resulting in no central bank resolving conflicts.

Digital currency circulated on the internet before Bitcoin was created. Banks and other financial organizations were in charge of overseeing and regulating it all.

Banks serving as mediators in banking conflicts have the drawback that transactions can be undone if a conflict arises.

This results in increased costs and extended transaction delays. 

By developing a system that is fully reliant on cryptographic evidence rather than trust, Bitcoin attempts to address these constraints. 

In essence, it provides a mechanism to do financial business devoid of banks.



#7

One of the crucial features of Bitcoin is 

EVERY BITCOIN DISPLAYS THE OWNERSHIP HISTORY

It’s crucial to comprehend what a bitcoin is in order to begin comprehending how this method of cryptographic evidence functions.

- A sequence of digital signatures is how Bitcoin is described in Bitcoin white paper.
- It may be transferred between owners via digital wallets. Both a private key, which is a password that only the owner knows, and a public key, which is an address stored in each wallet.
- When a Bitcoin owner transfers a coin to another, they sign the public key of the new owner and a hash of the prior transaction.
- Bitcoin is then completed by appending this hash. As a result, each bitcoin is similar to a car’s logbook in that it contains a list of all prior owners.



#8

- Bitcoin uses a global ledger known as a blockchain to address the double-spending issue.
- The blockchain offers a mechanism for all nodes to be knowledgeable of every transaction, demonstrating that no efforts to double spend have been made.
- All Bitcoin transactions are formally broadcast to every node. The sequence in which they were acquired can then be agreed upon as a unified history.
- Double-spending efforts made after that point are ineffective in Bitcoin since most nodes will concur on which transaction was the first to be received.



#9

The timestamp server in Bitcoin is crucial to creating an immutable ledger

Well, A timestamp server was suggested as a solution to the double spending issue in Satoshi Nakamoto’s white paper. 

A block of transactions is hashed by this server, which then broadcasts the hash to every node in the Bitcoin network. This timestamp demonstrates that none of the information in the hash could have been produced following the publication of the hash. This creates an immutable (unchangeable) log of the sequence in which transactions occur since each timestamp contains the preceding timestamp in its hash. Each timestamp builds on the ones that came before it.



#10

That results in EVERY BITCOIN TRANSACTION EVER PERFORMED IS RECORDED

Since the first Bitcoin client was delivered in 2009, the blockchain of Bitcoin has preserved an exhaustive record of all transactions ever done in order to properly comprehend how the blockchain avoids double-spending. 

You cannot just alter the record yourself, since every transaction is cryptographically hashed to the preceding blocks. And this database is referred to as a blockchain because a fresh batch of transactions, known as a block, is added to it every ten minutes.



#11

However, there is still one possible way to alter the record, which is known as:

51% ATTACK

When a group of miners controls over 50% of the network’s hash rate, they launch a 51% attack against a cryptocurrency blockchain.

Having control of 51% of the network’s nodes provides the governing parties with the ability to change the blockchain.

Payments between a few or all users might be stopped if the attackers were able to stop fresh transactions from receiving confirmations. The ability to undo decisions taken when they were in charge would likewise be available to them. 

One of the problems that consensus systems like proof-of-work were designed to avoid is that by reversing transactions, users might double-spend coins.

However, On a coin with a high participation rate, a 51% assault is an extremely demanding and difficult undertaking. The majority of the time, the group of attackers would have to be able to command the required 51% and have a backup blockchain ready to be injected when the opportunity arises. The main network would then have to be out-hashed. 

One of the biggest obstacles against a 51% attack is the expense of doing so.



#12

In conclusion, the blockchain stops double spending by broadcasting groups of transactions to all nodes in the network and timestamping them. Transactions are irreversible and hard to tamper with since they are timestamped on the blockchain and quantitatively tied to earlier ones.

Alright, please thumbs up if you find this video helpful.

More videos will be updated in this Beginners Guide to Filecoin of KEN Labs.

Please subscribe in case you missed out! 

Bye!