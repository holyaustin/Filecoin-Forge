---
description: Define your data storage requirements and objectives
---

# 🔎 Select Datasets

### Dataset selection

When selecting the dataset to be stored into the Filecoin network, Data Owners should consider: data classification, use-cases, value of the data, and desired improvements over existing storage solution.

To be suitable for the onboarding solution described in this guide, the total sizing of a "large dataset" multiplied to include all replicas, should be expected to exceed 100 TiB.&#x20;

### Sizing&#x20;

Determine the size of the source dataset.&#x20;

Determine how many replicas are needed. Multiple replicas across multiple SPs will increase data availability, durability, and fault-tolerance. To calculate the total size, multiply the source dataset by the number of replicas.&#x20;

{% hint style="info" %}
Add some padding buffer to the sizing. \
Additional buffer storage will be used for padding within the Filecoin data packaging format, the .car archive file. The source data set will be processed, split, and bin-packed into these files, where source data is padded to be in some power of two (^2) size up to a maximum of 32GiB. Expect there will not be 100% padding efficiency so please add a padding buffer to the dataset sizing. If you're interested in the details, see the [Filecoin spec](https://spec.filecoin.io/#section-systems.filecoin\_files.piece).&#x20;
{% endhint %}

### Replica placement

Where possible, it is recommended to distribute replicas to multiple SPs across geographic regions. Consider any data residency regulations that may limit replicas to within a country.

### Retention

Determine the duration the dataset needs to be retained for. The current maximum duration of Filecoin storage deals is 540 days. After this period, deals can be renewed by making new storage deals and re-sealing.

### Public or Private data

If the selected dataset is classified as public, it can be stored on the Filecoin network in clear and accessible the general public.

Private datasets will require the Data Owner to implement encryption for data privacy.  Encryption of the dataset by the Data Owner prior to storage enables confidentiality over the public Filecoin storage network. The Data Owner selects an encryption method, encrypts datasets prior to packaging and storage, and decrypts the datasets after retrieval. Data Owners are responsible for secret management and key management.

### Retrieval frequency

Consider the "temperature" of data. At the current state of the Filecoin network, cold data storage and infrequently-accessed archive data are more suitable storage use-cases, than warm or hot datasets.&#x20;

Consider what portion of the dataset will be requested for each retrieval, e.g. individual files,  partial retrieval, or full retrieval. Consider whether a special offline data transfer arrangement should be negotiated with SPs.

{% hint style="info" %}
Fast and low-latency retrieval over the Filecoin network is currently a work-in-progress, and beyond the scope of this guide. Refer to [Filecoin Retrieval market](https://retrieval.market/) for more info.&#x20;
{% endhint %}

While the current state of the Filecoin client implementations do support retrievals, however the system of SP retrieval incentives are still evolving so you should check with your selected SPs about retrievability service levels, and to ensure they can support your expected data retrieval pattern.

### Define objectives&#x20;

Objectives of your data onboarding project on Filecoin can include, e.g. reducing storage costs, improvement on existing storage infrastructure, improving data availability and data durability, increasing storage decentralization, enabling Web3 use-cases, etc.&#x20;

