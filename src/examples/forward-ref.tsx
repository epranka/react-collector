import React from "react";
import { Collector, collect } from "../Collector";

class App2 extends React.Component {
	public items: Bar[];

	constructor(props, context) {
		super(props, context);
		this.items = [];
	}

	public render() {
		return (
			<Collector collect={this.items}>
				<Foo />
			</Collector>
		);
	}
}

// Fowarding ref
const Foo = collect(
	React.forwardRef((_props, ref) => {
		return <Bar ref={ref as any} />;
	})
);

class Bar extends React.Component {
	public render() {
		return <div />;
	}
}

export { App2 };
