'use client'

import seedrandom from 'seedrandom';

// REMOVE ALL THE STATIC IMPORT STATEMENTS FOR THE WORDLISTS

type WordListConfig = {
  [key: string]: {
    words: string[]
    shortestWordSize?: number
    longestWordSize?: number
  }
}

type GenerateOptions = {
  language?: string
  minLength?: number
  maxLength?: number
  seed?: string
}

export class MultilingualWordGenerator {
  // This will now act as a cache for loaded wordlists
  private wordLists: WordListConfig = {};

  // New async method to load a language on demand
  private async loadLanguage(language: string): Promise<void> {
    if (this.wordLists[language]) {
      return; // Already loaded
    }

    console.log(`Dynamically loading wordlist for: ${language}`);
    let wordListModule;
    
    // Use a switch statement for dynamic imports
    switch (language) {
      case 'bengali': wordListModule = await import('./wordlists/bn_words.json'); break;
      case 'bulgarian': wordListModule = await import('./wordlists/bg_words.json'); break;
      case 'croatian': wordListModule = await import('./wordlists/hr_words.json'); break;
      case 'czech': wordListModule = await import('./wordlists/cs_words.json'); break;
      case 'danish': wordListModule = await import('./wordlists/da_words.json'); break;
      case 'dutch': wordListModule = await import('./wordlists/nl_words.json'); break;
      case 'english': wordListModule = await import('./wordlists/en_words.json'); break;
      case 'estonian': wordListModule = await import('./wordlists/et_words.json'); break;
      case 'french': wordListModule = await import('./wordlists/fr_words.json'); break;
      case 'greek': wordListModule = await import('./wordlists/el_words.json'); break;
      case 'gujarati': wordListModule = await import('./wordlists/gu_words.json'); break;
      case 'hindi': wordListModule = await import('./wordlists/hi_words.json'); break;
      case 'hungarian': wordListModule = await import('./wordlists/hu_words.json'); break;
      case 'iranianPersian': wordListModule = await import('./wordlists/fa_words.json'); break;
      case 'italian': wordListModule = await import('./wordlists/it_words.json'); break;
      case 'japanese': wordListModule = await import('./wordlists/ja_words.json'); break;
      case 'javanese': wordListModule = await import('./wordlists/jv_words.json'); break;
      case 'kannada': wordListModule = await import('./wordlists/kn_words.json'); break;
      case 'korean': wordListModule = await import('./wordlists/ko_words.json'); break;
      case 'latvian': wordListModule = await import('./wordlists/lv_words.json'); break;
      case 'lithuanian': wordListModule = await import('./wordlists/lt_words.json'); break;
      case 'malayalam': wordListModule = await import('./wordlists/ml_words.json'); break;
      case 'maltese': wordListModule = await import('./wordlists/mt_words.json'); break;
      case 'mandarin': wordListModule = await import('./wordlists/zh_words.json'); break;
      case 'manipuri': wordListModule = await import('./wordlists/mni_words.json'); break;
      case 'odia': wordListModule = await import('./wordlists/or_words.json'); break;
      case 'punjabi': wordListModule = await import('./wordlists/pa_words.json'); break;
      case 'romanian': wordListModule = await import('./wordlists/ro_words.json'); break;
      case 'russian': wordListModule = await import('./wordlists/ru_words.json'); break;
      case 'santali': wordListModule = await import('./wordlists/sat_words.json'); break;
      case 'slovenian': wordListModule = await import('./wordlists/sl_words.json'); break;
      case 'spanish': wordListModule = await import('./wordlists/es_words.json'); break;
      case 'swedish': wordListModule = await import('./wordlists/sv_words.json'); break;
      case 'tamil': wordListModule = await import('./wordlists/ta_words.json'); break;
      case 'telugu': wordListModule = await import('./wordlists/te_words.json'); break;
      case 'thai': wordListModule = await import('./wordlists/th_words.json'); break;
      case 'turkish': wordListModule = await import('./wordlists/tr_words.json'); break;
      case 'urdu': wordListModule = await import('./wordlists/ur_words.json'); break;
      case 'vietnamese': wordListModule = await import('./wordlists/vi_words.json'); break;
      case 'welsh': wordListModule = await import('./wordlists/cy_words.json'); break;
      default:
        throw new Error(`Language '${language}' not supported`);
    }

    const words = wordListModule.default;
    this.wordLists[language] = { words };
    this.initializeWordListMetadata(language);
  }

  private initializeWordListMetadata(language: string) {
    const words = this.wordLists[language].words;
    if (words && words.length > 0) {
      this.wordLists[language].shortestWordSize = this.findShortestWordLength(words);
      this.wordLists[language].longestWordSize = this.findLongestWordLength(words);
    }
  }

  private findShortestWordLength(words: string[]): number {
    return words.reduce((shortest, word) =>
      word.length < shortest ? word.length : shortest,
      Infinity
    );
  }

  private findLongestWordLength(words: string[]): number {
    return words.reduce((longest, word) =>
      word.length > longest ? word.length : longest,
      0
    );
  }

  private randInt(lessThan: number, random?: () => number): number {
    const r = random ? random() : Math.random();
    return Math.floor(r * lessThan);
  }

  private generateRandomWord(language: string, random?: () => number): string {
    const words = this.wordLists[language].words;
    if (words.length === 0) {
        console.warn(`Wordlist for ${language} is empty.`);
        return "error";
    }
    return words[this.randInt(words.length, random)];
  }

  public async generate(options?: GenerateOptions): Promise<string> {
    const language = options?.language || 'english';
    await this.loadLanguage(language);

    const random = options?.seed ? seedrandom(options.seed) : undefined;
    
    // ... rest of the generate method is the same
    const languageConfig = this.wordLists[language];
    const { shortestWordSize = 2, longestWordSize = 10 } = languageConfig;
    
    const minLength = options?.minLength ? Math.max(options.minLength, shortestWordSize) : shortestWordSize;
    const maxLength = options?.maxLength ? Math.min(options.maxLength, longestWordSize) : longestWordSize;
    
    let rightSize = false;
    let wordUsed = '';
    let attempts = 0;

    while (!rightSize && attempts < 100) {
      wordUsed = this.generateRandomWord(language, random?.bind(random));
      rightSize = wordUsed.length >= minLength && wordUsed.length <= maxLength;
      attempts++;
    }

    return wordUsed;
  }

  public getLanguages(): string[] {
    return Object.keys(this.wordLists);
  }
}

export const wordGenerator = new MultilingualWordGenerator();