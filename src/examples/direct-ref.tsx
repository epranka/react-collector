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
				{collect => {
					return (
						<>
							<div ref={collect} />
							<div ref={collect} />
						</>
					);
				}}
			</Collector>
		);
	}
}

export { App1 };
