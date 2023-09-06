import { Request, Response } from "express";
import fs from "fs";
import csvParser from "csv-parser";
import path from "path";

import { ICsvPrices } from "../../interfaces/Products";
import { validateCSV } from "../../ValidateCSV";

export const validateCSVFileController = (req: Request, res: Response) => {
  const uploadedFile = req.file;

  if (!uploadedFile) {
    return res.status(400).json({ message: "Nenhum arquivo CSV enviado." });
  }

  const fileExt = path.extname(uploadedFile.originalname).toLowerCase();

  if (fileExt !== ".csv") {
    return res.status(400).json({ message: "O arquivo não é um CSV válido." });
  }

  const results: ICsvPrices[] = [];
  const csvFile = uploadedFile.path;
  const fileName = uploadedFile.filename;

  fs.createReadStream(csvFile)
    .pipe(csvParser())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      const validateData = await validateCSV(results);
      validateData.status === "Fail" && deleteCSVFile(uploadedFile);
      res.status(200).json({
        message: "Arquivo CSV processado com sucesso.",
        fileName,
        status: validateData.status,
        validateData: validateData.data,
      });
    });
};

function deleteCSVFile(file: Express.Multer.File) {
  const filePath = file.path;

  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log("File deleted successfully");
    } catch (err) {
      console.error(err);
    }
  } else {
    console.log("File not found");
  }
}
