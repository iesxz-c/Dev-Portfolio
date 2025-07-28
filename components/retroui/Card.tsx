import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Card = ({ className, ...props }: ICardProps) => {
  return (
    <div
      className={cn(
        "inline-block rounded-xl border border-white/10 bg-glass shadow-lg backdrop-blur-md transition-all hover:shadow-xl",
        className
      )}
      {...props}
    />
  );
};

const CardHeader = ({ className, ...props }: ICardProps) => {
  return (
    <div className={cn("flex flex-col justify-start p-4", className)} {...props} />
  );
};

const CardTitle = ({ className, ...props }: ICardProps) => {
  return (
    <h3
      className={cn("mb-2 text-white text-lg font-semibold tracking-tight", className)}
      {...props}
    />
  );
};

const CardDescription = ({ className, ...props }: ICardProps) => (
  <p className={cn("text-white/70 text-sm", className)} {...props} />
);

const CardContent = ({ className, ...props }: ICardProps) => {
  return <div className={cn("p-4", className)} {...props} />;
};

const CardComponent = Object.assign(Card, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
});

export { CardComponent as Card };
