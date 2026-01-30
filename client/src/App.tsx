import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState<{
    id: string;
    name: string;
    description: string;
    link: string;
    photoLink: string;
  } | null>(null);
  console.log("asd");

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
