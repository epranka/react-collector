## @epranka/react-collector

> Simple and flexible way to reference react components

## What it is

react-collector lets you to reference multiple react components along the whole tree. Using the [React.createRef()](https://reactjs.org/docs/refs-and-the-dom.html) or other standard method you can reference only one component, but problem occurs when you want to reference array of components, for example rendered components with [map()](https://reactjs.org/docs/lists-and-keys.html). But this is just one scenario out of many, so check it out the full power.

See the [Quick start](quickstart.md) guide for more details.

## Features

-   Reference deeply nested components using the [React Context API](https://reactjs.org/docs/context.html)
-   Reference array of components
-   Reference different kind of components to their namespaces (arrays)
-   Decorator [@collect](examples.md#usage-with-decorator) to simplify and shorten code writing.
-   Only one dependency ([hoist-non-react-statics](https://github.com/mridgway/hoist-non-react-statics))
-   Typescripted

## Examples

Checkout the examples of usage in [examples page](examples.md)

## API Reference

Checkout the [api reference](api.md) of detail usage information

## Contributing

-   Fork it!
-   Create your feature branch: git checkout -b my-new-feature
-   Commit your changes: git commit -am 'Add some feature'
-   Push to the branch: git push origin my-new-feature
-   Submit a pull request

## Author

If you have questions, feel free to contact

-   Edvinas Pranka
-   Twitter: [@epranka](https://twitter.com/epranka)
-   Email: [epranka@gmail.com](mailto:epranka@gmail.com)
-   Website: [www.kodmina.lt](https://www.kodmina.lt)
