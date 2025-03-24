# 📦 Prepare data

## Preprocess dataset (if required)

The Data Owner may choose to pre-process the original dataset, such as encrypting the source data. The Data Owner should have sufficient secrets management controls and practices in place.&#x20;

The Data Owner may optionally engage a trusted Storage Gateway operator to advise on encryption practices, and potentially delegate public-key encryption tasks. Discussion of specific data encryption and key management options is outside the scope of this guide.

{% hint style="info" %}
Encrypted private datasets will require the datacap application to be reviewed under the "E-Fil+" (Enterprise Filecoin Plus) programme, which has additional enterprise KYB and governance review steps.
{% endhint %}

## Transfer source data to storage gateway

Source Data is transferred to the Data Preparer via a suitable method. The general choice is between either online data transfer or physical hard drive shipping.

When evaluating data transfer methods for large datasets, consider what is the optimal path:

* Network bandwidth
* Location of Data Preparer
* Offline data transfer, where suitable.\
  e.g. Seagate Lyve Mobile, Acromove, DIY shipment of encrypted hard drives, etc.

Budget for data transfer costs, e.g. online bandwidth, public cloud network egress fees, offline shipping.

## Prepare data

The storage gateway packages the source dataset into [CAR format](https://ipld.io/specs/transport/car/) files, **C**ontent **A**ddressable a**R**chives. To prepare a source dataset into CAR files:

```
singularity prep create <DATASET_NAME> \
    <PATH_TO_LOCAL_DATASET_ROOT> <PATH_TO_CAR_OUTPUT> 
```

The singularity daemon takes the source dataset, splits large files, bin-packs small files, packages the output into a set of CAR files of 32GB maximum size each, and registers the dataset metadata into the Singularity database.

Monitor the progress of data preparation jobs:

```
singularity prep list
singularity prep status <DATASET_NAME>
```

At the completion of data preparation, a set of CAR files becomes available in the output directory.

Further details in the [Singularity quick start guide](https://github.com/tech-greedy/singularity/blob/main/getting-started.md). &#x20;

###





