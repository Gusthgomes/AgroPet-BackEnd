import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Criar categorias
  const dogFoodCategory = await prisma.category.upsert({
    where: { id: "uuid-dog-food" }, // Usando id único
    update: {},
    create: {
      id: "uuid-dog-food",
      name: "Rações para Cachorro",
      description: "Rações para cachorros de todas as idades",
    },
  });

  const catFoodCategory = await prisma.category.upsert({
    where: { id: "uuid-cat-food" }, // Usando id único
    update: {},
    create: {
      id: "uuid-cat-food",
      name: "Rações para Gatos",
      description: "Rações para gatos de todas as idades",
    },
  });

  // Produtos de ração para cachorro
  await prisma.product.createMany({
    data: [
      {
        name: "Golden Fórmula Filhotes Frango e Arroz 15kg",
        description: "Ração Premier Golden Fórmula para cães filhotes.",
        imageUrls: [
          "https://images.tcdn.com.br/img/img_prod/587393/racao_premier_golden_formula_caes_filhotes_frango_e_arroz_15kg_396_1_20171129111709.jpg",
        ],
        basePrice: 199.9,
        categoryId: dogFoodCategory.id,
        discountPercentage: 10,
      },
      {
        name: "Golden Fórmula Senior Frango e Arroz 15kg",
        description:
          "Ração Premier Golden Fórmula para cães adultos de porte pequeno.",
        imageUrls: [
          "https://images.tcdn.com.br/img/img_prod/587393/racao_premier_golden_formula_senior_frango_e_arroz_caes_adultos_pequeno_porte_1558_1_20180812215145.jpg",
        ],
        basePrice: 209.9,
        categoryId: dogFoodCategory.id,
        discountPercentage: 5,
      },
      {
        name: "Golden Special Adultos Porte Pequeno 15kg",
        description: "Ração Golden Special para cães adultos de porte pequeno.",
        imageUrls: [
          "https://agrosolo.fbitsstatic.net/img/p/racao-golden-special-para-caes-adultos-porte-pequeno-15kg-86885/282421-2.jpg?w=275&h=275&v=202408160839",
        ],
        basePrice: 189.9,
        categoryId: dogFoodCategory.id,
        discountPercentage: 0,
      },
    ],
  });

  // Produtos de ração para gatos
  await prisma.product.createMany({
    data: [
      {
        name: "Golden Gatos Castrados Peixe 10kg",
        description: "Ração Golden para gatos castrados sabor peixe.",
        imageUrls: [
          "https://images.tcdn.com.br/img/img_prod/804492/golden_gatos_castrados_sabor_peixe_10_kg_3253_1_8c514e50d2f402137d515be853532cd1.png",
        ],
        basePrice: 129.9,
        categoryId: catFoodCategory.id,
        discountPercentage: 15,
      },
      {
        name: "Premier Golden Gatos Adultos Frango Castrado 10kg",
        description:
          "Ração Premier Golden para gatos adultos castrados sabor frango.",
        imageUrls: [
          "https://images.tcdn.com.br/img/img_prod/973712/racao_seca_premier_pet_golden_gatos_adultos_frango_castrado_10_1kg_17_1_6778412fce6c36123d0ea88678656bc9.png",
        ],
        basePrice: 149.9,
        categoryId: catFoodCategory.id,
        discountPercentage: 10,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
