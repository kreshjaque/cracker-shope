export function getWelcomeMessage(appName = "Cracker Shope") {
  return `Welcome to ${appName}!`;
}

export function formatAppName(name: string) {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
