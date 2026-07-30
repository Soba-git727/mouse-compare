interface PendingMouse {
  id: string;
  name: string;
  brand: string;
  sensor?: string;
  weight?: number;
  submittedAt: string;
  [key: string]: unknown;
}

const pendingMice: PendingMouse[] = [];

export function getPendingMice(): PendingMouse[] {
  return [...pendingMice];
}

export function submitMouse(data: Record<string, unknown>): PendingMouse {
  const entry: PendingMouse = {
    id: `pending-${Date.now()}`,
    name: data.name as string,
    brand: data.brand as string,
    ...data,
    submittedAt: new Date().toISOString(),
  };
  pendingMice.push(entry);
  return entry;
}
