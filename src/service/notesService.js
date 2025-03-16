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