# Quick start

Install package using npm 

```bash
npm i --save @epranka/react-collector
```

or yarn

```bash
yarn add @epranka/react-collector
```

## Simple usage

```tsx
import React, {Component} from 'react';
import {Collector} from '@epranka/react-collector';

class App extends Component {
    items = [];

    componentDidMount() {
        console.log(this.items); // Shows collected div elements
    }

    render() {
        return <Collector collect={this.items}>
            {ref => {
                return <div>
                    <div ref={ref} />
                    <div ref={ref} />
                </div>
            }}
        </Collector>
    }
}
```

## Package exports

