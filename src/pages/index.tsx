import { Auth } from "@supabase/ui";
import { useCallback, useEffect, useState } from "react";
import { Title, TitleList } from "src/components/TitleList";
import { getTitles } from "src/libs/supabase";
import Head from "next/head";
import Image from "next/image";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Home = () => {
  const { user } = Auth.useUser();
  const [text, setText] = useState<string>("");
  const [titles, setTitles] = useState<Title[]>([]);
  const getTitleList = useCallback(async () => {
    const data = await getTitles();
    setTitles(data);
  }, [setTitles]);

  useEffect(() => {
    getTitleList();
  }, [getTitleList]);

  return (
    <>
      <div className="flex justify-center gap-2 p-4">
        <input 
          className="w-full h-12 px-4 bg-white border border-gray-300 rounded shadow appearance-none hover:border-gray-700"
          placeholder="Filtering text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      {user && (
        <TitleList 
          titles={titles}
          uuid={user.id}
          getTitleList={getTitleList}
          filterText={text}
        />
      )}
    </>
  );
};

export default Home;
