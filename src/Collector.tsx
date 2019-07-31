import * as React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";

// Create Context using React Context API
const Context = React.createContext<Collector | null>(undefined);

// Define collect method type
type CollectMethod = <T>(
	namespaceOrNode: T
) => T extends string ? (node: any) => void : void;

interface CollectorProps {
	/** To collect all items to a single array, provide an empty array. To collect elements to their specific namespaces (types) provide an object of arrays with properties as namespaces */
	collect: { [namespace: string]: any[] } | any[];
	/** Provide an array of childrens (as a simple React setup) or function with collect: CollectMethod as an argument which can be used to reference direct elements */
	children: React.ReactNode | ((collect: CollectMethod) => React.ReactNode);
}

/**
 * Provides React Context API collects items to an array or arrays from the whole tree
 *
 * @export
 * @class Collector
 * @extends {React.Component<CollectorProps>}
 */
export class Collector extends React.Component<CollectorProps> {
	constructor(props: CollectorProps) {
		super(props);

		// context bindings
		this.collectMethod = this.collectMethod.bind(this);
		this.setRef = this.setRef.bind(this);

		// assert props
		this.assertProps();
	}

	private assertProps() {
		// props collect must be an array or an object
		if (Array.isArray(this.props.collect)) {
			return true;
		} else if (this.props.collect && typeof this.props.collect) {
			return true;
		} else {
			throw new Error(
				`[Collector] props 'collect' must be an array or an object`
			);
		}
	}

	public setRef(node: any, namespace?: string): void {
		// if no node, ignore
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
			if (!collected) {
				if (process.env.NODE_ENV === "development") {
					console.warn(
						`[Collector] namespace '${namespace}' not defined in 'collect' object or namespace value is not array. Initialize namespace value as array first.`
					);
				}
				return;
			}
			if (!collected.includes(node)) {
				collected.push(node);
			}
		}
	}

	// collect method
	public collectMethod<T>(namespaceOrNode: T) {
		if (typeof namespaceOrNode === "string") {
			return (node: any) => {
				this.setRef(node, namespaceOrNode);
			};
		} else {
			return this.setRef(namespaceOrNode);
		}
	}

	public render() {
		return (
			<Context.Provider value={this}>
				{typeof this.props.children === "function"
					? (this.props.children as any)(this.collectMethod) // ignore linting
					: this.props.children}
			</Context.Provider>
		);
	}
}

interface CollectComponentProps {
	namespace: string;
	Component: React.ComponentType;
	collect: CollectMethod;
	componentProps: any;
}
class CollectComponent extends React.Component<CollectComponentProps> {
	private refIsManuallySet: boolean = false;
	constructor(props, context) {
		super(props, context);
		this.refIsManuallySet = false;
		this.collectMethod = this.collectMethod.bind(this);
		this.selfRef = this.selfRef.bind(this);
	}

	private collectMethod(namespaceOrNode: string | any) {
		this.refIsManuallySet = true;
		if (typeof namespaceOrNode === "string") {
			if (
				this.props.namespace &&
				this.props.namespace !== namespaceOrNode
			) {
				throw new Error(
					`[Collector] namespace '${
						this.props.namespace
					}' already set. Tried to override '${
						this.props.namespace
					}' with '${namespaceOrNode}'`
				);
			}
			return (node: any) => {
				this.props.collect(namespaceOrNode)(node);
			};
		} else if (this.props.namespace) {
			this.props.collect(this.props.namespace)(namespaceOrNode);
		} else {
			return this.props.collect(namespaceOrNode);
		}
	}

	private selfRef(node: any) {
		// do not self ref if it manually passed
		if (this.refIsManuallySet) return;
		if (this.props.namespace) {
			this.props.collect(this.props.namespace)(node);
		} else {
			this.props.collect(node);
		}
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
			collect: this.collectMethod
		};
		// if component is functional set self ref
		if (!this.componentIsStateless(Component)) {
			props["ref"] = this.selfRef;
		}
		return <Component {...props} />;
	}
}

const collectComponent = (namespace?: string) => (
	Component: React.ComponentType
) => {
	class WrapWithContext extends React.Component {
		private noop() {
			return () => undefined;
		}
		public render() {
			return (
				<Context.Consumer>
					{collector => {
						return (
							<CollectComponent
								namespace={namespace}
								Component={Component}
								componentProps={this.props}
								collect={
									collector
										? (collector.collectMethod as any)
										: this.noop
								}
							/>
						);
					}}
				</Context.Consumer>
			);
		}
	}

	hoistNonReactStatics(WrapWithContext, Component);
	return WrapWithContext as any;
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
