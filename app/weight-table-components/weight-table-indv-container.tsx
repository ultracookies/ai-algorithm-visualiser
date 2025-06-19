"use client";

import WeightTable, { WeightTableProps } from "./weight-table";

export default function WeightTableContainer({ weights }: WeightTableProps) {
  return (
    <div className="mx-auto flex max-w-200 items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
      <WeightTable weights={weights} />
    </div>
  );
}
