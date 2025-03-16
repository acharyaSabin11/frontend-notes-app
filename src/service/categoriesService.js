import client from "./axiosClient";

export const getRecentCategories = async () => {
    const response = await client.get("/categories/recent", {
        params: {
            limit: 5,
        },
    });

    if (response.status !== 200) {
        console.log(response);
        throw new Error("Something went wrong");
    }
    return response.data.data.categories ?? [];
};

export const addCategory = async ({ category }) => {
    const response = await client.post("/categories", {
        title: category,
    });

    if (response.status !== 201) {
        console.log(response);
        throw new Error(response.response.data.message);
    }
    return response.data.category;
}

export const getCategories = async () => {
    const response = await client.get("/categories");

    if (response.status !== 200) {
        console.log(response);
        throw new Error("Something went wrong");
    }
    console.log(response);
    return response.data.categories ?? [];
}

export const getCategoryDetail = async (categoryId) => {
    const response = await client.get(`/categories/${categoryId}`);

    if (response.status !== 200) {
        console.log(response);
        throw new Error("Something went wrong");
    }
    return response.data.data;
}

export const deleteCategory = async (categoryId) => {
    const response = await client.delete(`/categories/${categoryId}`);

    if (response.status !== 204) {
        console.log(response);
        throw new Error("Something went wrong");
    }
    return response.data;
}

export const updateCategory = async ({ categoryId, title }) => {
    const response = await client.put(`/categories/${categoryId}`, {
        title,
    });

    if (response.status !== 200) {
        console.log(response);
        throw new Error("Something went wrong");
    }
    return response.data;
}