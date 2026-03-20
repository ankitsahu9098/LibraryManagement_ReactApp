import { nanoid } from "nanoid";
import { Button } from "../buttons";

interface Column<T> {
  field?: keyof T;
  header?: string;
  actions?: {
    caption: string;
    onClick: (row: T) => void;
  }[];
  buttonCaption?: string;
}

interface GridProps<T> {
  data: T[];
  columns: Column<T>[];
}

export function Grid<T>(props: GridProps<T>) {
  return (
    <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
      <thead className="bg-blue-500 text-white">
        <tr>
          {props.columns.map((c) => (
            <th key={nanoid()} className="px-6 py-3 text-left">
              {c.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white">
        {props.data.map((item) => {
          return (
            <tr key={nanoid()} className="border-b hover:bg-gray-100">
              {props.columns.map((c) => {
                if (c.field) {
                  const v = item[c.field as keyof T];
                  return <td key={nanoid()} className="px-6 py-3">{v as string}</td>;
                }
                if (c.actions) {
                  return (
                    <td key={nanoid()} className="px-6 py-3">
                      <div className="flex gap-2">
                        {c.actions.map((action, index) => (
                          <Button
                            key={index}
                            caption={action.caption}
                            type="button"
                            onClick={() => action.onClick(item)}
                          />
                        ))}
                      </div>
                    </td>
                  );
                }
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
