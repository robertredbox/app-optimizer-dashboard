
import { cn } from "@/lib/utils";
import React from "react";

interface Column {
  key: string;
  label: string;
  render?: (value: any, item: any) => React.ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  className?: string;
}

const DataTable = ({ data, columns, className }: DataTableProps) => {
  return (
    <div className={cn("w-full overflow-x-auto animate-fade-in", className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-secondary/50">
            {columns.map((column) => (
              <th 
                key={column.key} 
                className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((item, index) => (
            <tr 
              key={index}
              className="border-b border-secondary/80 hover:bg-secondary/20 transition-colors"
            >
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-2.5 text-sm">
                  {column.render ? column.render(item[column.key], item) : item[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
