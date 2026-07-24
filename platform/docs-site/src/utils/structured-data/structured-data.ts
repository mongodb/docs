/**
 * Classes to construct Structured Data JSON.
 * Required props should be read in constructor function (to fail validity).
 * Optional props can be set conditionally.
 * Constant values should be set in the constructor function.
 * Optional overwrites can be set in params as default values
 */

// Class name to help Smartling identify all structured data, if needed
export const STRUCTURED_DATA_CLASSNAME = 'structured_data';

export class StructuredData {
  '@context': string;
  '@type': string;

  constructor(type: string) {
    this['@context'] = 'https://schema.org';
    this['@type'] = type;
  }

  // TODO: improve this function
  isValid() {
    function recursiveValidity(param: unknown): boolean {
      // array
      if (Array.isArray(param)) {
        return param.every((e) => recursiveValidity(e));
      }
      // object
      else if (param && typeof param === 'object') {
        return Object.keys(param).every((e) => {
          if (param.hasOwnProperty(e)) return recursiveValidity(param[e as keyof typeof param]);
          return true;
        });
      }

      // string or number
      return String(param).length > 0;
    }

    return recursiveValidity(this);
  }

  toString() {
    return JSON.stringify(this).replace(/</g, '\\u003c');
  }

  static addCompanyToName(name: string | string[]): string | string[] {
    if (!name) {
      return name;
    }
    if (Array.isArray(name)) {
      return name.map((n) => this.addCompanyToName(n) as string);
    }
    if (name.toLowerCase().includes('mongodb')) {
      return name;
    }
    return `MongoDB ${name}`;
  }
}
