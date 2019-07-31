# Examples

## Simple usage at local level

This examples shows how to collect multiple elements to a single array

```jsx
import React, { Component } from "react";
import { Collector, collect } from "@epranka/react-collector";

class App extends Component {
	items = [];

	componentDidMount() {
		console.log(this.items); // Shows collected div elements
	}

	render() {
		// There we will set the array to collect all items to it
		return (
			<Collector collect={this.items}>
				{collect => {
					return (
						<div>
							<div ref={collect} />
							<div ref={collect} />
						</div>
					);
				}}
			</Collector>
		);
	}
}
```

## Usage with namespaces at local level

This examples shows how to collect multiple elements to a different arrays

```jsx
import React from "react";
import { Collector } from "@epranka/react-collector";

class App extends React.Component {
	foos = [];
	bars = [];

	componentDidMount() {
		console.log(this.foos); // Shows collected elements with classnames "foo"
		console.log(this.bars); // Shows collected elements with classnames "bar"
	}

	render() {
		// There we will set multiple arrays. Object keys is a namespaces
		return (
			<Collector collect={{ foo: this.foos, bar: this.bars }}>
				{collect => {
					/*
					We will call the collect method before the passing it to the reference.
					In this way we will set the namespace for the reference
					*/
					return (
						<>
							<div className="foo" ref={collect("foo")} />
							<div className="foo" ref={collect("foo")} />
							<div className="bar" ref={collect("bar")} />
							<div className="bar" ref={collect("bar")} />
						</>
					);
				}}
			</Collector>
		);
	}
}
export { App };
```

