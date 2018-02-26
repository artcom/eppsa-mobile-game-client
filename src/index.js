import querystring from "querystring"
import React from "react"
import ReactDOM from "react-dom"

import App from "./components/app"
import Server from "./api/serverApi"
import registerServiceWorker from "./registerServiceWorker"
import content from "./Content"

const params = querystring.parse(window.location.search.substring(1))

const gitJsonApiUrl = params.gitJsonApi || ""
const wsServerUrl = params.wsServer || ""
const wsServerPath = params.wsServerPath || process.env.WS_SERVER_PATH

content.loadCmsData(gitJsonApiUrl).then(() => {
  document.title = content.data.game.name
  ReactDOM.render(
    <App
      server = { new Server(wsServerUrl, wsServerPath) }
      content = { content } />,
    document.getElementById("root")
  )
})

registerServiceWorker()
