# Welcome to the Kubernetes Basic Tutorial

## ABSTRACT

As of today, Kubernetes is the top technology for container orchestration in the world and the one that we have chosen to base our services on. This decision comes with a set of challenges that we want to overcome in order to make our workflows efficient and the delivery of our products in a consistent, fast and reproducible manner.

## OBJECTIVES

1. Setup a basic kubernetes environment based on Minikube
2. Setup the basic tools to develop applications in a Kubernetes Native fashion
3. Learn the basic interactions with a Kubernetes clusters

## REQUIREMENTS

1. [Docker](https://docs.docker.com/get-docker/)
2. [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) -> sometimes pronounced kube-control, kube-cuttle
3. [Minikube](https://minikube.sigs.k8s.io/docs/start/)
4. [k9s](https://github.com/derailed/k9s) -> sometimes pronounced "canines"
5. [Kubernetes vscode extension](https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-kubernetes-tools) (optional)
5. [Telepresence](https://www.telepresence.io/reference/install) (optional)

---
## INSTALLING KUBECTL

kubectl is the essential tool to interact with kubernetes clusters, install it following the instructions in [official kubernetes website](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

to check the kubectl version:
```shell
kubectl version
```

kubectl uses the `KUBECONFIG` environment variable to acquire context, this variable will allow you to assign the path to your kubeconfig file which provides access information and credentials to access a kubernetes cluster. if this variable is not present in your shell session, kubectl defaults to look for the `~/.kube/config` file for this very same purpose

some people like to setup aliases for the `kubectl`. this is not required but its a common practice. the following is a list of some aliases i use.

```shell
alias k=kubectl
alias kgp='kubectl get pods'
alias kgpa='kubectl get pods --all-namespaces'
alias kgs='kubectl get services'
alias kgsa='kubectl get services --all-namespaces'
alias kgd='kubectl get deployments'
alias kgda='kubectl get deployments --all-namespaces'
alias kgn='kubectl get namespaces'
alias kns='kubectl config set-context --current --namespace'
```

we are going to be using the `kubectl` command quite a lot... in order to save some time and typos, it is recommend to  setup the autocomplete feature. the procedure is described [here](https://kubernetes.io/docs/tasks/tools/install-kubectl/#enabling-shell-autocompletion) . if youre using aliases, make sure you follow the last step on this section so you can use aliases and autocompletion simultaneously.

---
## INSTALLING MINIKUBE

Minikube is a minimalistic Kubernetes distribution created with the purpose of setting up a single node cluster to learn and practice kubernetes.

All distributions of Kubernetes rely on a container runtime like Docker, CRI-O or RKT. This tutorial uses Docker as this is the most popular runtime in todays market and also the one we use.

to install Minikube you can follow the official instructions provided in the [Minikube official website](https://minikube.sigs.k8s.io/docs/start/)

by default, if docker is installed in your machine, Minikube will assign this as its driver. this means minikube will function inside a docker container in your machine. this is the preferred way to run minikube, but not the only one.

to start a minikube local cluster: 
```shell
minikube start
```

to check the status of the local minikube cluster: 
```shell
minikube status
```

to pause the local minikube cluster without affecting your workloads and configurations: 
```shell
minikube pause
```

to stop minikube: 
```shell
minikube stop
```

to delete the local minikube cluster: 
```shell
minikube delete
```
---
## INSTALLING K9S
k9s is a powerfull terminal interface to interact with kubernetes clusters, it has lots of usefull hotkeys that map to common kubectl commands and allow you to rapidly diagnostic your cluster, these hotkeys are somewhat similar to the _VIM_ hotkeys

to install k9s follow [these instructions](https://github.com/derailed/k9s)

alternatively, there is a script to quickly install k9s in linux. you can find it in the scripts/k9s directory of this repository along with some skins and instructions for installing it. 

TL;DR
```shell
chmod +x scripts/k9s/install.sh
./scripts/k9s/install.sh
```

to start k9s in your terminal, just type
```shell
k9s
```

notice that you have on the ui header some hotkeys defined there. you can also see more available hotkeys in any of the interface views by pressing `shift + /`

just like `kubectl`, it uses the `KUBECONFIG` environment variable to acquire context. it also uses the `EDITOR` environment variable for some advanced features, mostly for editing manifests directly in the cluster 

---
## INSTALLING TELEPRESENCE (Optional)
Telepresence is a tool that allows you to create a tunnel from the cluster to your machine so you can map communications to and from the cluster to your local environment. you can install it following [the instructions in the official page](https://www.telepresence.io/reference/install). 

Alternatively, you can use the installation script provided at `scripts/telepresence/install.sh` along with instructions

TL;DR 
```shell
chmod +x scripts/telepresence/install.sh
./scripts/telepresence/install.sh
```
[this guide](https://www.telepresence.io/tutorials/docker) will allow you to setup your kubernetes native development workflow using docker as recommended by the telepresence team.
