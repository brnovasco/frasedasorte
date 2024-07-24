import Link from "next/link";
import { MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const links = [
  { href: "/", label: "Nova Frase" },
  { href: "/history", label: "Histórico" },
];

export default function AppMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MenuIcon size={24} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-secondary">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            <DropdownMenuItem>{link.label}</DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
