import React from "react";
import { Collector } from "../Collector";

class App7 extends React.Component {
	public foos: HTMLDivElement[];
	public bars: HTMLDivElement[];

	constructor(props, context) {
		super(props, context);
		this.foos = [];
		this.bars = [];
	}

	public render() {
		return (
			<Collector collect={{ foo: this.foos, bar: this.bars }}>
				{ref => {
					return (
						<>
							<div ref={ref("foo")} />
							<div ref={ref("foo")} />
							<div ref={ref("bar")} />
							<div ref={ref("bar")} />
						</>
					);
				}}
			</Collector>
		);
	}
}

export { App7 };
