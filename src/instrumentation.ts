/**
 * instrumentation.ts — Se ejecuta UNA VEZ al arrancar el servidor Next.js.
 *
 * Propósito: polyfill de localStorage para el entorno Node.js.
 *
 * Problema: algunos entornos de ejecución (como Claude Desktop) inyectan
 * el flag `--localstorage-file` en el proceso Node.js con un path inválido,
 * lo que crea un shim de localStorage roto. Next.js 15 (o sus dependencias)
 * intenta leer localStorage en el servidor y lanza TypeError.
 *
 * Solución: si localStorage no existe o su getItem no es una función,
 * reemplazarlo con una implementación no-op segura antes de que Next.js
 * intente usarlo.
 */

export async function register() {
  // Solo aplicar en el servidor (Node.js), no en el browser
  if (typeof window !== "undefined") return;

  const needsPolyfill =
    typeof globalThis.localStorage === "undefined" ||
    typeof globalThis.localStorage?.getItem !== "function";

  if (needsPolyfill) {
    // Implementación no-op: simula la API de Storage sin persistir nada
    const noop = () => {};
    Object.defineProperty(globalThis, "localStorage", {
      value: {
        getItem: (_key: string): null => null,
        setItem: (_key: string, _value: string): void => noop(),
        removeItem: (_key: string): void => noop(),
        clear: (): void => noop(),
        key: (_index: number): null => null,
        length: 0,
      } satisfies Storage,
      writable: true,
      configurable: true,
    });
  }
}
