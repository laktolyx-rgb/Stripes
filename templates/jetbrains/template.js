// JetBrains plugin: UI theme (.theme.json) + editor color scheme (.xml) per variant.
// CI builds the plugin ZIP with Gradle (org.jetbrains.intellij.platform).
export const meta = {
  name: 'JetBrains IDEs',
  category: 'editor',
  homepage: 'https://www.jetbrains.com',
  install: 'Settings → Plugins → Marketplace → "Stripes"',
};

const noHash = (x) => x.replace('#', '');

function uiTheme(v) {
  const c = Object.fromEntries(Object.entries(v.colors).map(([k, x]) => [k, x.hex]));
  return {
    name: v.name,
    dark: v.dark,
    author: 'Stripes contributors',
    editorScheme: `/themes/stripes_${v.id}.xml`,
    colors: { ...c },
    ui: {
      '*': {
        background: 'crypt',
        foreground: 'bone',
        infoForeground: 'fog',
        selectionBackground: 'tomb',
        selectionForeground: 'ivory',
        selectionInactiveBackground: 'grave',
        selectionBackgroundInactive: 'grave',
        hoverBackground: 'grave',
        borderColor: 'grave',
        separatorColor: 'grave',
        disabledForeground: 'ash',
        disabledBackground: 'crypt',
        focusColor: 'blood',
        focusedBorderColor: 'blood',
        lightSelectionBackground: 'tomb',
        inactiveBackground: 'crypt',
        acceleratorForeground: 'fog',
      },
      Borders: { color: 'grave', ContrastBorderColor: 'grave' },
      Button: {
        startBackground: 'grave', endBackground: 'grave', startBorderColor: 'ash', endBorderColor: 'ash', foreground: 'bone',
        default: { startBackground: 'blood', endBackground: 'blood', foreground: 'midnight', startBorderColor: 'blood', endBorderColor: 'blood', focusedBorderColor: 'ivory' },
      },
      ComboBox: { background: 'midnight', nonEditableBackground: 'midnight', ArrowButton: { background: 'midnight', nonEditableBackground: 'midnight' } },
      TextField: { background: 'midnight' },
      TextArea: { background: 'midnight' },
      EditorPane: { background: 'midnight' },
      Component: { focusColor: 'blood', focusedBorderColor: 'blood', borderColor: 'grave', errorFocusColor: 'ember', inactiveErrorFocusColor: 'scar' },
      Link: { activeForeground: 'blood', hoverForeground: 'ember', pressedForeground: 'ember', visitedForeground: 'blood' },
      ProgressBar: { progressColor: 'blood', indeterminateStartColor: 'blood', indeterminateEndColor: 'scar', trackColor: 'grave' },
      ScrollBar: { Mac: { thumbColor: '#5c5c5c66', hoverThumbColor: '#5c5c5caa' }, thumbColor: '#5c5c5c66', hoverThumbColor: '#5c5c5caa' },
      TabbedPane: { underlineColor: 'blood', focusColor: 'grave', hoverColor: 'grave' },
      EditorTabs: { underlinedTabBackground: 'midnight', underlineColor: 'blood', inactiveUnderlineColor: 'ash', background: 'crypt', hoverBackground: 'midnight' },
      ToolWindow: { Header: { background: 'crypt', inactiveBackground: 'crypt' }, HeaderTab: { selectedInactiveBackground: 'grave', hoverBackground: 'grave', underlineColor: 'blood' } },
      MainToolbar: { background: 'crypt', inactiveBackground: 'crypt' },
      StatusBar: { background: 'crypt', borderColor: 'grave' },
      Tree: { background: 'crypt', selectionBackground: 'tomb', selectionInactiveBackground: 'grave', rowHeight: 24 },
      List: { background: 'crypt', selectionBackground: 'tomb', selectionInactiveBackground: 'grave' },
      Table: { background: 'crypt', stripeColor: 'midnight', selectionBackground: 'tomb' },
      Popup: { background: 'crypt', borderColor: 'grave', Header: { activeBackground: 'crypt', inactiveBackground: 'crypt' } },
      PopupMenu: { background: 'crypt', selectionBackground: 'tomb' },
      Menu: { background: 'crypt', selectionBackground: 'tomb', separatorColor: 'grave' },
      MenuBar: { borderColor: 'grave' },
      Notification: { background: 'crypt', borderColor: 'grave', errorBackground: 'scar', errorBorderColor: 'ember' },
      Counter: { background: 'blood', foreground: 'midnight' },
      ToolTip: { background: 'crypt', borderColor: 'grave' },
      SearchMatch: { startBackground: 'blood', endBackground: 'blood' },
      Plugins: { tagBackground: 'grave', tagForeground: 'bone', Button: { installBackground: 'blood', installForeground: 'midnight', installBorderColor: 'blood' } },
      FileColor: { Yellow: 'grave', Green: 'grave', Blue: 'grave', Rose: 'scar', Orange: 'scar', Violet: 'grave' },
      VersionControl: { GitGreen: 'bone', GitLog: { headIconColor: 'blood', localBranchIconColor: 'ivory', remoteBranchIconColor: 'smoke', tagIconColor: 'fog' } },
    },
    icons: { ColorPalette: { 'Actions.Red': c.blood, 'Actions.Grey': c.smoke, 'Objects.Red': c.blood, 'Objects.Grey': c.smoke } },
  };
}

