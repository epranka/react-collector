# API Reference

## Package exports

```js
import { Collector, collect, WithCollect } from "@epranka/react-collector";
```

| Export name                                                           | Short description                                                                                                       |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| [Collector](#collector)                                               | Root component of the collector package. Accepts a single prop **collect** which can be an array or an object of arrays |
| [collect](#collect)                                                   | Wrapper component to wrap and element to collect. Also can be used as a decorator                                       |
| [WithCollect](#withcollect-only-in-typescript) _(only in typescript)_ | Interface with an optional property **collect**                                                                         |

API Reference inspiration https://docs.veritone.com/#/apis/reference/mutation/?id=createlibrarytype

### Collector

`Collector: React.ComponentType<Props>`

Provides [React Context API](https://reactjs.org/docs/context.html) collects items to an array or arrays from the whole tree

_**Props**_<br />

`collect: any[] | {[namespace: string] : any[]}` To collect all items to a [single array](examples.md#simple-usage-at-local-level), provide an empty array. To collect elements to their specific namespaces (types) provide an object of arrays with properties as namespaces

`children: React.ReactNode | ((collect: CollectMethod) => React.ReactNode)` Provide an array of childrens (as a simple React setup) or function with `collect: CollectMethod` as an argument which can be used to [reference direct elements](examples.md#simple-usage-at-local-level). About _collect_ method [see more](#collectmethod)

```jsx
// this.items is an array or an object of arrays
<Collector collect={this.items}>{/* Childrens or function */}</Collector>
```

_See also:_<br/>
[CollectMethod](#collectmethod)

### collect

`collect: (namespace: string) => (node: T) => React.ComponentType<Props & WithCollect> | T`<br />
or</br>
`collect: (node: T) => React.ComponenType<Props & WithColect> | T`

Wraps element to collect.

If [Collector](#collector) prop **collect** is set with namespaces, firstly we must to call **collect** wrapper with namespace and then wrap component `collect(namespace: string)(component)`

If [Collector](#collector) prop **collect** is set with a single array, we just wrap component without calling with the namespace `collect(component)`

If argument _node_ is type of React Component it gets additional prop `collect: CollectMethod` which can be passed manually to [component childrens](examples.md#manually-pass-ref). About _collect_ prop [see more](#collectmethod)

This wrapper can be used also as a [decorator](examples.md#usage-with-decorator)

_See also:_<br />
[WithCollect](#withcollect-only-in-typescript), [CollectMethod](#collectmethod)

### WithCollect _(only in typescript)_

`interface WithCollect { collect?: CollectMethod }`

Interface used to extend React Component Props interface

Can be used:

-   directly

```jsx
import React from "react";
import { collect, WithCollect } from "@epranka/react-collector";

@collect
export class Foo extends React.Component<WithCollect> {}
```

-   with union operator

```jsx
import React from "react";
import { collect, WithCollect } from "@epranka/react-collector";

interface Props {
	existedProps: any;
}

@collect
export class Foo extends React.Component<Props & WithCollect> {}
```

-   with _extends_

```jsx
import React from "react";
import { collect, WithCollect } from "@epranka/react-collector";

interface Props extends WithCollect {
	existedProps: any;
}

@collect
export class Foo extends React.Component<Props> {}
```

_See also:_<br/>
[CollectMethod](#collectmethod)

## CollectMethod

`CollectMethod: <T>( namespaceOrNode: T ) => T extends string ? (node: any) => void : void`

Method is similar to [collect](#collect) wrapper, main difference is that the method is used to collect internal component elements instead the whole component.

There is a three ways to use _collect_ method:

-   _collect_ method when using [Collector](#collector)

```tsx
<Collector collect={this.items}>
	{collect => {
		return <div ref={collect} />;
	}}
</Collector>
```

-   _collect_ method when using [collect](#collect) wrapper and a class component

```tsx
@collect
class Foo extends React.Component<Props & WithCollect> {
	render() {
		return <div ref={props.collect} />;
	}
}
```

> If you use _collect_ method (in props), _collect_ method reference will be collected and no _Foo_ instance, but if you not use _collect_ method, _Foo_ instance will be collected

-   _collect_ method when using [collect](#collect) wrapper and a functional component

```tsx
const Foo = collect((props: Props & WithCollect) => {
	return <div ref={props.collect} />;
});
```

!> In functional component if you not use _collect_ method, nothing will be collected, because functional component cannot be referenced by it self

With _collect_ method you can also set a namespace similar to [collect](#collect) wrapper

-   with namespace and the [Collector](#collector)

```tsx
<Collector collect={this.items}>
	{collect => {
		return <div ref={collect("foo")} />;
	}}
</Collector>
```

-   with namespace and a class component

```tsx
@collect
class Foo extends React.Component<Props & WithCollect> {
	render() {
		return <div ref={props.collect("foo")} />;
	}
}
```

-   with namespace and a functional component

```tsx
const Foo = collect((props: Props & WithCollect) => {
	return <div ref={props.collect("foo")} />;
});
```

!> When using [collect](#collect) wrapper and the _collect_ method do not set different namespaces twice. The following examples throws an error

```tsx
const Foo = collect("foo")((props: Props & WithCollect) => {
	return <div ref={props.collect("bar")} />;
});

or;

@collect("foo")
class Foo extends React.Component<Props & WithCollect> {
	render() {
		return <div ref={props.collect("bar")} />;
	}
}
```

_See also:_<br/>
[Collector](#collector), [collect](#collect), [WithCollect](#withcollect-only-in-typescript)
