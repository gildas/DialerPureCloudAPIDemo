DialerPureCloudAPIDemo
======================

A simple Website that shows how to use [Interactive Intelligence, Inc](https://www.inin.com)'s [PureCloud](https://mypurecloud.com) Outbound [API](https://developer.mypurecloud.com) 

The goal of this project is to match the [Dialer .Net API project](https://github.com/gildas/DialerNetAPIDemo) I did for CIC and IceLib.

A big difference is the language I used. The previous project was done as an ASP/MVC project and would run on IIS under Windows only.  
This one is an [Express.js](http://expressjs.com) project runs on [Node.js](https://nodejs.org). This means it can be deployed on Windows, Mac OS, Linux, Unixes, etc.

Installation
------------

First, you have to decide how you want to run the project. In the [Node.js](https://nodejs.org) world, there are several options you may want to consider:
- Run everything locally in your environment,
- Run everything in a [Docker](https://www.docker.com) container,
- Run everything in the cloud, like [Heroku](https://heroku.com).

Each method has its own advantages and drawbacks. 

Personnally, I tend to develop the projects in a container and deploy them on Heroku.
The former has the advantage to allow me to keep the app isolated from my computer (node version, etc) while easy to change code and see the result real-time.  
The latter allows me to see the app in the cloud, i.e. the outside world. 

Running everything  local is not something I do anymore as I have to "pollute" my laptop with environments and software versions I might not be interested in and might actually disrupt it. It is also very difficult to test/port the app in different versions of, say, node js (e.g. v5 to v6).  

### Installation in [Docker](https://www.docker.com) :heart: :heart:

First, you should install the docker project on your computer. It runs natively on all modern operating systems like Windows 10, Mac OS (10.10+), and Linux.  

Check out the [Docker download](https://www.docker.com/products/overview) to install it.

Once it is installed, let's move on with installing the project.

Clone this project:
```sh
git clone https://github.com/gildas/DialerPureCloudAPIDemo
```

Then build the initial docker image:
```sh
docker build --tag dialerpurecloud .
```

Then, run the a container off of it:
```sh
docker run -p 3000:5000 --name dialerpurecloud -v $(pwd):/usr/local/src --sig-proxy=false dialerpurecloud nf start
```

You can also run the `drun` bash script.

### Local Installation

More manual steps here as all tools have to run on your computer:

1. First, we need to install [node.js](https://nodejs.org).
  - On Mac OS/X
    If you use [Homebrew](http://brew.sh), simply run:
    ```sh
    brew install nodejs
    ```
    Otherwise, go to [Node.js downloads](https://nodejs.org/en/download) and follow the instructions.

  - On  Windows
    If you use [chocolatey](https://chocolatey.org), simply run in an *administrator* shell:
    ```posh
    cinst -y nodejs
    ```
    Otherwise, go to [Node.js downloads](https://nodejs.org/en/download) and follow the instructions.

  - On Linux
    Debian like distributions would use:
    ```sh
    sudo apt-get install -y build-essential
    curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
    sudo apt-get install -y nodejs
    ```

    RedHat like distributions would use:
    ```sh
    sudo yum groupinstall 'Development Tools'
    curl --silent --location https://rpm.nodesource.com/setup_5.x | bash -
    sudo yum -y install nodejs
    ```

2. Then, we need some Node.js tools:
  ```sh
  npm install --global bower
  ```

3. Clone this repository anywhere you see fit:
  ```sh
  git clone https://github.com/gildas/DialerPureCloudAPIDemo.git
  ```

4. Finally, install and run the project components in the project's folder:
  ```sh
  cd DialerPureCloudAPIDemo
  npm install
  bower install
  npm start
  ```

### Deployment on [Heroku](https://heroku.com) :sunglasses:

These instructions are for Mac OS/X, but I suspect Linux and Windows would be quite similar.  
Run all commands from the *root* of the project.

1. Create an [account](https://signup.heroku.com/signup/dc) with heroku or make sure you have one already.
2. Make sure you have the [Heroku toolbelt](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up) loaded... 
   Check their [getting started](https://devcenter.heroku.com/articles/getting-started-with-nodejs) document otherwise.  
   Make sure node.js is installed as well (See the Local Installation section)
3. Login your heroku account
   ```sh
   heroku login
   ```
4. Clone the repository from github:  
   ```sh
   git clone https://github.com/gildas/DialerPureCloudAPIDemo.git
   ```
5. Create the application, from the repository folder:  
   ```sh
   heroku create
   ```
6. Configure your PureCloud OAUTH Application to accept the URL that was just created.  
   For instance: `http://sharp-rain-871.herokuapp.com/`
7. Deploy the application to your [Heroku apps](https://dashboard.heroku.com/apps).  
   ```sh
   git push heroku master
   ```
8. Configure the instance with the PureCloud organizations you want:  
   ```sh
   heroku config:set PURECLOUD_ORGANIZATIONS="$(jq -cM '.purecloud.organizations' config.json)"
   ```
   The best is to use the JSON file you created while testing locally (or to write one) and to process it with [jq](https://stedolan.github.io/jq) under Mac or Linux to get a compact string.  
   On Windows, using PowerShell 3.0+, one could write:  
   ```posh
   heroku config:set PURECLOUD_ORGANIZATIONS=((Get-Content config.json) -join "`n" | ConvertFrom-Json | Select purecloud | select organizations | ConvertTo-Json -Compress)
   ```
   (_To be tested!_)
9. Make sure the instance is running  
   ```sh
   heroku ps:scale web=1
   ```
   Here I give only 1 Dyno, for a quick test, that's more than enough.  
   In production, we should use more dynos.
10. Have fun a use it!  
   Either open your browser and go to the web site created in 3, or type:  
   ```sh
   heroku open
   ```

To see if it is all smooth, you can check the logs at:
```sh
heroku logs --tail
```

Configuration
-------------

In the root folder of the project, write a config.json file, like this:

```json
{
  "port": 3000,
  "purecloud": {
    "organizations": [
      {
        "id": "ORG UUID",
        "name": "My Australian Organization",
        "region_id": "com.au",
        "application": "APP UUID"
      },
      {
        "id": "ORG UUID",
        "name": "My US Organization",
        "region_id": "com",
        "application": "APP UUID"
      }
    ]
  }
}
```

An example is provided in [config-sample.json](../blob/master/config-sample.json).

Notes:
- To use the default values, you can omit the value in the JSON.
- The default port is 3000
- You can have as many organizations as you want.
- Provide the actual organization ID from your PureCloud Organization Settings (under: /directory/#/admin/general-info/details)
- Provide the actual application ID from your [PureCloud OAUTH Settings](http://developer.mypurecloud.com/api/rest/authorization/).

Running it
----------

If you use Heroku, the website runs all the time and is handled by the cloud.

If you use docker, the best is to use the `drun` tool or to run this line:
```sh
docker run -p 3000:5000 --name dialerpurecloud -v $(pwd):/usr/local/src --sig-proxy=false dialerpurecloud nf start
```

if you run locally, the simplest is to run it through npm:
```sh
npm start
```

in the main folder of the project.

When running locally, You can override the configuration set in the config.json using environment variables and/or command line options:

```sh
npm start -- --port 1234
```

On Mac OS/Linux:
```sh
PORT=1234 npm start
```

On Windows:
```posh
$env:PORT=1234 ; npm start
```

If you want extra debugging messages to show:

```sh
DEBUG=DialerPureCloudAPIDemo:* npm start
```

or, on Windows:
```posh
$env:DEBUG="DialerPureCloudAPIDemo:*" ; .\bin\www
```

AUTHORS
=======
Gildas Cherruel
