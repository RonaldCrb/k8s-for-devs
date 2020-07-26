# TELEPRESENCE DEMO

first we build the image with the dockerfile provided in this repo. this is a multistage dockerfile, so we will make use of the `dev` stage in order to use the hot-reloading and the development dependencies
```shell
docker build --target=dev -t <name of the image> . 
```

then we will deploy this application in the cluster. in this case we will use the declarative command in order to deploy 3 kubernetes manifests contained in the file `k8s/telepresence-demo.yaml`
```shell
kubectl apply -f k8s/telepresence-demo.yaml
```

lastly we will use telepresence to swap the deployment we just created for a container that will run in our local machine. 
```shell
telepresence --swap-deployment telepresence-demo --expose 3030 --docker-run --rm -it -v $(pwd):/app <name of the image>
```
this command is quite verbous, so lets break it down. 
- `telepresence --swap-deployment telepresence-demo` using telepresence we swap the deployment called telepresence-demo
- `expose 3030` expose port 3030 in your local machine to accept traffic from the cluster (blocked by default)
- `--docker-run --rm -it` use docker to run locally, remove the container when finished and make it interactive
- `-v $(pwd):/app` bind the local directory to the /app directory inside the container
- `<name of the image>` use the image we built in step 1 

with this setup in place, we can comfortably start developing in our local machine using hot reloading and seeing how our application interacts with other applications running in the cluster. we can demonstrate this by changing the code and creating a new endpoint

