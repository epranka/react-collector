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
				{collect => {
					return (
						<>
							<div ref={collect("foo")} />
							<div ref={collect("foo")} />
							<div ref={collect("bar")} />
							<div ref={collect("bar")} />
						</>
					);
				}}
			</Collector>
		);
	}
}

export { App7 };
