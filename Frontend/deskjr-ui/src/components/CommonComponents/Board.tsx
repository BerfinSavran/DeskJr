import TopContents from "./TopContents";
import DataTable from "./DataTable";

interface BoardProps {
  hasDataTable?: boolean;
  items?: any[] | null;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  isEditable?: (item: any) => boolean;
  isDeletable?: (item: any) => boolean;
  hiddenColumns?: string[];
  renderColumn?: (column: string, value: any) => JSX.Element | string;
  columnNames?: { [key: string]: string };
  hasNewRecordButton?: boolean;
  newRecordButtonOnClick?: () => void;
  newRecordModalDataTarget?: string;
  hideActions?: string;
  customElementOfActions?: (item: any) => JSX.Element;
  customColumnOfActions?: (item: any) => JSX.Element;
  leftTopContent?: React.ReactNode;
  rightTopContent?: React.ReactNode;
}

function Board({
  hasDataTable = true,
  items,
  onEdit,
  onDelete,
  isEditable,
  isDeletable,
  hiddenColumns,
  renderColumn,
  columnNames,
  hasNewRecordButton,
  newRecordButtonOnClick,
  newRecordModalDataTarget,
  hideActions = "false",
  customElementOfActions,
  customColumnOfActions,
  leftTopContent,
  rightTopContent,
}: BoardProps) {
  const renderedItems = items ?? [];

  return (
    <>
      <TopContents
        hasNewRecordButton={hasNewRecordButton}
        newRecordButtonOnClick={newRecordButtonOnClick}
        dataTarget={newRecordModalDataTarget}
        leftContent={leftTopContent}
        rightContent={rightTopContent}
      />
      {hasDataTable ? (
        <DataTable
          items={renderedItems}
          onEdit={onEdit}
          onDelete={onDelete}
          isEditable={isEditable}
          isDeletable={isDeletable}
          hiddenColumns={hiddenColumns}
          renderColumn={renderColumn}
          dataTarget={newRecordModalDataTarget}
          columnNames={columnNames}
          hideActions={hideActions}
          customElementOfActions={customElementOfActions}
          customColumnOfActions={customColumnOfActions}
        />
      ) : (
        []
      )}
    </>
  );
}

export default Board;
