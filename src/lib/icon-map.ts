/* eslint-disable @typescript-eslint/no-explicit-any */
import * as TablerIcons from "@tabler/icons-react";


function normalize(name: string) {
  return name.replace(/\s+/g, "").trim();
}

export function getIcon(name: string) {
  const key = normalize(name);
  return (TablerIcons as any)[`${key}`] || null;
}
