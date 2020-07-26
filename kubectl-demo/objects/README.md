# KUBECTL DEMO

lets first take a look on the environment and how to navigate it efficiently.

## CLUSTER
a cluster is a set of virtual or phisical machines (called nodes) that are interconnected and work together

this command allows you to see the available information about your cluster
```shell
kubectl cluster-info
```

this command allows you to see the nodes that conform your cluster
```shell
kubectl get nodes
```

---
---
## NAMESPACES
these are logical partitions of your cluster to keep resources separated and organized. some resources do not belong to namespaces but rather to the cluster itself like Nodes

this command will show you the namespaces in your cluster
```shell
kubectl get namespaces
```

this command will allow you to switch from your current namespace to the `<my-namespace>` namespace
```shell
kubectl config set-context --current --namespace <my-namespace>
```

---
---
## WORKLOADS
worloads are the units of computation your applications will run on. there are several types of workloads, the most basic (and smaller) one is the pod. one pod can have 1 or more containers. all containers in the same pod use the same network adapters and share the same destiny (created/restarted/destroyed simultaneously). 

these commands will show you the pods in the current namespace and in all namespaces
```shell
kubectl get pods
kubectl get pods --all-namespaces
```

jobs are workloads that are meant to be run once to perform a specific task.
these commands will show you the jobs in the current namespace and in all namespaces
```shell
kubectl get jobs
kubectl get jobs --all-namespaces
```

cronjobs perform tasks in a repetitive manner on a based on a time schedule

these commands will show you the cronjobs in the current namespace and in all namespaces
```shell
kubectl get cronjobs
kubectl get cronjobs --all-namespaces
```

replicasets are a group of identical pods. when creating a replicaset you specify a number of desired replicas and kubernetes will create as many as necessary to meet the this parameter. if one of these replicas fails for any reason, kubernetes will inmediately spawn a new replica and destroy the one that failed. normally you dont deal much with replicasets, instead we use deployments

these commands will show you the replicasets in the current namespace and in all namespaces
```shell
kubectl get replicasets
kubectl get replicasets --all-namespaces
```

deploymentset or deployment is an object which can own replicasets and update them and their pods via declarative, server-side rolling updates. this is the most popular form of workload in kubernetes it is used to deploy stateless applications. all pods in a deployment belong to a replicaset and will share the same volumes

these commands will show you the deployments in the current namespace and in all namespaces
```shell
kubectl get deployments
kubectl get deployments --all-namespaces
```

statefulsets are the same as deployments, except that the pods under its control will not belong to a replicaset and will have its own individual state and be spawned in a specific order assigning different volumes to each pod.

these commands will show you the statefulsets in the current namespace and in all namespaces
```shell
kubectl statefulsets
kubectl statefulsets --all-namespaces
```

daemonsets do not own a replicaset, instead they spawn 1 pod per each node. they are used to run cluster level applications

these commands will show you the daemonsets in the current namespace and in all namespaces
```shell
kubectl get daemonsets
kubectl get daemonsets --all-namespaces
```

---
---
## NETWORK
services are used to communicate to pods. because any pod can fail at anytime and its IP address may change with any itteration, services will offer a dns name to communicate with a pod by the use of labels matching. as long as the service is configured to match the a pod label, it will serve a connection to it. services are logical networking interfaces. normally 1 service will be configured to dispense connection to 1 or multiple identical pods and will loadbalance between them. this is a crucial component of almost any application. there are 4 types of services. 

1. ClusterIP: Exposes the Service on a cluster-internal IP.
2. NodePort: Exposes the Service on each Node's IP at a static port.
3. LoadBalancer: Exposes the Service externally using a cloud provider's load balancer
4. ExternalName: Maps the Service to the contents of the externalName field (e.g. foo.bar.example.com), by returning a CNAME record


these commands will show you the services in the current namespace and in all namespaces
```shell
kubectl get services
kubectl get services --all-namespaces
```

---
---
## STORAGE
A PersistentVolume is a piece of storage in the cluster that has been provisioned by an administrator or dynamically provisioned using StorageClass. it can be attached to pods to store data

this command will show you the PersistenVolumes in the cluster 
```shell
kubectl get persistentvolume
```

A PersistentVolumeClaim is a request for storage by a user. It is similar to a Pod. Pods consume node resources and PersistenVolumeClaims consume PersistentVolumes resources.

this command will show you the persistentvolumeclaims in the cluster
```shell
kubectl get persistentvolumeclaim
```

A StorageClass provides a way for administrators to describe the "classes" of storage they offer. Different classes might map to quality-of-service levels, or to backup policies, or to arbitrary policies determined by the cluster administrators.

this command will show you the storageclasses in the cluster
```shell
kubectl get storageclasses
```

---
---
## CONFIGURATION
in kubernetes there are 2 basic configuration objects, Secrets and ConfigMaps. both are namespaced and ussually they are mounted in the container in the form of environment variables, although not necessarily has to be that way. they can be used for other things like SSH keys, Database passwords, OAuth tokens, API keys, Image registry keys and pretty much anything that you can put into a `key=value` format. 


these commands will show you the configmaps in the current namespace and in all namespaces
```shell
kubectl get configmaps
kubectl get configmaps --all-namespaces
```

these commands will show you the secrets in the current namespace and in all namespaces
```shell
kubectl get secrets 
kubectl get secrets --all-namespaces
```
