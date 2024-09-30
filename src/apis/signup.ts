const baseUrl = import.meta.env.VITE_BASE_URL;

export const checkExistingEmail = async (email: string) => {
  try {
    const response = await fetch(`${baseUrl}/auth/checkExistingEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();

      console.log(errorData);

      throw new Error(errorData.message);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};
