# f1-index

**Note:** Requires [f1-index MongoDB and Node.js backend services](https://github.com/Edsdover/node-epic).

## Setup

### Install prerequisites.

```
> brew install npm
> npm -g install bower gulp
```

### Clone repository.

```
> git clone https://github.com/Edsdover/angular-epic.git
```

### Setup local environment.

```
> cd angular-epic
> ./setup.sh
```

### Point application to running Node.js instance.

**Note:** Requires [f1-index MongoDB and Node.js backend services](https://github.com/Edsdover/node-epic), either running locally or on Heroku.

```
> vim client/config/constants.js
```

### Launch web application.

```
> gulp

[BS] Access URLs:
 ------------------------------------
       Local: http://localhost:3000
    External: http://172.20.10.3:3000
 ------------------------------------
          UI: http://localhost:3001
 UI External: http://172.20.10.3:3001
 ------------------------------------
[BS] Serving files from: ./public
```
