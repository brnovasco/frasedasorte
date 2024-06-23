import Link from "next/link";
import { MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AppMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MenuIcon size={24} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuItem>
          <Link href="/">Nova Frase</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/history">Histórico</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
