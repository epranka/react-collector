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

```jsx
import React, {Component} from 'react';
import {Collector, collect} from '@epranka/react-collector';

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

## Simple usage with hook

```jsx
    import {useCollector} from '@epranka/react-collector';
    
    const App = (props) => {
        const [collect, items] = useCollector();

        useEffect(() => {
            console.log(items); // Shows collected div elements
        });

        return <div>
            <div ref={collect} />
            <div ref={collect} />
        </div>
    }
```

> Next checkout the [examples](examples.md)