import * as P from 'parsimmon'

/*
 * SELECT * FROM table;
 *
 * UPDATE table SET field1 = 2, field2 = '12' WHERE field3 > 10
 *
 * DELETE FROM table WHERE field1 = 2 AND field3 > 10
 *
 * INSERT table VALUE
 *
 */

const lexeme = p => p.skip(P.optWhitespace)
const opt = p => p.or(P.succeed(null))
const sepBy1All = (p, sep) => P.seq(p, P.seq(sep, p).many()).map(node => [node[0]].concat(node[1][0]).concat(node[1][1]))

const selectAction = lexeme(P.regex(/SELECT/i))
const insertAction = lexeme(P.regex(/INSERT INTO/i))

const fromClause = lexeme(P.regex(/FROM/i))
const whereClause = lexeme(P.regex(/WHERE/i))
const filterClause = lexeme(P.regex(/FILTER/i))
const valuesClause = lexeme(P.regex(/VALUES/i))
const andClause = lexeme(P.regex(/AND/i))
const orClause = lexeme(P.regex(/OR/i))
const notClause = lexeme(P.regex(/NOT/i))
const inClause = lexeme(P.regex(/IN/i))
const betweenClause = lexeme(P.regex(/BETWEEN/i))
const colon = lexeme(P.string(':'))
const semicolon = lexeme(P.string(';'))
const comma = lexeme(P.string(','))
const dot = lexeme(P.string('.'))
const less = lexeme(P.string('<'))
const greater = lexeme(P.string('>'))
const lbrace = lexeme(P.string('{'))
const rbrace = lexeme(P.string('}'))
const lbracket = lexeme(P.string('['))
const rbracket = lexeme(P.string(']'))

const opEqual = lexeme(P.string('='))

