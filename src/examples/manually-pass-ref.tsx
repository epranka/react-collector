import React from "react";
import { Collector, collect, WithCollect } from "../Collector";

class App3 extends React.Component {
	public items: (HTMLDivElement | HTMLSpanElement | HTMLParagraphElement)[];

	constructor(props, context) {
		super(props, context);
		this.items = [];
	}

	public render() {
		return (
			<Collector collect={this.items}>
				<Foo />
				<Bar />
				<Zoo />
			</Collector>
		);
	}
}

// With classes
@collect
class Foo extends React.Component<WithCollect> {
	public render() {
		return <div ref={this.props.collect} />;
	}
}

// With functional component
const Bar = collect((props: WithCollect) => {
	return <span ref={props.collect} />;
});

// With forwarded ref (it will be ignored)
const Zoo = collect(
	React.forwardRef((props: WithCollect, _ref) => {
		return <p ref={props.collect} />;
	})
);

export { App3 };
