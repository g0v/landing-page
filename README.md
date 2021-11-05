# g0v.tw

This is the repository for the website [https://g0v.tw](https://g0v.tw).

Discuss here: https://g0v.hackmd.io/7LBPpu4FQAi7B3343Vb69Q


## How to Build / 怎麼把它 Build 起來

To startup the dev server, you will need NodeJS and NPM. Check [nodejs.org](https://nodejs.org) for more information.

After Nodejs is installed, run following commands:

    npm install
    npm start

Which installs required packages and start the server for you at [http://localhost:4000](http://localhost:4000).


## How to Edit / 如何編輯

[g0v.tw](https://g0v.tw) is developed with [Pug](https://pugjs.org/api/getting-started.html), [livescript](https://livescript.net) and [Stylus](https://stylus-lang.com/) as HTML/JS/CSS counterpart. Codes are built automatically on changing by [@zbryikt/template](https://github.com/zbryikt/template/), a simple frontend server. 

The folder structure basically follows `@zbryikt/template` and the location for source files and resource files:

 - `web` - all frontend stuff
   - `src` - source files
     - `pug` - all pug files
     - `ls` - all livescript files
     - `stylus` - all stylus files
   - `static` - generated / assets files
     - `assets` - images and libraries
       - `img` - image files go here


## How to Deploy / 怎麼發佈更新

Push `web/static` to `gh-pages` by following commands:

    npm run build
    npm start
    ./deploy


## LICENSE

MIT License
