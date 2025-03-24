# ⚒ Setup Storage Gateway environment

## **Software stack**

The storage gateway server should be installed with:

* [Singularity](https://singularity.storage/) - petabyte-scale data onboarding and retrieval client tool.&#x20;
  * Install Singularity: [https://boost.filecoin.io/getting-started](https://boost.filecoin.io/getting-started)
* [Lotus Lite node](https://lotus.filecoin.io/lotus/install/lotus-lite/) - lite client for interacting with the Filecoin chain. Used for legacy deals.
  * Install Lotus and configure a lotus-lite node: [https://lotus.filecoin.io/lotus/install/lotus-lite/](https://lotus.filecoin.io/lotus/install/lotus-lite/)
* [Boost](https://boost.filecoin.io/) - new lotus markets client for v1.2 deals with upgraded SPs.
  * Install Boost client: [https://boost.filecoin.io/getting-started](https://boost.filecoin.io/getting-started)
* Web Server - hosting of CAR files for online data transfer to SPs.&#x20;
  * E.g. Nginx.
* [IPFS](https://docs.ipfs.tech/install/) daemon, stores the Singularity dataset index to support retrievals.
  * [https://docs.ipfs.tech/install/command-line/](https://docs.ipfs.tech/install/command-line/)

An Ubuntu Linux instance is recommended. Singularity, Lotus node, and Boost packages should be be built and installed from source. Web server and IPFS daemon can be installed from binaries.



\[**TODO** link to Ubuntu build script]

## Architectural decisions

### Data transfer plan and Gateway placement

Network data transfer is often a limiting factor when onboarding PiB-scale large data sets. Determine the optimal data replication approach for the following paths:

* Source dataset replicated from the data owner to the storage gateway,
* Prepared dataset replicated from the storage gateway to each participating SP.

Compare online network data transfer options and offline physical media transport options, consider feasibility, cost, transfer duration, etc. The data transfer plan may also affect the optimal placement the storage gateway. Compare cloud vs. on-premise hosting. Consider the physical locations of the source dataset and the destination SPs.

### Storage Gateway sizing&#x20;

Gateway storage should be sized for storing the source dataset, and for hosting of the prepared CAR files. A general guideline is to size local storage for 2x of the source dataset size.

### Optimization

Data preparation tasks are IO-bound, so the storage gateway will benefit from fast local storage, such as iSCSI or NVMe storage interfaces. &#x20;

Singularity can also be configured to specify a number of workers for concurrent data preparation. See deal\_preparation\_worker.num\_workers in the [Singularity config file](https://github.com/tech-greedy/singularity/blob/main/config/default.toml) if required.

### ****





