import * as React from "react";

const Context = React.createContext<Collector | null>(undefined);

interface CollectorProps {
	collect: { [namespace: string]: any[] } | any[];
}

export class Collector extends React.Component<CollectorProps> {
	constructor(props: CollectorProps) {
		super(props);
		this.setRef = this.setRef.bind(this);
		this.assertProps();
	}

	private assertProps() {
		if (Array.isArray(this.props.collect)) {
			return true;
		} else if (this.props.collect && typeof this.props.collect) {
			return true;
		} else {
			throw new Error(
				`[Collector] props 'collect' must be an array or object`
			);
		}
	}

	public setRef(node: any, namespace?: string) {
		if (!node) return;
		if (Array.isArray(this.props.collect)) {
			// single namespace
			const collected = this.props.collect;
			if (!collected.includes(node)) {
				collected.push(node);
			}
		} else if (namespace) {
			// multiple namespace (must have namespace, otherwise ignoring)
			const collected = this.props.collect[namespace];
			if (!collected) return;
			if (!collected.includes(node)) {
				collected.push(node);
			}
		}
	}
	public render() {
		return (
			<Context.Provider value={this}>
				{this.props.children}
			</Context.Provider>
		);
	}
}

interface CollectorChildProps {
	namespace?: string;
	children: (arg: { ref: (node: any) => void }) => any;
}

export class Collect extends React.Component<CollectorChildProps> {
	private noop() {}
	public render() {
		return (
			<Context.Consumer>
				{collector => {
					return this.props.children({
						ref: collector
							? node =>
									collector.setRef(node, this.props.namespace)
							: this.noop
					});
				}}
			</Context.Consumer>
		);
	}
}

interface CollectComponentProps {
	Component: any;
	setRef: any;
	componentProps: any;
}
class CollectComponent extends React.Component<CollectComponentProps> {
	private refIsManuallySet: boolean = false;
	constructor(props, context) {
		super(props, context);
		this.refIsManuallySet = false;
		this.manuallyPassedRef = this.manuallyPassedRef.bind(this);
		this.selfRef = this.selfRef.bind(this);
	}

	private manuallyPassedRef(node: any) {
		this.refIsManuallySet = true;
		this.props.setRef(node);
	}

	private selfRef(node: any) {
		// do not self ref if it manually passed
		if (this.refIsManuallySet) return;
		this.props.setRef(node);
	}

	private componentIsStateless(Component) {
		return (
			typeof Component === "function" && // can be various things
			!(Component.prototype && Component.prototype.isReactComponent) // native arrows don't have prototypes // special property
		);
	}

	public render() {
		const { Component, componentProps } = this.props;
		const props: { [key: string]: any } = {
			...componentProps,
			collect: this.manuallyPassedRef
		};
		if (!this.componentIsStateless(Component)) {
			props["ref"] = this.selfRef;
		}
		return <Component {...props} />;
	}
}

const collectComponent = (namespace?: string) => Component => {
	class WrapWithContext extends React.Component {
		public render() {
			return (
				<Collect namespace={namespace}>
					{({ ref }) => {
						return (
							<CollectComponent
								Component={Component}
								componentProps={this.props}
								setRef={ref}
							/>
						);
					}}
				</Collect>
			);
		}
	}

	// TODO hoist
	return WrapWithContext as any;
	// return (props => {
	// 	return (
	// 		<Collect namespace={namespace}>
	// 			{({ ref }) => {
	// 				const manuallyRef = node => {
	// 					console.log("manually ref");
	// 					return ref(node);
	// 				};
	// 				const autoRef = node => {
	// 					console.log("auto");
	// 					return ref(node);
	// 				};
	// 				return (
	// 					// @ts-ignore
	// 					<Component
	// 						{...props}
	// 						collect={manuallyRef}
	// 						ref={autoRef}
	// 					>
	// 						{props.children}
	// 					</Component>
	// 				);
	// 			}}
	// 		</Collect>
	// 	);
	// }) as any;
};

export const collect = (namespaceOrComponent?: any) => {
	if (typeof namespaceOrComponent === "string") {
		// if it is a namespace
		return collectComponent(namespaceOrComponent);
	} else {
		// if it is a component
		return collectComponent("")(namespaceOrComponent);
	}
};

export interface WithCollect {
	collect?: any;
}
