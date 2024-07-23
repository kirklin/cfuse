type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | { [key: string]: any }
  | ClassValue[];

export function cfuse(...inputs: ClassValue[]): string {
  let result = "";
  let queue: ClassValue[] = [...inputs]; // Start with all inputs in the queue

  while (queue.length > 0) {
    const current = queue.shift(); // Get the first element in the queue

    if (typeof current === "string" || typeof current === "number") {
      if (current) {
        if (result) {
          result += " ";
        }
        result += current;
      }
    } else if (current && typeof current === "object") {
      if (Array.isArray(current)) {
        queue = current.concat(queue); // Add array elements to the front of the queue
      } else {
        for (const key in current) {
          if (current[key]) {
            if (result) {
              result += " ";
            }
            result += key;
          }
        }
      }
    }
  }

  return result;
}

export default cfuse;
