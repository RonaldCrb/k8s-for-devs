# PASSING COMMANDS TO KUBECTL

in kubernetes there are 2 ways you can interact with the cluster. Imperative and Declarative.

## IMPERATIVE 
use this approach to create objects with a command. you tell kubernetes exactly what to do by only passing commands to kubectl. this is the quick and dirty way to interact with the cluster and its appropriate to learn the api and to diagnose your cluster

## DECLARATIVE
use this approach to create objects by passing YAML manifests. you write a yaml file with the necessary configuration to spawn a kubernetes object. this is the approach used by most kubernetes professionals because these manifests can be version controlled (git), templated (helm), grouped (apps) and iteratively developed.

## FOR DEVELOPERS
From the developers perspective, most of the time you will push your code to a repository and after a passing pipeline you will have an image available to you in a docker registry. however developing in a kubernetes native fashion requires you to interact with the cluster to diagnose applications, tweak and adjust how you interact with other applications and basically understand the structure of the cluster. for this you will mostly use the imperative commands. 

## NAMESPACES

lets deploy a test application... this application will return a random Captain Pickard image on every query.

first create a namespace. this is not necessary but if you share your cluster with other developers it will be nice to have your own "isolated" sandbox and deploy your application to it.

```shell
kubectl create namespace <my-namespace>
kubectl create deployment pickard --namespace <my-namespace> --image=ronaldcrb/node-pickard
```

query your deployment

```shell
kubectl get deployments
```

what? no deployment??? 

this happens because you need to specify the namespace you are trying to query. if you dont specify a namespace, kubectl will assume you are trying to query your current namespace... to avoid the need to specify your namespace with every command, switch to that namespace it.

```shell
kubectl config set-context --current --namespace <my-namespace>
```

now lets see... 
```shell
kubectl get deployments
```
--- 

## PORT-FORWARDING

how do you hit an endpoint in your application that is running in the cluster? port forwarding...

lets see what our `pickard` application is doing... 

```shell
kubectl get pods
kubectl port-forward <name of your pod> 3000:3000
```

just like in docker, we can map a port in a specific pod to your localhost.

go to your browser and see your application working.

## SHELL SESSIONS

what if you want to get a shell inside the container and check the filesystem?

easy... just pass this command

```shell
kubectl exec -it <name of your pod> sh
```

notice the flag `-it`... this is to make it interactive just like in docker... the sh argument is because this pod is based on a linux alpine image which is a minimalistic linux distribution that doesnt have bash... so you use `sh` instead... you can install packages with the alpine package manager like this

```shell
apk add curl
```

great, we can do a curl request to google. also we can call other applications in the cluster... 
```shell
curl google.com
```

## LOGS
we can check the logs of the application by passing this command

```shell
kubectl logs <name of the pod>
kubectl logs <name of the pod> --follow # to follow the logs tail
```

## DEPLOYING ANOTHER APP AND COMMUNICATING WITH PICKARD

so we have our pickard deployment... in order to be able to hits its endpoints we need to expose it... for this we use the expose command... when we did the port-forwarding, we saw that this application is exposed on port 3000, so we pass the `--port` flag with the value 3000

```shell
kubectl expose deployment pickard --port=3000
```

this command creates a service of kind ClusterIP to match the labels of the pods owned by the `pickard` deployment

notice that we are saying we want to expose a deployment, not a pod... if there are multiple replicas controlled by the same deployment, the service will load-balance them... 

we can also port-forward a service using the same command we saw before and just prefixing with the `svc/<name of the service>` this is the abbreviated form of the service object.

```shell
kubectl port-forward svc/pickard 3000:3000 
```

or expose de deployment like so
```shell
kubectl port-forward deploy/pickard 3000:3000
```

