import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { each } from "lodash";
import React from "react";
import { App2 } from "../src/examples/forward-ref";
import { App3 } from "../src/examples/manually-pass-ref";
import { App4 } from "../src/examples/multiple-namespaces";
import { App1 } from "../src/examples/single-namespace";
import { App5 } from "../src/examples/nested";

Enzyme.configure({ adapter: new Adapter() });

describe("Test @epranka/react-collector", () => {
	it("collects childrens", () => {
		const app = mount<App1>(<App1 />);
		const instance = app.instance();
		expect(instance.items[0].constructor.name).toEqual("Foo");
		expect(instance.items[1].constructor.name).toEqual("Bar");
	});

	it("collect children with forwarded ref", () => {
		const app = mount<App2>(<App2 />);
		const instance = app.instance();
		expect(instance.items[0].constructor.name).toEqual("Bar");
	});
	it("collect children with manually passed ref", () => {
		const app = mount<App3>(<App3 />);
		const instance = app.instance();
		expect(instance.items.length).toEqual(3);
		expect(instance.items[0].constructor.name).toEqual("HTMLDivElement");
		expect(instance.items[1].constructor.name).toEqual("HTMLSpanElement");
		expect(instance.items[2].constructor.name).toEqual(
			"HTMLParagraphElement"
		);
	});

	it("collects different childrens to their namespaces", () => {
		const app = mount<App4>(<App4 />);
		const instance = app.instance();

		expect(instance.foos.length).toEqual(2);
		each(instance.foos, node => {
			expect(node.constructor.name).toEqual("Foo");
		});
		expect(instance.bars.length).toEqual(2);
		each(instance.bars, node => {
			expect(node.constructor.name).toEqual("Bar");
		});
	});

	it("collects from nested components", () => {
		const app = mount<App5>(<App5 />);
		const instance = app.instance();
		expect(instance.foos.length).toEqual(1);
		expect(instance.foos[0].constructor.name).toEqual("Foo");
		expect(instance.bars.length).toEqual(1);
		expect(instance.bars[0].constructor.name).toEqual("Bar");
	});
});
