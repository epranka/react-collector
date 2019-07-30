import React from "react";
import { Collector } from "../Collector";

class App1 extends React.Component {
	public items: HTMLDivElement[];

	constructor(props, context) {
		super(props, context);
		this.items = [];
	}

	public render() {
		return (
			<Collector collect={this.items}>
				{ref => {
					return (
						<>
							<div ref={ref} />
							<div ref={ref} />
						</>
					);
				}}
			</Collector>
		);
	}
}

export { App1 };
