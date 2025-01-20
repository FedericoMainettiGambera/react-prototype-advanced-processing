import type { PropsWithChildren } from "react";

export const DataRow = ({
  title,
  children,
}: {
  title: string;
} & PropsWithChildren) => {
  return (
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
      <div className="text-sm font-medium">{title}</div>
      <div className="mt-1 text-sm/6 text-muted-foreground sm:col-span-2 sm:mt-0">{children ?? "-"}</div>
    </div>
  );
};