const string = lexeme(P.regex(/"((?:\\.|.)*?)"/, 1))
const number = lexeme(P.regex(/-?(0|[1-9]\d*)([.]\d+)?(e[+-]?\d+)?/i))
const binary = lexeme(P.seq(
  P.regex(/b:|base64:/i),
  P.regex(/([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?/)
)).map(node => node[1])

const tableName = lexeme(P.regex(/[a-zA-Z0-9_\-\.]{3,255}/))

const reservedWordAttributeName = lexeme(
  P.regex(/ABORT|ABSOLUTE|ACTION|ADD|AFTER|AGENT|AGGREGATE|ALL|ALLOCATE|ALTER|ANALYZE|AND|ANY|ARCHIVE|ARE|ARRAY|AS|ASC|ASCII|ASENSITIVE|ASSERTION|ASYMMETRIC|AT|ATOMIC|ATTACH|ATTRIBUTE|AUTH|AUTHORIZATION|AUTHORIZE|AUTO|AVG|BACK|BACKUP|BASE|BATCH|BEFORE|BEGIN|BETWEEN|BIGINT|BINARY|BIT|BLOB|BLOCK|BOOLEAN|BOTH|BREADTH|BUCKET|BULK|BY|BYTE|CALL|CALLED|CALLING|CAPACITY|CASCADE|CASCADED|CASE|CAST|CATALOG|CHAR|CHARACTER|CHECK|CLASS|CLOB|CLOSE|CLUSTER|CLUSTERED|CLUSTERING|CLUSTERS|COALESCE|COLLATE|COLLATION|COLLECTION|COLUMN|COLUMNS|COMBINE|COMMENT|COMMIT|COMPACT|COMPILE|COMPRESS|CONDITION|CONFLICT|CONNECT|CONNECTION|CONSISTENCY|CONSISTENT|CONSTRAINT|CONSTRAINTS|CONSTRUCTOR|CONSUMED|CONTINUE|CONVERT|COPY|CORRESPONDING|COUNT|COUNTER|CREATE|CROSS|CUBE|CURRENT|CURSOR|CYCLE|DATA|DATABASE|DATE|DATETIME|DAY|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFERRABLE|DEFERRED|DEFINE|DEFINED|DEFINITION|DELETE|DELIMITED|DEPTH|DEREF|DESC|DESCRIBE|DESCRIPTOR|DETACH|DETERMINISTIC|DIAGNOSTICS|DIRECTORIES|DISABLE|DISCONNECT|DISTINCT|DISTRIBUTE|DO|DOMAIN|DOUBLE|DROP|DUMP|DURATION|DYNAMIC|EACH|ELEMENT|ELSE|ELSEIF|EMPTY|ENABLE|END|EQUAL|EQUALS|ERROR|ESCAPE|ESCAPED|EVAL|EVALUATE|EXCEEDED|EXCEPT|EXCEPTION|EXCEPTIONS|EXCLUSIVE|EXEC|EXECUTE|EXISTS|EXIT|EXPLAIN|EXPLODE|EXPORT|EXPRESSION|EXTENDED|EXTERNAL|EXTRACT|FAIL|FALSE|FAMILY|FETCH|FIELDS|FILE|FILTER|FILTERING|FINAL|FINISH|FIRST|FIXED|FLATTERN|FLOAT|FOR|FORCE|FOREIGN|FORMAT|FORWARD|FOUND|FREE|FROM|FULL|FUNCTION|FUNCTIONS|GENERAL|GENERATE|GET|GLOB|GLOBAL|GO|GOTO|GRANT|GREATER|GROUP|GROUPING|HANDLER|HASH|HAVE|HAVING|HEAP|HIDDEN|HOLD|HOUR|IDENTIFIED|IDENTITY|IF|IGNORE|IMMEDIATE|IMPORT|IN|INCLUDING|INCLUSIVE|INCREMENT|INCREMENTAL|INDEX|INDEXED|INDEXES|INDICATOR|INFINITE|INITIALLY|INLINE|INNER|INNTER|INOUT|INPUT|INSENSITIVE|INSERT|INSTEAD|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVALIDATE|IS|ISOLATION|ITEM|ITEMS|ITERATE|JOIN|KEY|KEYS|LAG|LANGUAGE|LARGE|LAST|LATERAL|LEAD|LEADING|LEAVE|LEFT|LENGTH|LESS|LEVEL|LIKE|LIMIT|LIMITED|LINES|LIST|LOAD|LOCAL|LOCALTIME|LOCALTIMESTAMP|LOCATION|LOCATOR|LOCK|LOCKS|LOG|LOGED|LONG|LOOP|LOWER|MAP|MATCH|MATERIALIZED|MAX|MAXLEN|MEMBER|MERGE|METHOD|METRICS|MIN|MINUS|MINUTE|MISSING|MOD|MODE|MODIFIES|MODIFY|MODULE|MONTH|MULTI|MULTISET|NAME|NAMES|NATIONAL|NATURAL|NCHAR|NCLOB|NEW|NEXT|NO|NONE|NOT|NULL|NULLIF|NUMBER|NUMERIC|OBJECT|OF|OFFLINE|OFFSET|OLD|ON|ONLINE|ONLY|OPAQUE|OPEN|OPERATOR|OPTION|OR|ORDER|ORDINALITY|OTHER|OTHERS|OUT|OUTER|OUTPUT|OVER|OVERLAPS|OVERRIDE|OWNER|PAD|PARALLEL|PARAMETER|PARAMETERS|PARTIAL|PARTITION|PARTITIONED|PARTITIONS|PATH|PERCENT|PERCENTILE|PERMISSION|PERMISSIONS|PIPE|PIPELINED|PLAN|POOL|POSITION|PRECISION|PREPARE|PRESERVE|PRIMARY|PRIOR|PRIVATE|PRIVILEGES|PROCEDURE|PROCESSED|PROJECT|PROJECTION|PROPERTY|PROVISIONING|PUBLIC|PUT|QUERY|QUIT|QUORUM|RAISE|RANDOM|RANGE|RANK|RAW|READ|READS|REAL|REBUILD|RECORD|RECURSIVE|REDUCE|REF|REFERENCE|REFERENCES|REFERENCING|REGEXP|REGION|REINDEX|RELATIVE|RELEASE|REMAINDER|RENAME|REPEAT|REPLACE|REQUEST|RESET|RESIGNAL|RESOURCE|RESPONSE|RESTORE|RESTRICT|RESULT|RETURN|RETURNING|RETURNS|REVERSE|REVOKE|RIGHT|ROLE|ROLES|ROLLBACK|ROLLUP|ROUTINE|ROW|ROWS|RULE|RULES|SAMPLE|SATISFIES|SAVE|SAVEPOINT|SCAN|SCHEMA|SCOPE|SCROLL|SEARCH|SECOND|SECTION|SEGMENT|SEGMENTS|SELECT|SELF|SEMI|SENSITIVE|SEPARATE|SEQUENCE|SERIALIZABLE|SESSION|SET|SETS|SHARD|SHARE|SHARED|SHORT|SHOW|SIGNAL|SIMILAR|SIZE|SKEWED|SMALLINT|SNAPSHOT|SOME|SOURCE|SPACE|SPACES|SPARSE|SPECIFIC|SPECIFICTYPE|SPLIT|SQL|SQLCODE|SQLERROR|SQLEXCEPTION|SQLSTATE|SQLWARNING|START|STATE|STATIC|STATUS|STORAGE|STORE|STORED|STREAM|STRING|STRUCT|STYLE|SUB|SUBMULTISET|SUBPARTITION|SUBSTRING|SUBTYPE|SUM|SUPER|SYMMETRIC|SYNONYM|SYSTEM|TABLE|TABLESAMPLE|TEMP|TEMPORARY|TERMINATED|TEXT|THAN|THEN|THROUGHPUT|TIME|TIMESTAMP|TIMEZONE|TINYINT|TO|TOKEN|TOTAL|TOUCH|TRAILING|TRANSACTION|TRANSFORM|TRANSLATE|TRANSLATION|TREAT|TRIGGER|TRIM|TRUE|TRUNCATE|TTL|TUPLE|TYPE|UNDER|UNDO|UNION|UNIQUE|UNIT|UNKNOWN|UNLOGGED|UNNEST|UNPROCESSED|UNSIGNED|UNTIL|UPDATE|UPPER|URL|USAGE|USE|USER|USERS|USING|UUID|VACUUM|VALUE|VALUED|VALUES|VARCHAR|VARIABLE|VARIANCE|VARINT|VARYING|VIEW|VIEWS|VIRTUAL|VOID|WAIT|WHEN|WHENEVER|WHERE|WHILE|WINDOW|WITH|WITHIN|WITHOUT|WORK|WRAPPED|WRITE|YEAR|ZONE/i)
).map(node => ({
  'type': 'reservedWord',
  'value': node
}))
const reservedAttributeName = lexeme(P.regex(/`[^`\\]*(?:\\.[^`\\]*)*`/)).map(node => ({
  'type': 'reserved',
  'value': node.slice(1, -1)
}))
const placeholderAttributeName = lexeme(P.regex(/#[a-zA-Z0-9_]+/)).map(node => ({
  'type': 'placeholder',
  'value': node.slice(1)
}))
const normalAttributeName = lexeme(P.regex(/^[a-zA-Z][a-zA-Z0-9]*/)).map(node => ({
  'type': 'normal',
  'value': node
}))
const pathListIndex = P.string('[').then(P.regex(/\d*/)).skip(P.string(']')).map(parseInt)

const attributeName = P.alt(
  reservedWordAttributeName,
  reservedAttributeName,
  placeholderAttributeName,
  normalAttributeName
)

const dataAttributeName = P.alt(
  reservedWordAttributeName,
  reservedAttributeName,
  normalAttributeName
)

// const attributePath = attributeName.map(node => ({
//   'type': 'attribute',
//   'value': node
// }))
// const hashKeyPath = lexeme(P.string('@@').then(attributeName)).map(node => ({
//   'type': 'hashKey',
//   'value': node
// }))
// const rangeKeyPath = lexeme(P.string('@').then(attributeName)).map(node => ({
//   'type': 'rangeKey',
//   'value': node
// }))

const projection = P.alt(
  lexeme(P.string('*')).map(() => ({'type': 'ALL'})),
  P.sepBy(attributeName, lexeme(P.string(','))).map((node) => ({
    'type': 'INCLUDE',
    'attributes': node
  }))
)

const path = P.seq(
  P.sepBy1(
    attributeName,
    dot
  ),
  pathListIndex.many()
).map(node => ({
  'type': 'path',
  'attributes': node[0],
  'index': node[1]
}))

const lparen = lexeme(P.string('('))
const rparen = lexeme(P.string(')'))

// const operand = P.alt(
// )

// const condition = P.alt(
// )

// const attrName = P.alt(
//   P.regex(/[a-zA-Z0-9_\-\.]+/i),
//   regex(/`[^`\\]*(?:\\.[^`\\]*)*`/)
// );

// const tableAndAttrName = P.seq(
//   tableName,
//   P.string('.'),
//   attrName
// )

// const updateOperation = P.alt(
//   P.string('+'),
//   P.string('-'),
//   P.regex(/IS NOT EXISTS/i)
// )

const conditionComparator = lexeme(P.alt(
  P.string('='),
  P.string('<>'),
  P.string('<'),
  P.string('<='),
  P.string('>'),
  P.string('>=')
))

const dataType = lexeme(P.seq(
  P.string('@'),
  P.alt(
    P.regex(/SS|stringset/i).result('SS'),
    P.regex(/S|string/i).result('S'),
    P.regex(/NS|numberset/i).result('NS'),
    P.regex(/NULL/i).result('NULL'),
    P.regex(/N|number/i).result('N'),
    P.regex(/BS|binaryset/i).result('BS'),
    P.regex(/BOOL|boolean/i).result('BOOL'),
    P.regex(/B|binary/i).result('B'),
    P.regex(/L|list/i).result('L'),
    P.regex(/M|map/i).result('M')
  )
)).map(node => ({
  'type': 'type',
  'value': node[1]
}))

const conditionFunctionAttributeExists = P.seq(
  lexeme(P.regex(/attribute_exists|exists/i)),
  lparen,
  path,
  rparen
).map(node => ({
  'type': 'function',
  'function': 'attribute_exists',
  'args': [node[2]]
}))

const conditionFunctionAttributeNotExists = P.seq(
  lexeme(P.regex(/attribute_not_exists|notexists|not_exists/i)),
  lparen,
  path,
  rparen
).map(node => ({
  'type': 'function',
  'function': 'attribute_not_exists',
  'args': [node[2]]
}))

const conditionFunctionAttributeType = P.seq(
  lexeme(P.regex(/attribute_type|type/i)),
  lparen,
  path,
  comma,
  dataType,
  rparen
).map(node => ({
  'type': 'function',
  'function': 'attribute_type',
  'args': [node[2], node[4]]
}))

const conditionFunctionBeginsWith = P.seq(
  lexeme(P.regex(/begins_with|beginswith/)),
  lparen,
  path,
  comma,
  string,
  rparen
).map(node => ({
  'type': 'function',
  'function': 'begins_with',
  'args': [node[2], {'type': 'string', 'value': node[4]}]
}))

const conditionFunctionSize = P.seq(
  lexeme(P.regex(/size/)),
  lparen,
  path,
  rparen
).map(node => ({
  'type': 'function',
  'function': 'size',
  'args': [node[2]]
}))

// (a and b) and c
// a and (b and c)
// a in [c,d,e] and g > a and exists(k)

const condition = P.lazy(
  'a condition expression',
  () => sepBy1All(
    P.alt(
      notClause.then(condition).map(node => ({ 'type': 'NOT', 'condition': node })),
      conditionFunctionExpression,
      conditionComparisonExpression,
      conditionInExpression,
      conditionBetweenExpression,
      lparen.then(condition.many()).skip(rparen).map(node => node[0])
    ),
    P.alt(
      andClause.result('AND'),
      orClause.result('OR')
    )
  ).map(node => ({
    'type': 'condition',
    'node': node
  }))
)

const conditionDataOperand = P.alt(
  number.map(node => ({'type': 'number', 'value': node})),
  string.map(node => ({'type': 'string', 'value': node}))
)

const conditionOperand = P.alt(
  conditionDataOperand,
  conditionFunctionSize,
  path
)

const conditionFunctionExpression = P.alt(
  conditionFunctionAttributeExists,
  conditionFunctionAttributeNotExists,
  conditionFunctionAttributeType,
  conditionFunctionBeginsWith
)

const conditionInExpression = P.seq(
  conditionOperand,
  inClause,
  lparen,
  P.sepBy1(
    conditionOperand,
    comma
  ),
  rparen
).map(node => ({
  'type': 'in',
  'operand': node[0],
  'list': node[3]
}))

const conditionBetweenExpression = P.seq(
  conditionOperand,
  betweenClause,
  conditionOperand,
  andClause,
  conditionOperand
).map(node => ({
  'type': 'between',
  'operand': node[0],
  'min': node[2],
  'max': node[4]
}))

const conditionComparisonExpression = P.seq(
  conditionOperand,
  conditionComparator,
  conditionOperand
).map(node => ({
  'type': 'compare',
  'left': node[0],
  'comparator': node[1],
  'right': node[2]
}))

const hashKeyConditionExpression = P.seq(
  path,
  opEqual,
  conditionDataOperand
).map(node => ({
  'hashKey': node[0],
  'value': node[2]
}))

const rangeKeyConditionExpression = P.seq(
  path,
  conditionComparator,
  conditionDataOperand
).map(node => ({
  'rangeKey': node[0],
  'comparator': node[1],
  'value': node[2]
}))

const whereExpression = P.seq(
  whereClause,
  hashKeyConditionExpression,
  opt(andClause.then(rangeKeyConditionExpression))
).map(node => ({
  'hashKeyCondition': node[1],
  'rangeKeyCondition': node[2]
}))

const data = P.lazy('a data', () => P.alt(
  numberData,
  stringData,
  binaryData,
  nullData,
  boolData,
  numberSetData,
  stringSetData,
  binarySetData,
  listData,
  mapData
))

const numberData = number.map(node => ({'type': 'number', 'value': node}))
const stringData = string.map(node => ({'type': 'string', 'value': node}))
const binaryData = binary.map(node => ({'type': 'binary', 'value': node}))
const nullData = lexeme(P.regex(/null/i)).result({'type': 'null', 'value': 'null'})
const boolData = lexeme(P.regex(/true|false/i)).map(node => ({
  'type': 'bool',
  'value': node.toLowerCase()
}))
const numberSetData = P.seq(
  less,
  P.sepBy1(
    number,
    comma
  ),
  greater
).map(node => ({
  'type': 'numberSet',
  'value': node[1]
}))
const stringSetData = P.seq(
  less,
  P.sepBy1(
    string,
    comma
  ),
  greater
).map(node => ({
  'type': 'stringSet',
  'value': node[1]
}))
const binarySetData = P.seq(
  less,
  P.sepBy1(
    binary,
    comma
  ),
  greater
).map(node => ({
  'type': 'binarySet',
  'value': node[1]
}))
const listData = P.seq(
  lbracket,
  P.sepBy1(
    data,
    comma
  ),
  rbracket
).map(node => ({
  'type': 'list',
  'value': node[1]
}))
const mapData = P.seq(
  lbrace,
  P.sepBy1(
    P.seq(
      dataAttributeName,
      colon,
      data
    ).map(node => ({
      'attribute': node[0],
      'value': node[2]
    })),
    comma
  ),
  rbrace
).map(node => ({
  'type': 'map',
  'value': node[1]
}))

const columnsExpression = P.seq(
  lparen,
  P.sepBy1(
    dataAttributeName,
    comma
  ),
  rparen
).map(node => ({
  'type': 'columns',
  'columns': node[1]
}))

const valuesExpression = P.sepBy1(
  P.seq(
    lparen,
    P.sepBy1(
      data,
      comma
    ),
    rparen
  ).map(node => node[1]),
  comma
).map(node => ({
  'type': 'values',
  'values': node
}))

// https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.AccessingItemAttributes.html#DocumentPaths

const selectParser = P.seq(
  selectAction.then(projection),
  fromClause.then(tableName),
  opt(whereExpression),
  opt(filterClause.then(condition))
).map(node => ({
  'action': 'select',
  'projection': node[0],
  'table': node[1],
  'where': node[2],
  'filter': node[3]
}))

const insertParser = P.seq(
  insertAction.then(tableName),
  columnsExpression,
  valuesClause.then(valuesExpression)
).map(node => ({
  'action': 'insert',
  'table': node[0],
  'columns': node[1],
  'values': node[2]
}))

console.log(conditionFunctionExpression)
console.log(conditionComparisonExpression)
console.log(conditionBetweenExpression)
console.log(conditionInExpression)
console.log(tableName)
console.log(path)
console.log(notClause)
console.log(whereClause)
console.log(semicolon)
console.log(pathListIndex)
console.log(condition)
console.log(number)

const queryParser = P.seq(
  P.alt(
    selectParser,
    insertParser
  ),
  semicolon
)

export default class {
  parse (ddqlQuery) {
    return queryParser.parse(ddqlQuery)
  }
}
