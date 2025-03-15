import client from "./axiosClient";

export const getRecentNotes = async () => {
    const response = await client.get("/notes", {
        params: {
            limit: 5,
        },
    });

    if (response.status !== 200) {
        console.log(response);
        throw new Error("Something went wrong");
    }
    return response.data.data.notes;
};
