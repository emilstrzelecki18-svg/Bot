import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const counterPath = path.join(__dirname, '..', 'ticketCounter.json');

export function getTicketCounter() {
  try {
    const data = fs.readFileSync(counterPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return { support: 0, reports: 0, questions: 0 };
  }
}

export function incrementTicketCounter(category) {
  const counters = getTicketCounter();
  counters[category] = (counters[category] || 0) + 1;
  fs.writeFileSync(counterPath, JSON.stringify(counters, null, 2));
  return counters[category];
}

export function formatTicketNumber(number) {
  return String(number).padStart(3, '0');
}
