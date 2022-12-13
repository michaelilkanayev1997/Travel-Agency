/* eslint-disable no-unused-vars */
import React from "react";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "./Firebase";

export default function StoreChildren({ path }) {
  const query = collection(db, path);
  const [docs, loading, error] = useCollectionData(query);

  return (
    <ul>
      {loading && "Loading..."}

      {docs?.map((doc) => (
        <li key={Math.random}>{doc.name}</li>
      ))}
    </ul>
  );
}