function scheme(v) {
  const r = v.roles, c = Object.fromEntries(Object.entries(v.colors).map(([k, x]) => [k, x.hex]));
  const font = (role) => (role.bold ? 1 : 0) + (role.italic ? 2 : 0);
  const attr = (name, role, extra = '') =>
    `    <option name="${name}">\n      <value>\n        <option name="FOREGROUND" value="${noHash(role.hex)}" />\n${font(role) ? `        <option name="FONT_TYPE" value="${font(role)}" />\n` : ''}${extra}      </value>\n    </option>`;
  const bgAttr = (name, bg, extra = '') =>
    `    <option name="${name}">\n      <value>\n        <option name="BACKGROUND" value="${noHash(bg)}" />\n${extra}      </value>\n    </option>`;
  const effect = (color, type) => `        <option name="EFFECT_COLOR" value="${noHash(color)}" />\n        <option name="EFFECT_TYPE" value="${type}" />\n`;
  return `<scheme name="${v.name}" version="142" parent_scheme="${v.dark ? 'Darcula' : 'Default'}">
  <metaInfo>
    <property name="created">2026-11-18T00:00:00</property>
    <property name="ide">idea</property>
    <property name="originalScheme">${v.name}</property>
  </metaInfo>
  <colors>
    <option name="CARET_COLOR" value="${noHash(c.ivory)}" />
    <option name="CARET_ROW_COLOR" value="${noHash(c.grave)}" />
    <option name="CONSOLE_BACKGROUND_KEY" value="${noHash(c.crypt)}" />
    <option name="GUTTER_BACKGROUND" value="${noHash(c.midnight)}" />
    <option name="INDENT_GUIDE" value="${noHash(c.grave)}" />
    <option name="SELECTED_INDENT_GUIDE" value="${noHash(c.ash)}" />
    <option name="LINE_NUMBERS_COLOR" value="${noHash(c.ash)}" />
    <option name="LINE_NUMBER_ON_CARET_ROW_COLOR" value="${noHash(c.ivory)}" />
    <option name="METHOD_SEPARATORS_COLOR" value="${noHash(c.grave)}" />
    <option name="RIGHT_MARGIN_COLOR" value="${noHash(c.grave)}" />
    <option name="SELECTION_BACKGROUND" value="${noHash(c.tomb)}" />
    <option name="SELECTION_FOREGROUND" value="" />
    <option name="TEARLINE_COLOR" value="${noHash(c.grave)}" />
    <option name="WHITESPACES" value="${noHash(c.grave)}" />
    <option name="ADDED_LINES_COLOR" value="${noHash(c.bone)}" />
    <option name="MODIFIED_LINES_COLOR" value="${noHash(c.smoke)}" />
    <option name="DELETED_LINES_COLOR" value="${noHash(c.ember)}" />
    <option name="VCS_ANNOTATIONS_COLOR_1" value="${noHash(c.ash)}" />
    <option name="DOCUMENTATION_COLOR" value="${noHash(c.crypt)}" />
    <option name="ScrollBar.Mac.thumbColor" value="5c5c5c66" />
  </colors>
  <attributes>
    <option name="TEXT">
      <value>
        <option name="FOREGROUND" value="${noHash(c.bone)}" />
        <option name="BACKGROUND" value="${noHash(c.midnight)}" />
      </value>
    </option>
${attr('DEFAULT_KEYWORD', r.keyword)}
${attr('DEFAULT_STRING', r.string)}
${attr('DEFAULT_VALID_STRING_ESCAPE', r.escape)}
${attr('DEFAULT_INVALID_STRING_ESCAPE', r.error, effect(c.ember, 2))}
${attr('DEFAULT_NUMBER', r.number)}
${attr('DEFAULT_CONSTANT', r.constant)}
${attr('DEFAULT_LINE_COMMENT', r.comment)}
${attr('DEFAULT_BLOCK_COMMENT', r.comment)}
${attr('DEFAULT_DOC_COMMENT', r.comment)}
${attr('DEFAULT_DOC_COMMENT_TAG', { ...r.comment, bold: true })}
${attr('DEFAULT_DOC_COMMENT_TAG_VALUE', r.comment)}
${attr('DEFAULT_DOC_MARKUP', r.comment)}
${attr('DEFAULT_FUNCTION_DECLARATION', r.function)}
${attr('DEFAULT_FUNCTION_CALL', r.function)}
${attr('DEFAULT_STATIC_METHOD', r.method)}
${attr('DEFAULT_INSTANCE_METHOD', r.method)}
${attr('DEFAULT_CLASS_NAME', r.type)}
${attr('DEFAULT_CLASS_REFERENCE', r.type)}
${attr('DEFAULT_INTERFACE_NAME', r.type)}
${attr('DEFAULT_IDENTIFIER', r.variable)}
${attr('DEFAULT_LOCAL_VARIABLE', r.variable)}
${attr('DEFAULT_GLOBAL_VARIABLE', r.variable)}
${attr('DEFAULT_PARAMETER', r.parameter)}
${attr('DEFAULT_INSTANCE_FIELD', r.property)}
${attr('DEFAULT_STATIC_FIELD', r.constant)}
${attr('DEFAULT_OPERATION_SIGN', r.operator)}
${attr('DEFAULT_BRACES', r.punctuation)}
${attr('DEFAULT_BRACKETS', r.punctuation)}
${attr('DEFAULT_PARENTHS', r.punctuation)}
${attr('DEFAULT_COMMA', r.punctuation)}
${attr('DEFAULT_SEMICOLON', r.punctuation)}
${attr('DEFAULT_DOT', r.punctuation)}
${attr('DEFAULT_METADATA', r.attribute)}
${attr('DEFAULT_LABEL', r.punctuation)}
${attr('DEFAULT_PREDEFINED_SYMBOL', r.constant)}
${attr('DEFAULT_TAG', r.tag)}
${attr('DEFAULT_ATTRIBUTE', r.attribute)}
${attr('DEFAULT_ENTITY', r.escape)}
${attr('DEFAULT_TEMPLATE_LANGUAGE_COLOR', r.foreground)}
${attr('HTML_TAG_NAME', r.tag)}
${attr('HTML_ATTRIBUTE_NAME', r.attribute)}
${attr('XML_TAG_NAME', r.tag)}
${attr('XML_ATTRIBUTE_NAME', r.attribute)}
${attr('JS.REGEXP', r.regex)}
${attr('MARKDOWN_HEADER_LEVEL_1', r.keyword)}
${attr('MARKDOWN_HEADER_LEVEL_2', r.keyword)}
${attr('MARKDOWN_LINK_DESTINATION', r.accent, effect(c.blood, 1))}
${bgAttr('SEARCH_RESULT_ATTRIBUTES', c.scar)}
${bgAttr('WRITE_SEARCH_RESULT_ATTRIBUTES', c.scar)}
${bgAttr('TEXT_SEARCH_RESULT_ATTRIBUTES', c.scar)}
${bgAttr('IDENTIFIER_UNDER_CARET_ATTRIBUTES', c.tomb)}
${bgAttr('WRITE_IDENTIFIER_UNDER_CARET_ATTRIBUTES', c.tomb, effect(c.ivory, 1))}
    <option name="MATCHED_BRACE_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="${noHash(c.blood)}" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="ERRORS_ATTRIBUTES">
      <value>
        <option name="EFFECT_COLOR" value="${noHash(c.ember)}" />
        <option name="EFFECT_TYPE" value="2" />
        <option name="ERROR_STRIPE_COLOR" value="${noHash(c.ember)}" />
      </value>
    </option>
    <option name="WARNING_ATTRIBUTES">
      <value>
        <option name="EFFECT_COLOR" value="${noHash(c.ivory)}" />
        <option name="EFFECT_TYPE" value="2" />
        <option name="ERROR_STRIPE_COLOR" value="${noHash(c.ivory)}" />
      </value>
    </option>
    <option name="NOT_USED_ELEMENT_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="${noHash(c.ash)}" />
      </value>
    </option>
    <option name="TODO_DEFAULT_ATTRIBUTES">
      <value>
        <option name="FOREGROUND" value="${noHash(c.blood)}" />
        <option name="FONT_TYPE" value="3" />
      </value>
    </option>
  </attributes>
</scheme>
`;
}

