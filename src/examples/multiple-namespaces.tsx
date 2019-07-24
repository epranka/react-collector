import React from "react";
import { Collector, collect } from "../Collector";

class App4 extends React.Component {
	public foos: Foo[];
	public bars: Bar[];

	constructor(props, context) {
		super(props, context);
		this.foos = [];
		this.bars = [];
	}

	public render() {
		return (
			<Collector collect={{ foo: this.foos, bar: this.bars }}>
				<Foo />
				<Foo />
				{/* Simple <Bar /> will be ignored, only <WrappedBar /> will be collected */}
				<Bar />
				<Bar />
				<WrappedBar />
				<WrappedBar />
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

// This item will be ignored
@collect("zoo")
class Zoo extends React.Component {
	public render() {
		return <div />;
	}
}

export { App4 };
