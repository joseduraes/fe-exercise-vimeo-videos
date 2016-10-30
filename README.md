# fe-exercise-vimeo-videos
Coding exercise for a job application to a Frontend Developer position.

It consists of a web page that displays the results of a JSON response from a [Vimeo's](http://vimeo.com/) Developer API call, representing a list of videos and associated data.

It also allows simple search, filtering and pagination functionality over the response.

Per the the exercise's requirements,
the operations are performed offline over a mock response obtained from a sample API call to https://api.vimeo.com/channels/top/videos?page=1&per_page=50&sort=likes&direction=desc.

Additionaly, support was implemented for performing requests to the actual Vimeo [Developer's API](https://developer.vimeo.com/api/start).

# Installing & Running

Requirements:
* A jazz record playing in the background. May i suggest _Kind of Blue_ by _Miles Davis_?
* [npm](https://npmjs.com)
* [yarn](https://github.com/yarnpkg/yarn). Make sure it is installed:

    ```bash
    npm install -g yarn
    ```
Install the dependencies:

```bash
yarn install
```

Start the development server:

```bash
yarn start
```

Open the page in the browser (default port is 8080).

You should be all set. Point, click, type, do your thing.