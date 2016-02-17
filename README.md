DialerPureCloudAPIDemo
======================

A simple Website that shows how to use [Interactive Intelligence, Inc](https://www.inin.com)'s [PureCloud](https://mypurecloud.com) Outbound [API](https://developer.mypurecloud.com) 

The goal of this project is to match the Dialer .Net API project I did for CIC and IceLib.

A big difference is the language I used. The previous project was done as an ASP/MVC project and would run on IIS under Windows only.  
This one is an [Express.js](http://expressjs.com) project runs on [Node.js](https://nodejs.org). This means it can be deployed on Windows, Mac OS, Linux, Unixes, etc.

Installation
------------

First, we need to install [Node.js](https://nodejs.org) and [Bower](http://bower.io):  

1. On Mac OS/X
  If you use [Homebrew](http://brew.sh), simply run:
  ```sh
  brew install nodejs
  ```
  Otherwise, go to [Node.js downloads](https://nodejs.org/en/download) and follow the instructions.

2. On  Windows
  If you use [chocolatey](https://chocolatey.org), simply run in an *administrator* shell:
  ```posh
  cinst -y nodejs
  ```
  Otherwise, go to [Node.js downloads](https://nodejs.org/en/download) and follow the instructions.

3. On Linux
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

Run
---

Simply type:
```sh
npm start
```

in the main folder of the project.

If you want extra debugging messages to show:

```sh
DEBUG=DialerPureCloudAPIDemo:* npm start
```

or, on Windows:
```posh
$env:DEBUG="DialerPureCloudAPIDemo:*" ; npm start
```

AUTHORS
=======
[Gildas Cherruel ![endorse](https://api.coderwall.com/gildas/endorsecount.png)](https://coderwall.com/gildas)
