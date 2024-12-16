"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

interface ListTitleProps {
  title: string;
  url?: string;
}

const ListTitle = ({ title, url }: ListTitleProps) => {
  return (
    <div className="px-5 flex items-center justify-between">
      <h2 className="font-semibold">{title}</h2>

      {
        url && (
          <Link href={url}>
            <Button variant="ghost" className="text-primary p-0 hover:bg-transparent h-fit">
              Ver todos
              <ChevronRight />
            </Button>
          </Link>
        )
      }
    </div>
  )
};

export default ListTitle;
