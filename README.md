This repository is a part of the [ChatEngine Framework](https://github.com/pubnub/chat-engine).
For more information on building chat applications with PubNub, see our
[Chat Resource Center](http://www.pubnub.com/developers/chat-resource-center/).

# Online User Search Plugin for ChatEngine

Adds the ability to search for currently online users on a ChatEngine Chat

### Quick Start

0. Have a ChatEngine server running already, instantiate a client and connect it
```js
const ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-key-here',
    subscribeKey: 'sub-key-here'
};

ChatEngine.connect('Username');
ChatEngine.on('$ready', () = { ... });
```

1. Attach this plugin to the channel you want, in this case global
```js
ChatEngine.global.plugin(ChatEngineCore.plugin['chat-engine-online-user-search']());
```

2. Query the channel for a search term
```js
// returns all users with uuid's containing 'foo'
ChatEngine.global.onlineUserSearch.search('foo');
```

## Support

- If you **need help**, have a **general question**, have a **feature request** or to file a **bug**, contact <support@pubnub.com>.
