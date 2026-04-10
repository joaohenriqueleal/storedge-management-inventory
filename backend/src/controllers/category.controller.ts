import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const validateTokenAndEmail = async (email: string, token: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { tokens: { where: { token } } }
  });

  if (!user || user.tokens.length === 0) {
    return null;
  }

  const tokenData = user.tokens[0];
  if (tokenData.expiradoEm < new Date()) {
    return null;
  }

  return user;
};

export const createCategory = async (req: Request, res: Response) => {
  const { nome, descricao, cor, email, token } = req.body;

  if (!nome || !descricao || !cor || !email || !token) {
    return res.status(400).json({ message: "Dados incompletos." });
  }

  try {
    const user = await validateTokenAndEmail(email, token);
    if (!user) {
      return res.status(401).json({ message: "Autenticação falhou." });
    }

    const category = await prisma.categoria.create({
      data: {
        nome,
        descricao,
        cor,
        userId: user.id
      }
    });

    return res.status(201).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao criar categoria." });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { novoNome, novaDescricao, novaCor, email, token } = req.body;

  if (!email || !token) {
    return res.status(400).json({ message: "Dados de autenticação incompletos." });
  }

  try {
    const user = await validateTokenAndEmail(email, token);
    if (!user) {
      return res.status(401).json({ message: "Autenticação falhou." });
    }

    const category = await prisma.categoria.findUnique({ where: { id } });
    if (!category || category.userId !== user.id) {
      return res.status(404).json({ message: "Categoria não encontrada ou sem permissão." });
    }

    const updatedCategory = await prisma.categoria.update({
      where: { id },
      data: {
        nome: novoNome ?? category.nome,
        descricao: novaDescricao ?? category.descricao,
        cor: novaCor ?? category.cor
      }
    });

    return res.status(200).json(updatedCategory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao atualizar categoria." });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, email, token } = req.body;

  if (!nome || !email || !token) {
    return res.status(400).json({ message: "Dados de autenticação ou nome incompletos." });
  }

  try {
    const user = await validateTokenAndEmail(email, token);
    if (!user) {
      return res.status(401).json({ message: "Autenticação falhou." });
    }

    const category = await prisma.categoria.findUnique({ where: { id } });
    if (!category || category.userId !== user.id || category.nome !== nome) {
      return res.status(404).json({ message: "Categoria não encontrada, nome incorreto ou sem permissão." });
    }

    // Futuramente: também excluirá todos os produtos vinculados.
    // Por enquanto, apenas deletamos a categoria. 
    // Se houver produtos vinculados, o Prisma pode dar erro dependendo do onDelete no schema.
    await prisma.categoria.delete({ where: { id } });

    return res.status(200).json({ message: "Categoria excluída com sucesso." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao excluir categoria." });
  }
};

export const listCategories = async (req: Request, res: Response) => {
    // Embora não solicitado explicitamente no POST/PUT/DELETE, é útil
    const { email, token } = req.query; // Aqui usamos query params por ser GET

    if (!email || !token) {
        return res.status(400).json({ message: "Dados de autenticação incompletos." });
    }

    try {
        const user = await validateTokenAndEmail(email as string, token as string);
        if (!user) {
            return res.status(401).json({ message: "Autenticação falhou." });
        }

        const categories = await prisma.categoria.findMany({
            where: { userId: user.id }
        });

        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao listar categorias." });
    }
};
