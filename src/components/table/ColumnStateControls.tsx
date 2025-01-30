import type { AgGridReact } from "ag-grid-react";
import { FileDown, FileUp, Undo2 } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const COLUMN_STATE_KEY_PREFIX = "columnState-" as const;

export const ColumnStateControls = ({ gridRef, endPoint }: { gridRef: React.RefObject<AgGridReact>; endPoint: string }) => {
  const handlePersistColumnState = () => {
    const columnState = gridRef.current?.api.getColumnState();
    localStorage.setItem(`${COLUMN_STATE_KEY_PREFIX}${endPoint}`, JSON.stringify(columnState));
  };

  const handleLoadColumnState = () => {
    const savedState = localStorage.getItem(`${COLUMN_STATE_KEY_PREFIX}${endPoint}`);

    if (!savedState) {
      return;
    }

    const parsedState = JSON.parse(savedState);
    if (Array.isArray(parsedState)) {
      gridRef.current?.api.applyColumnState({
        state: parsedState,
        applyOrder: true,
      });
    }
  };

  const handleResetColumnState = () => {
    gridRef.current?.api.resetColumnState();
  };

  return (
    <div className="mt-2 flex flex-row items-center gap-2 justify-end">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={handlePersistColumnState} variant="outline" size="icon">
              <FileUp />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Salva stato della tabella</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={handleLoadColumnState} variant="outline" size="icon">
              <FileDown />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Carica stato della tabella</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={handleResetColumnState} variant="outline" size="icon">
              <Undo2 />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ripristina stato predefinito della tabella</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
