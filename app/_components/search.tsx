"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import React from "react";
import { useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter();
  const [search, setSearch] = React.useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!search || !search.length) {
      return;
    };

    router.push(`/restaurants?search=${search}`);
  }

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <Input placeholder="Search restaurants" className="border-none" onChange={handleChange} value={search} />
      <Button size="icon" type="submit">
        <SearchIcon size={20} />
      </Button>
    </form>
  )
};

export default Search;
