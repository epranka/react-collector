import React from "react";
import { collect, Collector, WithCollect } from "../Collector";

class App5 extends React.Component {
	public foos: Foo[];
	public bars: Bar[];
	public bazs: HTMLDivElement[];

	constructor(props, context) {
		super(props, context);
		this.foos = [];
		this.bars = [];
		this.bazs = [];
	}

	public render() {
		return (
			<Collector
				collect={{ foo: this.foos, bar: this.bars, baz: this.bazs }}
			>
				<Foo />
				<Foo />
				{/* Simple <Bar /> will be ignored, only <WrappedBar /> will be collected */}
				<Bar />
				<Bar />
				<WrappedBar />
				<WrappedBar />
				<Baz />
				<Baz2 />
				<Zoo />
				<Zoo />
			</Collector>
		);
	}
}

// Testing with decorator
@collect("foo")
class Foo extends React.Component {
	public render() {
		return <div />;
	}
}

// Testing with wrapper
class Bar extends React.Component {
	public render() {
		return <div />;
	}
}

const WrappedBar = collect("bar")(Bar);

// Testing with functional component and set namespace to whole component
const Baz = collect("baz")((props: WithCollect) => {
	return <div ref={props.collect} />;
});

// Testing with functional component and set namespace after wrapping
const Baz2 = collect((props: WithCollect) => {
	return <div ref={props.collect("baz")} />;
});

// This item will be ignored
@collect("zoo")
class Zoo extends React.Component {
	public render() {
		return <div />;
	}
}

export { App5 };

