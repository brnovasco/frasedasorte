import Link from "next/link";
import { buttonVariants, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
  children: React.ReactNode;
};

const ButtonLink = ({
  href,
  className,
  children,
  ...props
}: ButtonLinkProps) => (
  <Link
    href={href}
    className={cn(
      buttonVariants({
        variant: props.variant ?? "default",
        size: props.size ?? "default",
        className,
      })
    )}
  >
    {children}
  </Link>
);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center m-auto w-1/3 border border-1 p-8 rounded-md">
        <h1 className="text-3xl font-bold m-8">
          Frase<span className="text-accent">DaSorte</span>
        </h1>
        <div className="items-center justify-center flex flex-col gap-2">
          <ButtonLink href="/novo" className="w-full">
            Novo Jogo
          </ButtonLink>
          <ButtonLink
            href="/meusjogos"
            variant={"secondary"}
            className="w-full"
          >
            Meus Jogos
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}
