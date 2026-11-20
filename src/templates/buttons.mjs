// Button treatment adapted from Uiverse.io by doniaskima.
function enhanceButtons(html) {
  return html.replace(/<(button|a)\b([^>]*)>([\s\S]*?)<\/\1>/g, (markup, tag, attributes, content) => {
    const classMatch = attributes.match(/class="([^"]*)"/);
    const classes = classMatch?.[1].split(/\s+/) ?? [];
    const actionLink = classes.some((name) => ['button', 'home-button', 'mobile-sheet-feature', 'mobile-dock-link'].includes(name));
    if (tag === 'a' && !actionLink) return markup;
    const updatedAttributes = classMatch
      ? attributes.replace(classMatch[0], 'class="' + classMatch[1] + ' btn-17"')
      : attributes + ' class="btn-17"';
    const wrapLabel = !content.includes('<') || (actionLink && !classes.includes('mobile-dock-link'));
    const label = wrapLabel
      ? '<span class="btn-17-text-container"><span class="btn-17-text">' + content + '</span></span>'
      : content;
    return '<' + tag + updatedAttributes + '>' + label + '</' + tag + '>';
  });
}

export { enhanceButtons };
