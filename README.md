### Installation

npm install

### Run locally

npm start

### Web AR

Ensure you are using https://localhost:8080 as it requires a secure server to grant permissions for camera on mobile devices

### Framework

For creating and subscribing to events, import the "Common/EventEmitter" class ( singleton )
Globals and Common classes can be imported as anlias rather than using absolute path e.g import Triangle from "Common/Triangle"

### GUI

We're using UIL menu npm package. You can import it from Globals and is a singleton class. You can add folders and settings globally throughout the app

### Assets

Add assets e.g textures, models etc using the queue method. Then throughout the app, use AssetManager.get( assets.myTexture ) to get the loaded file

### Future goals

Ability to switch between AR providers

Better component system for working on single entities