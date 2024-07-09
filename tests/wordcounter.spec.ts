import { test, expect } from '@playwright/test';
import HomePage from '../POM/homePage';
test.describe('Pruebas a wordcounter.net', () => {
  test('Numero de Palabras', async ({ page }) => {
    const homePage:HomePage = new HomePage(page);
    await homePage.navigate();
    await homePage.enterText("have a good day");
    const wordCount:string|null = await homePage.getWordCount();
    expect(wordCount).toEqual("4");
  });
  test('Numero de Caracteres', async ({ page }) => {
    const homePage:HomePage = new HomePage(page);
    await homePage.navigate();
    await homePage.enterText("Where there’s a will, there’s a way");
    const characterCount:string|null = await homePage.getCharacterCount();
    expect(characterCount).toEqual("35");
  });
  test('Densidad de palabras', async ({ page }) => {
    const homePage:HomePage = new HomePage(page);
    await homePage.navigate();
    const words:string = "lumu lumu lumu lumu lumu illuminates illuminates attacks and adversaries lumu illuminates all attacks and adversaries";
    await homePage.enterText(words);
    const wordCount:string|null = await homePage.getWordCount();
    expect(wordCount).toEqual("16");
    const characterCount:string|null = await homePage.getCharacterCount();
    expect(characterCount).toEqual("117");
    expect(await homePage.getWordDensityWord(0)).toEqual("lumu");
    expect(await homePage.getBadgeDensityNumber(0)).toContain("6 (43%)");
    expect(await homePage.getWordDensityWord(1)).toEqual("illuminates");
    expect(await homePage.getBadgeDensityNumber(1)).toContain("3 (21%)");
    expect(await homePage.getWordDensityWord(2)).toEqual("attacks");
    expect(await homePage.getBadgeDensityNumber(2)).toContain("2 (14%)");
  });

});
