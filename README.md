![alt text](https://user-images.githubusercontent.com/4989948/96711934-3cbd6780-1396-11eb-92d6-1a3f3fde7cdb.png)

### Installation

npm install

### Run locally

npm start

### Framework

For creating and subscribing to events, import the "Common/EventEmitter" class ( singleton )
Globals and Common classes can be imported as an alias rather than using an absolute path e.g import Triangle from "Common/Triangle"

### GUI

We're using UIL menu npm package. You can import it from Globals and is a singleton class. You can add folders and settings globally throughout the app

### Assets

Add assets e.g textures, models etc using the queue method. Then throughout the app, use AssetManager.get( assets.myTexture ) to get the loaded file

