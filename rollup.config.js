import svgSprites from 'rollup-plugin-svg-sprites'
import requireContext from 'rollup-plugin-require-context'

// function kebabCase2PascalCase(name) {
//   name = name.replace(/-(\w)/g, (all, letter) => {
//     return letter.toUpperCase()
//   })
//   return name.substr(0, 1).toUpperCase() + name.substr(1)
// }

export default {
  input: './src/load-svg.js',
  output: {
    format: 'esm',
    file: `lib/load-svg.js`,
    banner: '/* eslint-disable */'
  },
  plugins: [
    requireContext(),
    svgSprites({
      symbolId(filePath) {
        const paths = filePath
          .replace(/\\/g, '/')
          .split('icons/')[1]
          .split('/')

        const fileName = paths.pop().replace('.svg', '')
        return fileName
      }
    })
  ],
}