import { useRef } from "react";
import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.full.css";
import { registerAllModules } from "handsontable/registry";

//register HandonTable modules
registerAllModules();

const tableSettings = {
  columns: [
    {
      data: "enabled",
      type: "checkbox",
      disableVisualSelection: true,
      width: 20,
    },
    {
      data: "value",
      type: "text",
    },
    {
      data: "abbr",
      type: "text",
    },
  ],
  stretchH: "all",
  width: 500,
  autoWrapRow: true,
  height: 500,
  maxRows: Infinity,
  manualRowResize: true,
  manualColumnResize: true,
  rowHeaders: true,
  colHeaders: ["Enabled", "Word", "Abbreviation"],
  trimWhitespace: false,
  enterBeginsEditing: false,
  manualRowMove: true,
  manualColumnMove: true,
  columnSorting: {
    indicator: true,
  },
  autoColumnSize: false,
  minRows: 15,
  contextMenu: true,
  licenseKey: "non-commercial-and-evaluation",
};

function AbbreviationTable({ data, setData }) {
  const tableRef = useRef(null);

  const update = (payload, source) => {
    //console.log({source, payload, tableRef: tableRef.current , data})
    // console.log("update source: ", source);
    if (source !== "loadData" && tableRef.current !== null) {
      const rawData = tableRef.current.hotInstance.getData();
      const newData = rawData.map((row) => {
        return {
          enabled: row[0],
          value: row[1],
          abbr: row[2],
        };
      });

      setData(newData);
    }
  };

  return (
    <HotTable
      {...tableSettings}
      data={data}
      ref={tableRef}
      afterChange={update}
    />
  );
}

export default AbbreviationTable;
