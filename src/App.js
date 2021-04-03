import './App.css';
import { Graph } from "react-d3-graph";
import config from './data-structure.json'

function App() {
  const data = { nodes: [], links: [] }
  
  // the graph configuration, just override the ones you need
  const myConfig = {
    nodeHighlightBehavior: true,
    node: {
      color: "lightgreen",
      size: 120,
      highlightStrokeColor: "blue",
    },
    link: {
      highlightColor: "lightblue",
    },
  };
  
  const onClickNode = function(nodeId) {
    window.alert(`Clicked node ${nodeId}`);
  };
  
  const onClickLink = function(source, target) {
    window.alert(`Clicked link between ${source} and ${target}`);
  };

  const addNewNode = (name) => {
    data.nodes.push({id: name})
  }
  const addNewLink = (source, target) => {
    data.links.push({ source: source, target:target })
  }

  config.forEach(item => {
    item?.name && addNewNode(item?.name)

    item?.fields?.length && item.fields.forEach(field => {
      field?.name && addNewNode(field?.name)
    })
  })

  config.forEach(item => {
    item?.fields?.length && item.fields.forEach(field => {
      addNewLink(item?.name, field?.name)
      if (field?.name && field?.relationship && data.nodes.filter(({ id }) => id === field?.relationship).length)
        addNewLink(field?.name, field?.relationship)
     
    })
  })

  return (
    <div className="App">
      <Graph
        id="graph-id" // id is mandatory
        data={data}
        config={myConfig}
        onClickNode={onClickNode}
        onClickLink={onClickLink}
      />
    </div>
  );
}

export default App;
