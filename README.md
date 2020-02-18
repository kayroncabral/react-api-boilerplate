[![Build Status](https://travis-ci.com/somosmee/mee.svg?token=ibFoUs4Eey7Bsz93pLds&branch=master)](https://travis-ci.com/somosmee/mee)

# Mee

# Project and Business Overview

Business Planning and Project Overview

https://miro.com/app/dashboard/

Project Management

https://www.issue.sh (boards and scrum on github)

# Deployment Google Cloud

Set a env variable to store you project id
```
PROJECT_ID=[YOUR_PROJECT_ID]
```

Define gcloud project you are working with
```
gcloud config set project $PROJECT_ID
```

Define your compute zone
```
# set env variable for zone
COMPUTE_ZONE=us-central1-a

# set zone
gcloud config set compute/zone $COMPUTE_ZONE
```

Create cluster
```
# set cluster name
CLUSTER_NAME=mee-cluster

# create cluster (enable Kubernetes Engine API if necessary)
gcloud container clusters create $CLUSTER_NAME --machine-type=n1-standard-1 --num-nodes=1
```
Get cluster auth credentials
```
gcloud container clusters get-credentials $CLUSTER_NAME
```

## Kubernetes manual commands

Create services
```
kubectl create -f kubernetes/production --recursive
```

Delete services
```
kubectl delete deployments,services,ingress --selector=env=production
```

## Development

```
# up and run the containers
docker-compose up

# setup mongodb replicaset
./docker-replica-up.sh

# shutdown everything
docker-compose down
```

## HTTPS

https://cloud.google.com/kubernetes-engine/docs/how-to/ingress-multi-ssl?authuser=1

https://estl.tech/configuring-https-to-a-web-service-on-google-kubernetes-engine-2d71849520d

```
certbot -d www.somosmee.com --manual --logs-dir certbot --config-dir certbot --work-dir certbot --preferred-challenges dns certonly

certbot -d somosmee.com --manual --logs-dir certbot --config-dir certbot --work-dir certbot --preferred-challenges dns certonly

# put on tls.key
cat privkey.pem | base64
<LONG_BASE64_ENCODED_KEY>

# put on tls.crt
cat fullchain.pem | base64
<LONG_BASE64_ENCODED_CERT>
```

> To non-interactively renew *all* of your certificates, run "certbot renew"
