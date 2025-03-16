declare module 'vcard-parser' {
    export function parse(vcf: string, callback: (err: any, json: any) => void): void;
  }