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
				{setRef => {
					return (
						<>
							<div ref={setRef("foo")} />
							<div ref={setRef("foo")} />
							<div ref={setRef("bar")} />
							<div ref={setRef("bar")} />
						</>
					);
				}}
			</Collector>
		);
	}
}

export { App7 };
