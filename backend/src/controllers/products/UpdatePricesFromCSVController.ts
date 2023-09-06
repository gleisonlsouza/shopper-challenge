import { Request, Response } from "express";
import fs from "fs";
import csvParser from "csv-parser";
import path from "path";

import { ICsvPrices } from "../../interfaces/Products";
import { updateProductPrice } from "../../services/products";

export const updatePricesFromCSV = (req: Request, res: Response) => {
  const results: ICsvPrices[] = [];
  const { fileName } = req.body;

  if (!fileName) {
    return res
      .status(400)
      .json({ message: "Informe o nome do arquivo csv validado" });
  }

  const csvFile = `uploads/${fileName}`;

  if (fs.existsSync(csvFile)) {
    try {
      fs.createReadStream(csvFile)
        .pipe(csvParser())
        .on("data", async (data) => {
          try {
            await updateProductPrice(data);
            results.push(data);
          } catch (error) {
            console.error(`Erro ao atualizar preço: ${error}`);
            return res
              .status(500)
              .json({ message: `Erro ao atualizar preço: ${error}` });
          }
        })
        .on("end", () => {
          deleteCSVFile(csvFile);
          return res
            .status(201)
            .json({ message: "Preços atualizados com sucesso!" });
        });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Erro ao processar arquivo - ${error}` });
    }
  } else {
    return res.status(404).json({ message: "Arquivo não encontrado" });
  }
};

function deleteCSVFile(filePath: string) {
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
