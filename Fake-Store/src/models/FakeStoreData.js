const url = "https://fakestoreapi.com/products/";

export function formatCategory(data) {
  const formatted = data.replace(/^[a-z]| [a-z]/gi, (char) =>
    char.toUpperCase())
  return formatted;
};

export async function fetchCategories() {
  try {
    const res = await fetch(url + "categories");
    if (!res.ok) {
      throw new Error("Failed to fetch categories")
    }
    const categories = await res.json();
    
    return categories;
  } catch (error) {
    console.log("Error fetching categories:", error.message)
  } 
};

export async function fetchProducts(category) {
	try {
		const response = await fetch(url + "category/" + category);
		if (!response.ok) {
			throw new Error("Failed to fetch products");
		}
		const products = await response.json();

		const filteredProducts = products.filter(
			(product) =>
				product.category === category
		);

		const formattedProducts = filteredProducts.map((product) => ({
			id: product.id,
			title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      rate: product.rating.rate,
      rateCount: product.rating.count,

		}));
		return formattedProducts;
	} catch (error) {
		console.error("Error fetching products:", error.message);
		return [];
	}
}

// fetchProducts("electronics");