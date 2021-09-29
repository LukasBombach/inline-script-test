const { inspect } = require("util");
const { createMacro } = require("babel-plugin-macros");

module.exports = createMacro(functionToString);

function functionToString({ references, babel }) {
  references.default.forEach(referencePath => {
    // findParent
    const t = babel.types;

    const functionParameter =
      referencePath.parentPath.parentPath.container[1].children[1].expression;

    const file = t.file(
      t.program([
        t.expressionStatement(t.callExpression(functionParameter, [])),
      ])
    );

    const { code } = babel.transformFromAstSync(file);

    const scriptJsx = t.jsxElement(
      t.jsxOpeningElement("script"),
      [
        t.jsxAttribute(
          t.jsxIdentifier("dangerouslySetInnerHTML"),
          t.jsxExpressionContainer(
            t.objectExpression(
              t.objectProperty(t.jsxIdentifier("__html"), t.stringLiteral(code))
            )
          )
        ),
      ],
      true
    );

    referencePath.parentPath.replaceWith(scriptJsx);
  });
}
