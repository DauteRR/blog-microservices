# Blog microservices

This repository contains my implementation of the first application of the Stephen Grider's course [Microservices with Node JS and React](https://www.udemy.com/course/microservices-with-node-js-and-react/). The application is a blog for posts and comments creation. The backend is conformed by the next microservices:

- posts: Manages posts creation
- comments: Manages comments creation
- query: Merges posts and comments and exposes an endpoint to be consumed by the client
- moderation: Manages comments moderation process. A comment has three different states: pending, moderated and rejected. A comment is rejected if contains the word 'orange'
- events-bus: Manages async communication between microservices

The frontend application code is under the client folder. This implementation should be taken as a dummy example and a beginner approach to the microservices world.

## Local deployment

In order to deploy the application and the microservices your system should have installed the following technologies:

- [Docker](https://www.docker.com/)
- [Kubernetes](https://kubernetes.io/)
- [Skaffold](https://skaffold.dev/)

The development process was carried in a Linux environment. For that reason, [Minikube](https://minikube.sigs.k8s.io/docs/) and [VirtualBox](https://www.virtualbox.org/) were needed to run a Kubernetes cluster locally.

1. Start the local cluster:

```bash
$ minikube start --driver=virtualbox
```

2. Run Skaffold to create Kubernetes Objects:

```bash
$ skaffold dev
```

In order to stop Skaffold press ctrl + C in the terminal

3. Add a temporary line to hosts file (replace ip_address with the result of running minikube ip):

> ip_address posts.com

4. Type posts.com in your browser and hopefully, you will see a dummy web application
