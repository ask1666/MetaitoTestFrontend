module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    component,
    {
      libraryName: 'normalize.css',
      style: false
    }
  ]
}