> For more information about **collect method** see [API reference](api.md#collectmethod)

## Usage with **collect**

This example shows how to collect elements using wrapper component **collect**

```jsx
import React from "react";
import { Collector, collect } from "@epranka/react-collector";

class App extends React.Component {
	items = [];

	componentDidMount() {
		console.log(this.items); // Shows collected Foo references
	}

	render() {
		return (
			<Collector collect={this.items}>
				<WrappedFoo />
				<WrappedFoo />
			</Collector>
		);
	}
}

class Foo extends React.Component {
	render() {
		return <div />;
	}
}
const WrappedFoo = collect(Foo);
```

> To use it with namespaces just set namespace by calling **collect** before the component wrap. For more information see [API reference](api.md#collect)

```jsx
const WrappedFoo = collect("foo")(Foo); // 'foo' there is a namespace
```

## Usage with decorator

This example shows how to collect elements using decorator. Is the same example as an [above](#usage-with-collect), but using **collect** as a decorator

```jsx
import React from "react";
import { Collector, collect } from "@epranka/react-collector";

class App extends React.Component {
	items = [];

	componentDidMount() {
		console.log(this.items); // Shows collected Foo references
	}

	render() {
		return (
			<Collector collect={this.items}>
				<Foo />
				<Foo />
			</Collector>
		);
	}
}

@collect
class Foo extends React.Component {
	render() {
		return <div />;
	}
}
```

> To set a namespace, call a decorator. For more information see [API reference](api.md#collect)

```jsx
@collect("foo") // 'foo' there is a namespace
class Foo extends React.Component {
	render() {
		return <div />;
	}
}
```

## Usage with functional component

This examples shows how to reference a functional component

```jsx
import React from "react";
import { Collector, collect } from "@epranka/react-collector";

class App extends React.Component {
	items = [];

	componentDidMount() {
		console.log(this.items); // Shows collected elements with classnames "foo"
	}

	render() {
		return (
			<Collector collect={this.items}>
				<Foo />
				<Foo />
			</Collector>
		);
	}
}

const Foo = collect(props => {
	// Components wrapped with collect, has a reference method "collect" in props
	return <div className="foo" ref={props.collect} />;
});
```

> To set namespace call "collect" before. For more information see [API reference](api.md#collect)

```jsx
// 'foo' there is a namespace
const Foo = collect("foo")(props => {
	return <div className="foo" ref={props.collect} />;
});
```

or

```jsx
const Foo = collect(props => {
	// 'foo' there is a namespace
	return <div className="foo" ref={props.collect("foo")} />;
});
```

!> Do not set different namespaces twice

```jsx
const Foo = collect("foo")(props => {
	// throws error because of different namespace 'bar'
	return <div className="foo" ref={props.collect("bar")} />;
});
```

## Nested levels

This examples shows how is simple to collect elements in react tree without [prop drilling](https://kentcdodds.com/blog/prop-drilling)

```jsx
// index.jsx

import React from "react";
import { Nested } from "./Nested";
import { Collector } from "@epranka/react-collector";

class App extends React.Component {
	foos = [];
	bars = [];

	componentDidMount() {
		console.log(this.foos); // Shows collected Foo references
		console.log(this.bars); // Shows collected Bar references
	}

	render() {
		return (
			<Collector collect={{ foo: this.foos, bar: this.bars }}>
				<Nested />
			</Collector>
		);
	}
}
```

```jsx
// nested.jsx

import React from "react";
import { Foo } from "./Foo";
import { Bar } from "./Bar";

export class Nested extends React.Component {
	render() {
		return (
			<>
				<Foo />
				<Bar />
			</>
		);
	}
}
```

!> Do not forget namespace if <Collector /> was set with namespaces, see [Usage with namespaces at local level](#usage-with-namespaces-at-local-level)

```jsx
// Foo.jsx

import React from "react";
import { collect } from "@epranka/react-collector";

@collect('foo');
export class Foo extends React.Compnent {
	render() {
		return <div />;
	}
}
```

```jsx
// Bar.jsx

import React from "react";
import { collect } from "@epranka/react-collector";

@collect("bar")
export class Bar extends React.Compnent {
	render() {
		return <div />;
	}
}
```

## Manually pass ref

This example is very similar to an [above](#usage-with-functional-component) but there instead functional component we will use a class component. And we will pass a reference to inner component

```jsx
import React from "react";
import { Collector, collect } from "@epranka/react-collector";

class App extends React.Component {
	items = [];

	componentDidMount() {
		console.log(this.items); // Shows collected elements with classnames "foo"
	}

	render() {
		return (
			<Collector collect={this.items}>
				<WrappedFoo />
				<WrappedFoo />
			</Collector>
		);
	}
}

@collect
class Foo extends React.Component {
	render() {
		/* 
        If we passing "collect" prop to inner component, reference will be inner element.
        If we do not use "collect" prop, reference will be whole Foo component as an examples above
        */
		return <div className="foo" ref={this.props.collect} />;
	}
}
```

> Typescript version. For more information see [API reference](api.md#withcollect-only-in-typescript)

```tsx
import { Collector, collect, WithCollect } from "@epranka/react-collector";

@collect
class Foo extends React.Component<WithCollect> {
	render() {
		/* 
        If we passing "collect" prop to inner component, reference will be inner element.
        If we do not use "collect" prop, reference will be whole Foo component as an examples above
        */
		return <div className="foo" ref={this.props.collect} />;
	}
}
```

## Forwarding ref

This examples show how to use **collect** wrapper with [React.forwardRef](https://reactjs.org/docs/forwarding-refs.html)

```jsx
import React from "react";
import { Collector, collect } from "@epranka/react-collector";

class App extends React.Component {
	items = [];

	componentDidMount() {
		console.log(this.items); // Shows collected elements with classnames "foo"
	}

	render() {
		return (
			<Collector collect={this.items}>
				<Foo />
				<Foo />
			</Collector>
		);
	}
}

const Foo = collect(
	React.forwardRef((_props, ref) => {
		return <div className="foo" ref={ref} />;
	})
);
```

> But you can do the same with **collect**. For more information see example above [Usage with functional component](#usage-with-functional-component)

```jsx
const Foo = collect(props => {
	return <div className="foo" ref={props.collect} />;
});
```

> For more details checkout the [API reference](api.md#collect)
