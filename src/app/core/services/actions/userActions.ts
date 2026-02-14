import apiClient from "../axios/config";

export const getAlDeckActions = async () => {
  try {
    const response = await apiClient.get("decks/");
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDeckAction = async (deckId: number): Promise<string> => {
   try {
    const response = await apiClient.delete(`/decks/deck/${deckId}/delete/`);
    return response.data?.message; 
  } catch (error) {
    throw error;
  }
};

export const getDeckInprogressActions = async () => {
  try {
    const response = await apiClient.get("decks/?status=in_progress ");
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};

export const getProgressActions = async () => {
  try {
    const response = await apiClient.get("users/me/study-progress");
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};

export const getSummaryAction = async (
  formData: FormData
): Promise<ResponseType> => {
  try {
    const response = await apiClient.post("/summary/summarize/", formData);
    console.log(formData, "formData");
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};



export const postDeckAction = async (
  data: { name: string }
): Promise<ResponseType> => {
  try {
    const response = await apiClient.post("/decks/create/", data);
    console.log("Payload sent:", data);
    return response.data.data.id
  } catch (error) {
    throw error;
  }
};

export const getDeckFlashcards = async (deckId: number) => {
  try {
    const response = await apiClient.get(`/decks/deck/${deckId}/flashcards/`);
  return response.data;
  } catch (error) {
    throw error;
  }
  
};

export const postFlashcardAction = async (
  deckId: string,
  formData: FormData
): Promise<ResponseType> => {
  try {
    const response = await apiClient.post(
      `/flashcards/create/${deckId}/`,
      formData // axios handles headers
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Flashcard API error:", error.response?.data || error.message);
    throw error;
  }
};