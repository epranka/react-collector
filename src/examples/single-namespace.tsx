import React from "react";
import { Collector, collect } from "../Collector";

class App1 extends React.Component {
	public items: (Foo | Bar)[];

	constructor(props, context) {
		super(props, context);
		this.items = [];
	}

	public render() {
		return (
			<Collector collect={this.items}>
				<Foo />
				<WrappedBar />
			</Collector>
		);
	}
}

// Testing with decorator
@collect
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
const WrappedBar = collect(Bar);

export { App1 };
