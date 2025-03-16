import client from "./axiosClient";

export const getRecentCategories = async () => {
    const response = await client.get("/categories", {
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
        throw new Error("Something went wrong");
    }
    console.log(response);
    return response.data.category;
}