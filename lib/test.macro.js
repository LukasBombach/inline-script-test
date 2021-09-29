const { createMacro } = require("babel-plugin-macros");

module.exports = createMacro(functionToString);

function functionToString({ references, babel }) {
  try {
    references.default.forEach(referencePath => {
      const t = babel.types;

      // todo findParent
      const macroJsxElement = referencePath.parentPath.parentPath;

      if (macroJsxElement.get("openingElement.name").node.name === "script") {
        return;
      }

      const functionParameter =
        macroJsxElement.container[1].children[1].expression;

      const file = t.file(
        t.program([
          t.expressionStatement(t.callExpression(functionParameter, [])),
        ])
      );

      const { code } = babel.transformFromAstSync(file, "", {
        presets: ["next/babel"],
        filename: "inline_script.ts",
        minified: true,
      });

      const scriptJsx = t.jsxElement(
        t.jsxOpeningElement(
          t.jsxIdentifier("script"),
          [
            t.jsxAttribute(
              t.jsxIdentifier("dangerouslySetInnerHTML"),
              t.jsxExpressionContainer(
                t.objectExpression([
                  t.objectProperty(
                    t.identifier("__html"),
                    t.stringLiteral(code)
                  ),
                ])
              )
            ),
          ],
          true
        ),
        null,
        [],
        true
      );

      referencePath.parentPath.parentPath.replaceWith(scriptJsx);
    });
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
}
