export async function getAllCategories() {
    return await fetch("http://localhost:5678/api/categories").then(response => response.json());
}