const XLSX = require("xlsx");
const chokidar = require("chokidar");
const fs = require("fs");

const EXCEL_FILE = "./data/product_data.xlsx";
const JSON_FILE = "./data/product_data.json";

function buildJson() {
  try {
    console.log("Reading Excel...");

    const workbook = XLSX.readFile(EXCEL_FILE);

    const result = {};

    workbook.SheetNames.forEach((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];

      result[sheetName] = XLSX.utils.sheet_to_json(
        worksheet,
        { defval: "" }
      );
    });

    fs.writeFileSync(
      JSON_FILE,
      JSON.stringify(result, null, 2),
      "utf8"
    );

    console.log("✅ JSON Updated");
  } catch (error) {
    console.error(error);
  }
}

buildJson();

chokidar.watch(EXCEL_FILE).on("change", () => {
  console.log("Excel changed...");
  buildJson();
});