export function render({ variants, h, palette, config }) {
  const files = {};
  for (const v of variants) {
    files[`src/main/resources/themes/stripes_${v.id}.theme.json`] = h.json(uiTheme(v));
    files[`src/main/resources/themes/stripes_${v.id}.xml`] = scheme(v);
  }
  files['src/main/resources/META-INF/plugin.xml'] = `<idea-plugin>
  <id>${config.jetbrains.id}</id>
  <name>Stripes Theme</name>
  <vendor url="${config.repoUrl}">Stripes</vendor>
  <description><![CDATA[
    A gothic black &amp; white theme with a single drop of blood.<br/>
    Four variants: <b>Night</b>, <b>Bone</b> (light), <b>Void</b> (OLED) and <b>Blood</b> (high contrast, WCAG AAA).
  ]]></description>
  <depends>com.intellij.modules.platform</depends>
  <extensions defaultExtensionNs="com.intellij">
${variants.map((v) => `    <themeProvider id="stripes-${v.id}" path="/themes/stripes_${v.id}.theme.json"/>`).join('\n')}
  </extensions>
</idea-plugin>
`;
  files['gradle.properties'] = `pluginVersion=${palette.version}\npluginSinceBuild=233\npluginGroup=${config.jetbrains.group}\norg.gradle.jvmargs=-Xmx1g\n`;
  return files;
}
