DialerPureCloudAPIDemo
======================

A simple Website that shows how to use [Interactive Intelligence, Inc](https://www.inin.com)'s [PureCloud](https://mypurecloud.com) Outbound [API](https://developer.mypurecloud.com) 

The goal of this project is to match the Dialer .Net API project I did for CIC and IceLib.

A big difference is the language I used. The previous project was done as an ASP/MVC project and would run on IIS under Windows only.  
This one is an [Express.js](http://expressjs.com) project runs on [Node.js](https://nodejs.org). This means it can be deployed on Windows, Mac OS, Linux, Unixes, etc.

Installation
------------

First, we need to install [Node.js](https://nodejs.org) and [Bower](http://bower.io):  

1. Using [Docker](http://docker.com)
   Create a docker image from the node.js official image (All is set already in the project's Dockerfile)  
   ```sh
   docker build --tag recordplayer .
   ```

   Then, run a container off of it:
   ```sh
   docker run -p 3000:5000 --name recordplayer -v $(pwd):/usr/local/src --sig-proxy=false recordplayer nf start
   ```

   You can also run the `drun` script in the main folder of the project that will do everything for you.  

2. On Mac OS/X
  If you use [Homebrew](http://brew.sh), simply run:
  ```sh
  brew install nodejs
  ```
  Otherwise, go to [Node.js downloads](https://nodejs.org/en/download) and follow the instructions.

3. On  Windows
  If you use [chocolatey](https://chocolatey.org), simply run in an *administrator* shell:
  ```posh
  cinst -y nodejs
  ```
  Otherwise, go to [Node.js downloads](https://nodejs.org/en/download) and follow the instructions.

4. On Linux
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

Then, we need some Node.js tools:
```sh
npm install --global bower
```

Finally, clone this repository anywhere you see fit:

```sh
git clone https://github.com/gildas/DialerPureCloudAPIDemo.git
```

Install it:
```sh
cd DialerPureCloudAPIDemo
npm install
bower install
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
        "region_id": "au",
        "application": "APP UUID"
      },
      {
        "id": "ORG UUID",
        "name": "My US Organization",
        "region_id": "us",
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
- Valid regions are: APAC, AU, EMEA, EU, IE, JP, US.
- Provide the actual organization ID from your PureCloud Organization Settings (under: /directory/#/admin/general-info/details)
- Provide the actual application ID from your [PureCloud OAUTH Settings](http://developer.mypurecloud.com/api/rest/authorization/).

Run
---

Simply type:
```sh
bin/www
```

On Windows:
```posh
.\bin\www
```

in the main folder of the project.

You can override the configuration set in the config.json using environment variables and command line options:

```sh
bin/www --port 1234
```

On Mac OS/Linux:
```sh
PORT=1234 bin/www
```

On Windows:
```posh
$env:PORT=1234 ; .\bin\www
```

If you want extra debugging messages to show:

```sh
DEBUG=DialerPureCloudAPIDemo:* npm start
```

or, on Windows:
```posh
$env:DEBUG="DialerPureCloudAPIDemo:*" ; .\bin\www
```

Deployment on :heart:[Heroku](https://heroku.com):sunglasses:
----------------------

These instructions are for Mac OS/X, but I suspect Linux and Windows would be quite similar.  
Run all commands from the *root* of the project.

1. Make sure you have the [Heroku](https://heroku.com) toolbelt loaded... Check their [getting started](https://devcenter.heroku.com/login?back_to=%2Farticles%2Fgetting-started-with-nodejs) document otherwise.
2. Login your heroku account
3. Create the application:
```sh
heroku create
```
4. Configure your PureCloud OAUTH Application to accept the URL that was just created.  
   For instance: `http://sharp-rain-871.herokuapp.com/`
5. Deploy the application to your [Heroku apps](https://dashboard.heroku.com/apps).
```sh
git push heroku master
```
6. Configure the instance with the PureCloud organizations you want:
```sh
heroku config:set PURECLOUD_ORGANIZATIONS="$(jq -cM '.purecloud.organizations' config.json)"
```
The best is to use the JSON file you created while testing locally (or to write one) and to process it with [jq](https://stedolan.github.io/jq) under Mac or Linux to get a compact string.  

On Windows, using PowerShell 3.0+, one could write:  

```posh
heroku config:set PURECLOUD_ORGANIZATIONS=((Get-Content config.json) -join "`n" | ConvertFrom-Json | Select purecloud | select organizations | ConvertTo-Json -Compress)
```
(_To be tested!_)

7. Make sure the instance is running
```sh
heroku ps:scale web=1
```
Here I give only 1 Dyno, for a quick test, that's more than enough.
8. Have fun a use it!  
Either open your browser and go to the web site created in 3, or type:
```sh
heroku open
```

To see if it is all smooth, you can check the logs at:
```sh
heroku logs --tail
```

AUTHORS
=======
[Gildas Cherruel ![endorse](https://api.coderwall.com/gildas/endorsecount.png)](https://coderwall.com/gildas)
