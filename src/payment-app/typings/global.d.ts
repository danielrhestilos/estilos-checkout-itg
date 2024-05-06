declare module '*.css' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames
  export = classNames
}

interface Window {
  vtexjs: any
  $: any // JQuery types
}

interface IncomingFile {
  uploadFile: { fileUrl: string }
}
