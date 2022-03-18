interface Scripts {
  name: string;
  src: string;
}
export const ScriptStore: Scripts[] = [
  {name:'charts.js',src:'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.bundle.min.js'},
  {name: 'bs-init', src: 'assets/js/bs-init.js'},
  {name: 'theme', src: 'assets/js/theme.js'},
];
