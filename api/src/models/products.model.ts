interface Iproduct {
  id: number;
  title: string;
  price: number;
  description: string;
}

class Product {
  products: Iproduct[] = [];

  constructor() {
    this.fillData();
  }

  create(title: string, price: number, description: string): void {
    this.products.push({ id: Date.now(), title, price, description });
  }

  find(): Iproduct[] {
    return this.products;
  }

  findById(id: number): Iproduct | undefined {
    return this.products.find((prod) => prod.id === id);
  }

  udpated(product: Iproduct): void {
    const index = this.products.findIndex((prod) => product.id === prod.id);
    if (index < 0) throw new Error("product not found");
    if (product.title) this.products[index].title = product.title;
    if (product.price) this.products[index].price = product.price;
  }

  delete(id: number): void {
    const index = this.products.findIndex((prod) => id === prod.id);
    if (index < 0) throw new Error("product not found");
    this.products.splice(index, 1);
  }

  private fillData() {
    this.products.push({
      id: 1,
      title: "prod-1",
      price: 10,
      description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio, nihil
    facere? Eveniet, ea tempore. Ex impedit sequi commodi eum architecto nulla
    eaque accusantium eligendi fuga aperiam! Nihil tempora enim ipsam molestiae
    pariatur adipisci nostrum id ipsa temporibus, saepe voluptatum laboriosam
    aperiam perspiciatis, fugiat consequatur et sapiente culpa? Maxime ad dolor
    voluptatem excepturi facilis iste omnis cumque quod distinctio, molestias
    recusandae, laborum sequi minima iusto nisi corrupti doloremque ipsam error
    voluptas fuga? Sunt maxime magni deleniti fugiat veritatis at vel numquam!`,
    });
    this.products.push({
      id: 2,
      title: "prod-2",
      price: 13,
      description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio, nihil
    facere? Eveniet, ea tempore. Ex impedit sequi commodi eum architecto nulla
    eaque accusantium eligendi fuga aperiam! Nihil tempora enim ipsam molestiae
    pariatur adipisci nostrum id ipsa temporibus, saepe voluptatum laboriosam
    aperiam perspiciatis, fugiat consequatur et sapiente culpa? Maxime ad dolor
    voluptatem excepturi facilis iste omnis cumque quod distinctio, molestias
    recusandae, laborum sequi minima iusto nisi corrupti doloremque ipsam error
    voluptas fuga? Sunt maxime magni deleniti fugiat veritatis at vel numquam!`,
    });
    this.products.push({
      id: 3,
      title: "prod-3",
      price: 14,
      description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio, nihil
    facere? Eveniet, ea tempore. Ex impedit sequi commodi eum architecto nulla
    eaque accusantium eligendi fuga aperiam! Nihil tempora enim ipsam molestiae
    pariatur adipisci nostrum id ipsa temporibus, saepe voluptatum laboriosam
    aperiam perspiciatis, fugiat consequatur et sapiente culpa? Maxime ad dolor
    voluptatem excepturi facilis iste omnis cumque quod distinctio, molestias
    recusandae, laborum sequi minima iusto nisi corrupti doloremque ipsam error
    voluptas fuga? Sunt maxime magni deleniti fugiat veritatis at vel numquam!`,
    });
    this.products.push({
      id: 4,
      title: "prod-4",
      price: 2,
      description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio, nihil
    facere? Eveniet, ea tempore. Ex impedit sequi commodi eum architecto nulla
    eaque accusantium eligendi fuga aperiam! Nihil tempora enim ipsam molestiae
    pariatur adipisci nostrum id ipsa temporibus, saepe voluptatum laboriosam
    aperiam perspiciatis, fugiat consequatur et sapiente culpa? Maxime ad dolor
    voluptatem excepturi facilis iste omnis cumque quod distinctio, molestias
    recusandae, laborum sequi minima iusto nisi corrupti doloremque ipsam error
    voluptas fuga? Sunt maxime magni deleniti fugiat veritatis at vel numquam!`,
    });
    this.products.push({
      id: 5,
      title: "prod-5",
      price: 6,
      description: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio, nihil
    facere? Eveniet, ea tempore. Ex impedit sequi commodi eum architecto nulla
    eaque accusantium eligendi fuga aperiam! Nihil tempora enim ipsam molestiae
    pariatur adipisci nostrum id ipsa temporibus, saepe voluptatum laboriosam
    aperiam perspiciatis, fugiat consequatur et sapiente culpa? Maxime ad dolor
    voluptatem excepturi facilis iste omnis cumque quod distinctio, molestias
    recusandae, laborum sequi minima iusto nisi corrupti doloremque ipsam error
    voluptas fuga? Sunt maxime magni deleniti fugiat veritatis at vel numquam!`,
    });
  }
}

export const Products = new Product();
