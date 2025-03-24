
# SafeTeam

![Logo](https://i.imgur.com/TSh8KKs.png)
> SafeTeam is a secure and user-friendly platform for managing cryptocurrency wallets.
> It eliminates the need for trust by using a multi-sig wallet and account abstraction.
> SafeTeam leverages the power of the Safe Core SDK to provide a solution for the problem of lost private keys and unsecure EOA wallets.
> By using SafeTeam, you can secure your cryptocurrency funds and have peace of mind knowing that your private keys are safe and accessible.

[Dora Hacks BUIDL Submission](https://dorahacks.io/buidl/4765)

## Inspiration

> The idea of SuperFluid & real-time finance seemed fascinating to us, imagine being able to get paid continuously as you work on a project as a part of a grant, accelerator or hackathon, how cool is that!SafeTeam 2.0 is a customisable treasury management tool made possible with the help of Safe Wallet & Superfluid!

> We used all the features of Superfluid - upgrade to and downgrade from Super Tokens, do Money Streaming(CFA) & Distributions(IDA) and making Batch Calls.

> SafeTeam is a product that we wish existed in the market as both hackathon-winners and grant-receivers ourselves. Inspiration for this project came from our personal struggles, where we faced the issues of money won/earned during hackathons, grant programs, venture funding of any kind, was in the control of one of the members of the team and was given as a lump sum.
 
## Features

- Multi-signature wallet functionality for enhanced security.
- User-friendly interface for easy use.
- **Stream money evenly between all memebers using SuperFluid.**
- Gas-Less Transactions using Gelato Relayer via Relay Kit.
- Sign In using socials using Web3Auth via Auth Kit.
- Add funds using your Credit-Card using the Stripe SDK via On-Ramp kit.
- Integration with the Safe Core SDK for improved account abstraction.
- Support for various cryptocurrencies, including Ether and ERC-20 tokens.
- Every team member needs to approve the transaction in order for it to execute.
- Transaction history and notification system for easy tracking of funds.
- Gnosis Multi Send transactions implemented. 

## Demo

[Live Website](https://safeteam.netlify.app/)

Youtube Video Demo

[![Youtube Video](https://img.youtube.com/vi/f7KOdOTYDXY/sddefault.jpg)](https://youtu.be/f7KOdOTYDXY)



## Tech Stack

**Frontend:** NEXT.JS, ethers.js, Web3Auth

**Backend:** PolyBase, Safe Core SDK, Gelato, Base Testnet, Stripe SDK (onramp kit)
## Roadmap

- [x]  Social Logins
- [x]  Gasless Transactions
- [x]  Add funds using Credit Card
- [x]  Split Funds evenly on one click
- [x]  **Stream Funds to all team members**
- [ ]  Option to stake funds
- [ ]  Gasless Creation of Safes
- [ ]  Multi Chain support
- [ ]  Pitch the product to various Hackathon Platforms

## Run Locally

Clone the project

```bash
  git clone https://github.com/Code-Decoders/safe-team
```

Go to the project directory

```bash
  cd safe-team
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn dev
```


## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch
   ```sh
   git checkout -b feature/AmazingFeature
   ```
3. Commit your Changes 
    ```sh
    git commit -m 'Add some AmazingFeature'
    ```
4. Push to the Branch 
   ```sh
    git push origin feature/AmazingFeature
    ```
6. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE.md` for more information.
    
## Feedback & Contact

If you have any feedback or contact, please reach out to us at info@codedecoders.io


## Authors

- [@Maadhav](https://www.github.com/Maadhav)
- [@kunal528](https://www.github.com/kunal528)
- [@apoorvam-web3](https://www.github.com/apoorvam-web3)
