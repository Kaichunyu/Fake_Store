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
		
		const result = await res.json();
		const categories = []
			for (let i = 0; i < result.length; i++) {
				categories.push({id: i, name: result[i]})
			}
    return categories;
  } catch (error) {
    console.log("Error fetching categories:", error.message)
  } 
};

export const fetchProductByCat = async (category) => {
  try {
    const res = await fetch(url + "category/" + category);
    const data = await res.json();
    return data;
  } catch (e) {
    throw new Error("Can't find category.");
} };

export async function fetchProductByID(id) {
	try {
		const response = await fetch(url + id);
		if (!response.ok) {
			throw new Error("Failed to fetch product");
		}
		const products = await response.json();
		return products;
	} catch (error) {
		console.error("Error fetching product:", error.message);
		return [];
	}
}
