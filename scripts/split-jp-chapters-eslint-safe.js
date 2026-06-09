const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
const t = require('@babel/types')

const ROOT = path.resolve(__dirname, '../src/consts/jp')
const LEVELS = [
  { name: 'junior', count: 12 },
  { name: 'intermediate', count: 8 },
  { name: 'senior', count: 6 }
]

const parseModule = code =>
  parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx']
  })

const getDefaultExportObject = ast => {
  let exportNode = null
  traverse(ast, {
    ExportDefaultDeclaration(exportPath) {
      exportNode = exportPath.node.declaration
      exportPath.stop()
    }
  })
  if (!t.isObjectExpression(exportNode)) {
    throw new Error('Expected default export object expression')
  }
  return exportNode
}

const getProperty = (objectNode, names) =>
  objectNode.properties.find(
    item =>
      t.isObjectProperty(item) &&
      ((t.isIdentifier(item.key) && names.includes(item.key.name)) ||
        (t.isStringLiteral(item.key) && names.includes(item.key.value)))
  )

const cloneNode = node => t.cloneNode(node, true)

const printCode = ast =>
  generate(ast, {
    retainLines: false,
    concise: false,
    jsescOption: { minimal: true }
  }).code

const writeAstFile = (filePath, ast) => {
  fs.writeFileSync(filePath, `${printCode(ast)}\n`)
}

const buildImport = (name, relativePath) =>
  t.importDeclaration(
    [t.importDefaultSpecifier(t.identifier(name))],
    t.stringLiteral(relativePath)
  )

const splitChapterFile = filePath => {
  const source = fs.readFileSync(filePath, 'utf8')
  const ast = parseModule(source)
  const exportObject = getDefaultExportObject(ast)
  const lessonProperty = getProperty(exportObject, ['lesson', 'lession'])

  if (!lessonProperty || !t.isArrayExpression(lessonProperty.value)) {
    throw new Error(`Missing lesson array in ${filePath}`)
  }

  const chapterName = path.basename(filePath, '.js')
  const chapterDir = path.join(path.dirname(filePath), chapterName)
  fs.mkdirSync(chapterDir, { recursive: true })

  const lessonNodes = lessonProperty.value.elements.filter(
    element => element && t.isObjectExpression(element)
  )

  const lessonImports = []
  const lessonRefs = []

  lessonNodes.forEach((lessonNode, index) => {
    const lessonNo = String(index + 1).padStart(3, '0')
    const lessonVar = `lesson${lessonNo}`
    const lessonFile = `lesson${lessonNo}.js`
    const lessonAst = t.file(
      t.program([t.exportDefaultDeclaration(cloneNode(lessonNode))])
    )

    writeAstFile(path.join(chapterDir, lessonFile), lessonAst)
    lessonImports.push(buildImport(lessonVar, `./${lessonFile}`))
    lessonRefs.push(t.identifier(lessonVar))
  })

  lessonProperty.key = t.identifier('lesson')
  lessonProperty.value = t.arrayExpression(lessonRefs)

  const indexAst = t.file(
    t.program([
      ...lessonImports,
      t.exportDefaultDeclaration(exportObject)
    ])
  )

  writeAstFile(path.join(chapterDir, 'index.js'), indexAst)
  fs.unlinkSync(filePath)
}

const run = () => {
  LEVELS.forEach(({ name, count }) => {
    const levelDir = path.join(ROOT, name)
    for (let i = 1; i <= count; i += 1) {
      const chapterName = `ch${String(i).padStart(2, '0')}`
      splitChapterFile(path.join(levelDir, `${chapterName}.js`))
    }
  })
}

run()
