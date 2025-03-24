# 📤 Replicate data to SPs and propose storage deals

Data transfer and storage deals can be executed in a couple of ways:

1. Online deals, where the data is transferred on-demand automatically with each storage deal. Data transfer is on a per-deal basis, making it important to agree upon a realistic deal transfer rate that aligns with the SP's sealing rate.
2. Offline deals, where the data is transferred in bulk prior to making deals. This approach reduces failure modes due to network bandwidth and sealing efficiency, and also supports offline data transfer.&#x20;

For maximum compatibility, offline deals and offline data transfer is the model used in this guide. Data transfer and deal making to each SP proceeds as follows:

1. Data Transfer. CAR files are transferred to SPs, typically "Offline" or out-of-band from the storage deal. Either network URL download or physical transport can be used.&#x20;
2. Propose Storage Deals. The Storage Gateway proposes storage deals for each transferred CAR file. Offline deals is the default mode of the Singularity tool
3. Data Import and Sealing. The SP imports received CAR files, matched to corresponding storage deals by `deal CID`. The miner then seals the deal data into sectors.

## Storage Gateway Activities

### Data transfer to SPs

Prepared CAR files can be distributed online or offline. Unless sufficient usable bandwidth exists for it to be feasible for an SP to download its set of CAR files online, otherwise PiB-scale data transfers often take place offline via physical storage media shipping.&#x20;

"Offline" data transfer can be more accurately described as "Out-of-band" data transfer. Offline deals separate the data transfer steps from the deal making steps, improving recoverability, and is more aligned to bulk large dataset onboarding. Other advantages of offline deals include: flexibility of transport method, e.g. HTTPS, aria2, SCP, Rsync, S3, physical storage media shipping; Batch operations also allow SPs greater control over scheduling their sealing pipeline. The storage gateway coordinates with each SP to receive the set of CARs relevant to them according to the distribution plan.

In contrast, "online" deals transfers data immediately following the deal proposal as a single user operation. This makes online deals easier to use for smaller datasets over reliable network connections.

More info in the Lotus docs about [deals with offline data transfer](https://lotus.filecoin.io/tutorials/lotus/large-files/#deals-with-offline-data-transfer).

Agree with each SP on deal and data transfer sequencing conventions. Compare the approaches between:&#x20;

* Offline/Async: SP downloads CAR files before receiving offline storage deal, &#x20;
* Online/Sync: SP downloads CAR files on-demand online, upon receipt of each storage deal.

### Propose storage deals to SPs

The Data Preparer proposes Storage deals to SPs.&#x20;

By default, Singularity sends the storage deal proposals as "offline" mode. While the deal proposal itself is transmitted to the SP online, the actual dataset content is expected have been sent out-of-band.

Here is an example use of [Singularity](https://github.com/tech-greedy/singularity/blob/main/getting-started.md) to start replication of a local dataset:

```bash
singularity repl start --max-deals 2 --cron-schedule '*/2 * * * *' \
    --cron-max-deals 200 --cron-max-pending-deals 2 \
    --start-delay $START_DELAY_DAYS --duration $DURATION_DAYS \
    --verified true \
    --output-csv $CSV_DIR $DATASET_ID $MINERID $CLIENT_WALLET_ADDRESS
```

* sets --duration days for the deal.
* Indicates a `--verified` deal, using Fil+ datacap, so price in Fil not required.
* Writes metadata about sent deals to --output-csv
* DATASET\_ID: Singularity id of the prepared dataset.
* MINERID: Comma separated storage provider ID list.
* CLIENT\_WALLET\_ADDRESS: address containing Fil+ datacap or FIL tokens.

The rate of storage deals being proposed to SPs is determined by the following parameters:&#x20;

* sends `--max-deals` per replication request per SP, per cron triggered
* schedules replication requests per SP based on `--cron-schedule`  (example crontab indicates once every 2 minutes)
* limits the number of pending deals at any time to `--cron-max-pending-deals`
* delays the start of deal by `--start-delay`  days, which allows time for the SP to seal the data.

The storage gateway operator should have a discussion with each SP about their expected sealing rate, and agree on a deal proposal rate.

Further details on how to propose online and offline deals are in the [Singularity quick start guide](https://github.com/tech-greedy/singularity/blob/main/getting-started.md).

## Storage Provider Activities

### SPs imports CAR files&#x20;

After an SP receives their CAR files, and receives storage deals, the SP imports CAR files matched to each Storage Deal by DEAL\_CID.

To import deals into Lotus legacy markets,

```
lotus-miner storage-deals import-data <DEAL_CID> <CAR_FILENAME>
```

To import Boost deals,

```
boostd import-data <DEAL_CID> <CAR_FILENAME>
```

### **Sealing**

Each SP's miner then proceeds to seal the imported data. This is a computationally-intensive process performed by the SP. The duration is dependent on the sealing rate of an SP, and the size of the dataset to be sealed.&#x20;

The Data Preparer can track the status by checking deal status:

```
singularity status <DATASET_ID>
```





