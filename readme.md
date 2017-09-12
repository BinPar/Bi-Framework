# Bi-Framework

A full Stack JavaScript code first GraphQL + Apollo + React + Next, opinionated, complexity first web framework.

## Not just another Framework

We want to have a dramatic improvement of the relation between the time spent in our projects and the result produced.

As we have been increasing the complexity of our solutions in the latests years the costs associated with the development process have been increasing because of the architecture requirements of the solutions and the amount of thinks that de team have to keep in mind.

We want to focus the effort on solving the complex problems once, and there are a lot of scenarios where the NPM based boilerplate with WebPack solution is just not enough.

The *Meteor* approach allowed us to do great thinks, but we need to move on: No WebPack, heavy Bundle, router agnostic (involving problems with progressive download of bundles), no *elegant* SRR support...

And at the same time we need to avoid the per project complexity overhead of the Boilerplate and get advantages of the framework runtime model in terms of been able invest to improve the performance and functionalities of the framework and apply it to all of our projects.

## Road Map

We will start with the Bi-Model runtime.

Bi-Model will allow us to create a schema based GraphQL server generating:

- GraphQL Schema
- Mongoose Data Model for MongoDB
- Authentication
- Permissions System
- Automatic Fixtures Generation
- De-normalization optimization and logic
- Business logic of the project

As a result it will allow you to crearte the data schema and generate the API for both you Back Office and your Front End.

The next step will be Bi-Back, a runtime to generate automatically a Back Office user interface to allow the customers to interact with their model in a friendly way.

Finally we will implement Bi-Front, an isomorphic rendering Next based server that will contain a automatically generated client-side library to interact with the Bi-Logic model.

# TODOs

## Parser

- [x] Parser

## Back end

- [x] Schema GraphQL
- [ ] Mongoose model
- [ ] Automatic fixtures generation
- [ ] Basic GraphQL Resolvers
- [ ] Permissions
- [ ] Advanced logic (validations, methods, etc)
- [ ] Automatic testing generation
- [ ] Documentation

## Executable

- [ ] Client bundle generator

## Back office

- [ ] Navigation
- [ ] Grid lists
- [ ] Forms (insert, update, delete)

## Front end

- [ ] Samples and helpers