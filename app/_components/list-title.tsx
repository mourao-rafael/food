"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface ListTitleProps {
  title: string;
  url?: string;
}

const ListTitle = ({ title, url }: ListTitleProps) => {
  const handleClick = () => {
    window.alert('TO BE IMPLEMENTED...' + url);
  }

  return (
    <div className="px-5 flex items-center justify-between">
      <h2 className="font-semibold">{title}</h2>

      {
        url && (
          <Button variant="ghost" className="text-primary p-0 hover:bg-transparent h-fit" onClick={handleClick}>
            Ver todos
            <ChevronRight />
          </Button>
        )
      }
    </div>
  )
};

export default ListTitle;
