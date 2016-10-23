# adzialocha.github.io

It's the github home of [andreasdzialocha.com](https://andreasdzialocha.com), based on a custom simple static page generator backed by node, gulp, scss, es6, nunjucks and markdown.

## Development

Run the following commands to bootstrap the development environment:

```
git clone git@github.com:adzialocha/adzialocha.github.io.git
cd adzialocha.github.io
npm install
```

Open your browser on [localhost:4000](http://localhost:4000) after you started the local server via:

    gulp serve

Use this task to clear all generated files for production-use:

    gulp clean

## Deployment

Just use the default gulp task and push the whole folder to your server.

```
gulp

# push it to master

git add .
git commit -m "My new homepage"
git push
```
