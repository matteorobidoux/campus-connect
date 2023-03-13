import "../src/index.css"

// Sorry for this. Took from a guy on stackoverflow
// https://stackoverflow.com/a/56250392
//
// This gets all variables that start with "--classes-" in the :root css so we can
// use it to pick a color from our theme programatically.
export const colorVariables = Array
  .from(document.styleSheets)
  .filter(styleSheet => {
    try { return styleSheet.cssRules; }
    catch (e) { console.warn(e); }
  })
  .map(styleSheet => Array.from(styleSheet.cssRules))
  .flat()
  .filter((cssRule: any) => cssRule.selectorText === ':root')
  .map(cssRule => cssRule.cssText.split('{')[1].split('}')[0].trim().split(';'))
  .flat()
  .filter(text => text !== "")
  .map(text => text.split(':'))
  .map(parts => ({ key: parts[0].trim(), value: parts[1].trim() }))
  .filter(entry => entry.key.includes("--classes-"))

export const getRandomColor = () => colorVariables[Math.floor(Math.random() * colorVariables.length)].value;
