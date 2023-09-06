import { ICsvPrices } from "../interfaces/Products";
import { getPacksByPackId, getPacksByProductId } from "../services/packs";
import { getProductByCode } from "../services/products";
export const validateCSV = async (data: ICsvPrices[]) => {
  const validatedData: ICsvPrices[] = [];

  await Promise.all(
    data.map(async (product: ICsvPrices) => {
      if (!product.error) {
        product.error = [];
      }

      if (!isInteger(product.product_code) || !product.product_code) {
        product.error?.push("Código do produto inválido");
      }

      if (!isFloatOrInteger(product.new_price) || !product.new_price) {
        product.error?.push("Preço inválido");
      }

      const productData = await getProductByCode({
        code: Number(product.product_code),
      });

      if (!productData?.code) {
        product.error?.push("Produto inexistente");
      }

      const code = Number(product.product_code);
      const newPrice = Number(product.new_price);
      const costPrice = Number(productData?.cost_price);
      const actualPrice = Number(productData?.sales_price);
      const productName = productData?.name;

      const isValidPrice = checkPrice(costPrice, actualPrice, newPrice);

      if (!isValidPrice.status) {
        product.error?.push(isValidPrice.message);
      }

      const isPack = await checkPackage(code, data);

      if (isPack.status && !isPack.isValid) {
        product.error?.push(isPack.message);
      }

      product.actualPrice = actualPrice;
      product.name = productName;

      const belongToPack = await checkProductBelongToPack(code, data);

      if (belongToPack.status && !belongToPack.isValid) {
        product.error.push(belongToPack.message);
      }

      validatedData.push(product);
    })
  );
  const hasError = !!data.find(({ error }) => error?.length);
  const status = hasError ? "Fail" : "Success";
  return { status, data: validatedData };
};

function isFloatOrInteger(value: string): boolean {
  return /^[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/.test(value);
}

function isInteger(value: string): boolean {
  return /^[+-]?\d+$/.test(value);
}

function checkPrice(costPrice: number, actualPrice: number, newPrice: number) {
  if (newPrice <= costPrice) {
    return {
      status: false,
      message: "Novo preço não pode ser menor ou igual ao preço de custo",
    };
  }

  const priceDiff = newPrice - actualPrice;
  const percentageDiff = (priceDiff / actualPrice) * 100;

  if (Math.abs(percentageDiff) >= 10) {
    return { status: false, message: "A diferença maior que 10%" };
  }

  return { status: true, message: "Preço válido" };
}

async function checkProductBelongToPack(code: number, csvData: ICsvPrices[]) {
  const packs = await getPacksByProductId({ code });
  const hasPack = !!packs.length;
  if (hasPack) {
    const invalidProduct = packs.find((pack) => {
      return !csvData.find(
        (product) => product.product_code === String(pack.pack_id)
      );
    });

    if (invalidProduct) {
      return {
        status: true,
        isValid: false,
        message:
          "Atualização de preço do pacote ao qual o produto pertence não foi enviada",
      };
    }
  }
  return {
    status: false,
    isValid: true,
    message: "Produto válido",
  };
}

async function checkPackage(code: number, csvData: ICsvPrices[]) {
  const packs = await getPacksByPackId({ code });
  const hasPack = !!packs.length;
  if (hasPack) {
    const invalidPack = packs.find((pack) => {
      return !csvData.find(
        (product) => product.product_code === String(pack.product_id)
      );
    });

    if (invalidPack) {
      return {
        status: true,
        isValid: false,
        message:
          "Não foi enviada alteração de preço de um ou mais produtos base",
      };
    }

    const calcNewPackPrice = packs.reduce((acc, pack) => {
      const packQty = Number(pack.qty);
      const productNewPrice = Number(
        csvData.find(
          ({ product_code }) => product_code === String(pack.product_id)
        )?.new_price
      );
      const calcPrice = productNewPrice * packQty;
      return acc + calcPrice;
    }, 0);

    const pack = csvData.find(
      ({ product_code }) => product_code === String(code)
    );

    if (Number(pack?.new_price).toFixed(2) !== calcNewPackPrice.toFixed(2)) {
      return {
        status: true,
        isValid: false,
        message:
          "O valor final do pack é diferente da soma dos preços dos produtos base",
      };
    }
  }
  return {
    status: false,
    isValid: true,
    message: "Produto válido, não é um pacote",
  };
}
