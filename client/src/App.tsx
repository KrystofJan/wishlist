import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState<any | null>(0);

  useEffect(() => {
    async function getItems() {
      const res = await fetch("http://localhost:3000/items");
      const body = await res.json();
      setItems(body);
    }
    getItems();
  }, [items]);

  return <pre>{items && JSON.stringify(items, null, 4)}</pre>;
}

export default App;
