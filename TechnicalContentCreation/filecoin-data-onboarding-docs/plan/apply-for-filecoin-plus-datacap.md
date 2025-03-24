# 🎟 Prepare storage funding with DataCap or FIL

There are 2 ways to fund storage deals:&#x20;

1. Apply for DataCap. Think of these as storage credits that are allocated after community review of the client's project, identity, and dataset. This is currently the more common way to fund storage deals, since it is effectively subsidized storage for approved projects.
2. Acquire FIL tokens. Used to fund "regular deals", community review not required, though FIL tokens will need to be acquired, typically on exchanges. Regular FIL deals are currently accepted only by the few Storage Providers that have decided on and set their asking price in FIL. &#x20;

In either case,

## Prepare a Filecoin wallet

The wallet address will be where approved Fil+ datacap will be allocated to.&#x20;

To create a Filecoin wallet on a lotus node, see [wallet instructions on lotus docs](https://lotus.filecoin.io/tutorials/lotus/store-and-retrieve/set-up/#get-a-fil-address).

To create a Filecoin wallet on Boost client, see [boost init command on boost docs](https://boost.filecoin.io/getting-started/boost-client).

Please securely backup the wallet keys, using `lotus wallet export` or `boost wallet export` commands&#x20;

Next, select a funding method:&#x20;

## 1. Apply for Filecoin Plus DataCap

### What is DataCap?

DataCap is a cryptoeconomic incentive to Storage Providers for storing verified datasets. Clients apply for DataCap, which is reviewed by a community of Fil+ notaries. Upon approval, DataCap is allocated to the applicant's FIL wallet. DataCap is spent by the client in storage deals with storage providers. In a way, DataCap can be thought of as similar to storage credits.&#x20;

Datacap is part of the Fil+ (Filecoin Plus) programme. More info:

* [https://docs.filecoin.io/store/filecoin-plus/](https://docs.filecoin.io/store/filecoin-plus/)
* [https://github.com/filecoin-project/filecoin-plus-client-onboarding](https://github.com/filecoin-project/filecoin-plus-client-onboarding)
* [https://github.com/filecoin-project/filecoin-plus-large-datasets](https://github.com/filecoin-project/filecoin-plus-large-datasets)

### Apply for **Large Dataset Datacap Application**&#x20;

Create a Large Dataset Datacap Application as a Github issue at:\
[https://github.com/filecoin-project/filecoin-plus-large-datasets/issues](https://github.com/filecoin-project/filecoin-plus-large-datasets/issues),  \
click "New Issue" -> Large Dataset Notary application -> "Get Started".

Alternately, use [https://filplus.storage/apply](https://filplus.storage/apply) &#x20;

{% hint style="info" %}
Where possible, apply for datacap using a Github account with some history of commits or repository activity, to better align with Github terms of service.
{% endhint %}

The datacap application process can take several days of governance review. Q\&A about the application can extend the duration, so it is recommended to provide clear and complete information, clearly describe the use-case, be transparent. When in doubt, over-communicate details. Click "subscribe" to receive questions and comments on the Datacap application, so that you can respond promptly to questions from the Filecoin governance community.

Each datacap application has a maximum datacap limit of 5 PiB. For datasets that exceed 5 PiB, one approach is to submit a multi-part series of LDNs.&#x20;



## 2. Regular FIL Funding

First, check with SPs about which are accepting regular FIL deals. Determine and agree with SPs about their FIL ask pricing for the padded total size and duration of your dataset, to calculate the FIL funds required.&#x20;

{% hint style="info" %}
Make sure you work with a Storage Provider you trust to provide guidance, or reach out to the Filecoin Network Growth team for help at [https://dataonboarding.filecoin.io/](https://dataonboarding.filecoin.io/)&#x20;
{% endhint %}



{% embed url="https://docs.filecoin.io/get-started/store-and-retrieve/set-up/#filecoin-plus" %}
