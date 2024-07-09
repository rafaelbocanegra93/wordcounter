import { chromium, Browser, Page } from 'playwright';
export default class HomePage {
    private page: Page;
    private inputTextSelector: string = 'textarea[id="box"]';
    private wordCounterSelector: string = 'span[id="word_count"]';
    private characterCounterSelector: string ='span[id="character_count"]'
    private wordDensity: string = 'div[id="kwd-density"] span[class="word"]';
    private badgeDensity: string = 'div[id="kwd-density"] span[class="badge"]';
  
    constructor(page: Page) {
      this.page = page;
    }

    async navigate() {
      await this.page.goto('https://wordcounter.net/');
      await this.page.waitForLoadState('networkidle');
    }
  
    async enterText(text: string) {
      await this.page.fill(this.inputTextSelector, text);
      await this.page.click(this.wordCounterSelector);
    }
  
    async getWordCount() {
      const wordCount = await this.page.textContent(this.wordCounterSelector);
      return wordCount;
    }
    async getCharacterCount() {
      const characterCount = await this.page.textContent(this.characterCounterSelector);
      return characterCount;
    }
    async getWordDensityWord(position:number):Promise<string | null>{
      const wordsSelector = await this.page.$$(this.wordDensity);
      const wordSelector = wordsSelector[position];
      const word = await wordSelector.textContent();
      return word;
    }
    async getBadgeDensityNumber(position:number):Promise<string | null>{
      const badgesDensitySelector = await this.page.$$(this.badgeDensity);
      const badgeDensitySelector = badgesDensitySelector[position];
      const badge = await badgeDensitySelector.textContent();
      return badge;
    }

  }