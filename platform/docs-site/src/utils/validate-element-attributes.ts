const globalEventHandlerAttributes = [
  'onabort',
  'onautocomplete',
  'onautocompleteerror',
  'onblur',
  'oncancel',
  'oncanplay',
  'oncanplaythrough',
  'onchange',
  'onclick',
  'onclose',
  'oncontextmenu',
  'oncuechange',
  'ondblclick',
  'ondrag',
  'ondragend',
  'ondragenter',
  'ondragleave',
  'ondragover',
  'ondragstart',
  'ondrop',
  'ondurationchange',
  'onemptied',
  'onended',
  'onerror',
  'onfocus',
  'oninput',
  'oninvalid',
  'onkeydown',
  'onkeypress',
  'onkeyup',
  'onload',
  'onloadeddata',
  'onloadedmetadata',
  'onloadstart',
  'onmousedown',
  'onmouseenter',
  'onmouseleave',
  'onmousemove',
  'onmouseout',
  'onmouseover',
  'onmouseup',
  'onmousewheel',
  'onpause',
  'onplay',
  'onplaying',
  'onprogress',
  'onratechange',
  'onreset',
  'onresize',
  'onscroll',
  'onseeked',
  'onseeking',
  'onselect',
  'onshow',
  'onsort',
  'onstalled',
  'onsubmit',
  'onsuspend',
  'ontimeupdate',
  'ontoggle',
  'onvolumechange',
  'onwaiting',
];

const globalHTMLAttributes = [
  'accesskey',
  'autocapitalize',
  'autofocus',
  'classname', // Handle React cases
  'contenteditable',
  'data-*', // Any attribute that starts with 'data-' is a global attribute
  'dir',
  'draggable',
  'enterkeyhint',
  'hidden',
  'id',
  'inert',
  'inputmode',
  'is',
  'itemid',
  'itemprop',
  'itemref',
  'itemscope',
  'itemtype',
  'lang',
  'nonce',
  'part',
  'popover',
  'role',
  'slot',
  'spellcheck',
  'style',
  'tabindex',
  'title',
  'translate',
];

// Validate component props from vendors
const gatsbyLinkProps = [
  'to',
  'replace',
  'state',
  'getprops',
  'innerref',
  'partiallyactive',
  'activeclassname',
  'activestyle',
];

const anchorTagAttributes = [
  ...globalEventHandlerAttributes,
  ...globalHTMLAttributes,
  ...gatsbyLinkProps,
  'href',
  'hreflang',
  'media',
  'ping',
  'rel',
  'target',
  'type',
  'referrerpolicy',
  'download',
];

const dataAndRoleBasedAttributes = [
  /^data-/, // Matches any data attribute
  /^aria-/, // Matches any Role Aria base attribute
];

export const elements = {
  anchor: anchorTagAttributes,
};

/**
 * Filter props based on validAttributes and regexPatterns
 * @param {string} elementType
 * @param {object} props // potential suitor for HTML attributes
 */
export const validateHTMAttributes = (elementType: string, props: Record<string, unknown>) => {
  const ele = elements[elementType as keyof typeof elements];

  if (ele) {
    return props
      ? Object.keys(props).reduce((attributes, propKey) => {
          // propKey values should be lowercase to account for
          // React's HTML attributes in camelCase
          if (ele.includes(propKey.toLocaleLowerCase())) {
            (attributes as Record<string, unknown>)[propKey] = props[propKey];
          } else {
            const isDataOrAriaAttribute = dataAndRoleBasedAttributes.some((pattern) => pattern.test(propKey));
            if (isDataOrAriaAttribute) {
              (attributes as Record<string, unknown>)[propKey] = props[propKey];
            }
          }

          return attributes;
        }, {})
      : {};
  }

  // Provide hint to user on available element and return the props in it's origin form
  console.error(
    `Please check that you are using the correct elementType, available types are ${Object.keys(elements)}`,
  );
  return props;
};
