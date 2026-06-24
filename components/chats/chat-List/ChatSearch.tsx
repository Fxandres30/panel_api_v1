"use client";

import "./ChatSearch.css";

type Props = {
  search: string;
  setSearch: (
    value: string
  ) => void;
};

export default function ChatSearch({
  search,
  setSearch,
}: Props) {

  return (

    <div className="chat-search">

      <input
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
      />

    </div>

  );

}