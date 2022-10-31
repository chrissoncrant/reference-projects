# Proxy Objects

[source](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

## Terms
- Proxy
    - This is a stand in for another object
- Target
    - The object to be wrapped by the Proxy
- Handler
    - The object that defines the methods to be performed.
- Intercept
    - Intercepts are performed within the the traps defined within the handler object.
- Redefine
- Reflect

## Characteristics
- Proxy objects have no properties of their own. 
- Without traps, which are defined within the handler object, there really is no point in having a proxy object. 

## Thoughts
Proxy objects are a form of outer layer of object that controls access to the internal layer (the target object; the object that is wrapped). It is like the outer layer of a cell. Perhaps like a secretary for the object, a buffer zone, a cushion for the target object.

The Proxy obejct requires a target at the very least. It can also take in a 'handler' which tells the proxy how to handle incoming requests in the form of property and method calls. 

Within the handler object are 'traps'; property and method calls are 'trapped' within this layer and handled. 