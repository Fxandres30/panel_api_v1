export async function loginAdmin(
  password: string
) {
  if (password === "efaat2025") {

    document.cookie =
      "admin_token=ok; path=/; max-age=14400";

    return true;
  }

  return false;
}