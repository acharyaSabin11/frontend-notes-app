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

export const addNote = async ({ title, description, additional_info, categories }) => {
    const response = await client.post("/notes", {
        title,
        description,
        additional_info,
        categories,
    });

    if (response.status !== 201) {
        console.log(response);
        throw new Error("Something went wrong");
    }
    return response.data.note;
}

export const getNoteDetail = async (noteId) => {
    const response = await client.get(`/notes/${noteId}`);

    if (response.status !== 200) {
        console.log(response);
        throw new Error("Something went wrong");
    }
    return response.data.data;
}

export const deleteNote = async (noteId) => {
    console.log(noteId);
    const response = await client.delete(`/notes/${noteId}`);

    if (response.status !== 204) {
        console.log(response);
        throw new Error("Something went wrong");
    }
    return response.data;
}

export const updateNote = async ({ noteId, title, description, additional_info, addCategories, removeCategories }) => {
    const response = await client.put(`/notes/${noteId}`, {
        title,
        description,
        additional_info,
        addCategories,
        removeCategories,
    });

    if (response.status !== 200) {
        console.log(response);
        throw new Error("Something went wrong");
    }
    return response.data.note;
}

export const getAllNotes = async (page, filter) => {
    const response = await client.get("/notes", {
        params: {
            limit: 1,
            page: page,
            filter: filter,
        },
    });

    if (response.status !== 200) {
        console.log(response);
        throw new Error("Something went wrong");
    }
    return response.data.data ?? [];
}

export const searchNotes = async (searchText, signal) => {
    if (!searchText) {
        console.log(1);
        return [];
    }

    console.log(2);

    try {
        console.log(7);
        const response = await client.get("/notes/search", {
            signal: signal,
            params: {
                filter: searchText,
            },
        });
        console.log(8);
        return response.data.data;

    } catch (error) {
        console.log(9);
        if (client.isCancel(error)) {
            console.log(10);
            console.log("Request cancelled", error.message);
        }
        console.log(11);
        throw error;
    }
}