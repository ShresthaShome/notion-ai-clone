export default function preprocessText(documentData: string): string {
  let text = "";

  const parser = new DOMParser();
  const doc = parser.parseFromString(documentData, "application/xml");

  const processNode = (node: Node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;

      // Get the direct text content of this node only
      const directText = Array.from(element.childNodes)
        .filter((child) => child.nodeType === Node.TEXT_NODE)
        .map((textNode) => textNode.nodeValue?.trim())
        .filter((text) => text)
        .join(" ");

      // Only append label if there is text content
      if (directText) {
        text += `${directText}\n`;
      }

      // Recursively process child elements
      Array.from(element.children).forEach((child) => processNode(child));
    }
  };

  // Start processing from the root
  processNode(doc.documentElement);

  return text.slice(0, 1000); // Truncate for AI token limit
}
