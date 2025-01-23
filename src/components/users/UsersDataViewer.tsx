import { useSubjectslogQuery } from "@/api/query/useSubjectslogQuery";
import { useState } from "react";
import { Input } from "../ui/input";

export default function UsersDataViewer() {
  const [limit, setLimit] = useState(100);
  const [offset, setOffset] = useState(0);

  const usersDataQuery = useSubjectslogQuery({
    filters: {
      name1: "",
      name2: "",
    },
    pagination: {
      limit: limit,
      offset: offset,
    },
  });

  return (
    <div className="h-[400px]">
      <div>
        <span>limit:</span>
        <Input
          value={limit}
          type="number"
          onChange={e => {
            const newLimit = parseInt(e.target.value);
            if (newLimit) {
              setLimit(newLimit);
            }
          }}
        />
      </div>
      <div>
        <span>Offset:</span>
        <Input
          value={offset}
          type="number"
          onChange={e => {
            const newOffset = parseInt(e.target.value);
            if (newOffset) {
              setOffset(newOffset);
            }
          }}
        />
      </div>
      <pre className="border border-red-500">
        {JSON.stringify(
          {
            limit,
            offset,
          },
          null,
          2
        )}
      </pre>
      {usersDataQuery.isFetching && <div>Caricamento</div>}
      <pre>{JSON.stringify(usersDataQuery.data?.items, null, 2)}</pre>
    </div>
  );
}
