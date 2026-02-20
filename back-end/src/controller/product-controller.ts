import type { Request, Response } from "express";
import { prisma } from "../db.js";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();

    if (products.length === 0) {
      res.status(404).json({ message: "Não foram encontrados produtos" });
      return;
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
    return;
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { user } = req;
    const { id } = req.params;

    if (!user?.admin) {
      res.status(400).json({ message: "Usuário não autorizado" });
      return;
    }

    if (!id) {
      res.status(400).json({ message: "ID não encontrado" });
      return;
    }

    const deletedProduct = await prisma.product.delete({
      where: { id: id },
    });

    if (!deletedProduct) {
      res.status(404).json({ message: "Erro ao deletar o produto" });
      return;
    }

    res.json(id);
  } catch (error: any) {
    if (error.code === "P2025") {
      res.json({ message: "Produto não encontrado." });
      return;
    }
    res.status(500).json({ message: "Erro no servidor" });
    return;
  }
};
