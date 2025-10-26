
export const getTruncatedText = (
  html: string | undefined,
  maxLength: number
) => {
  if (!html) return "";
  const temp = document.createElement("div");
  temp.innerHTML = html;
  const text = temp.textContent || temp.innerText || "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};
