import { useEffect, useState } from "react";
import SignUp from "./signup";
import Login from "./login";
import { client } from "../lib/api-client";
import { getClientAuth } from "../lib/auth-client-checks";
import { authClient } from "../lib/auth-client";

type Item = {
  id: string;
  name: string;
  description: string;
  link: string;
  photoLink: string;
};

type Category = {
  name: string;
};

function Home() {
  const [items, setItems] = useState<Item[] | null>(null);

  const [category, setCategory] = useState<Category[] | null>(null);
  const [jwt, setJwt] = useState<string | undefined>(undefined);
  const [acc, setAcc] = useState<any | undefined>(undefined);

  useEffect(() => {
    async function getItems() {
      const { data } = await client.request<Item[]>("/items");
      if (data) {
        setItems(data);
      }
    }
    getItems();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    async function checkAuth() {
      const { user, isAuthenticated: authenticated } = await getClientAuth();
      const t = (await authClient.token()).data?.token;
      setJwt(t);
      setIsAuthenticated(authenticated);
      setAcc(user);
    }
    checkAuth();
  }, []);

  useEffect(() => {
    async function getCategories() {
      const { data } = await client.request<Category[]>("/categories");
      if (data) {
        setCategory(data);
      }
    }
    getCategories();
  }, []);

  return (
    <div>
      <pre>{items && JSON.stringify(items, null, 4)}</pre>
      <h1>login</h1>
      {category && <pre>{category && JSON.stringify(category, null, 4)}</pre>}

      {isAuthenticated &&
        JSON.stringify({ user: acc, token: jwt, valid: true })}
      <Login
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <h1>signup</h1>
      <SignUp />
    </div>
  );
}

export default Home;
