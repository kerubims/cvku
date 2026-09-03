// Type declarations for nspell (no official @types available)
declare module "nspell" {
  interface NSpell {
    correct(word: string): boolean;
    suggest(word: string): string[];
    dictionary(words: string): void;
    affix(): unknown;
  }
  function nspell(affOrDict: string | { aff: string; dic: string }, dic?: string): NSpell;
  export default nspell;
}
