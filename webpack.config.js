const path = require('path') // Підключаємо модуль path для роботи зі шляхами
const HtmlWebpackPlugin = require('html-webpack-plugin') // Підключаємо плагін для генерації HTML файлу
const {CleanWebpackPlugin} = require('clean-webpack-plugin') // Підключаємо плагін для очищення директорії dist перед збіркою

module.exports = {
  context: path.resolve(__dirname, 'src'), // Встановлюємо базову директорію для точок входу
  mode: 'development', // Встановлюємо режим збірки як розробницький
  entry: { // Визначаємо точки входу
    main: './index.js', // Основний файл додатку
  },
  output: { // Налаштування виводу
    path: path.resolve(__dirname, 'dist'), // Шлях для згенерованих файлів
    filename: 'js/[name].[contenthash].js', // Шаблон імені файлу з хешем для кешування
  },
  resolve: { // Розв'язування модулів
    alias: { // Аліаси для шляхів
      '@': path.resolve(__dirname, 'src'), // Аліас для директорії src
      '@css': path.resolve(__dirname, 'src/css'), // Аліас для CSS файлів
      '@assets': path.resolve(__dirname, 'src/assets'), // Аліас для активів
    },
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'], // Розширення файлів, які можна опускати при імпорті
  },
  optimization: { // Оптимізація збірки
    splitChunks: { // Виокремлення спільних частин
      chunks: 'all', // Виокремлюємо усі спільні модулі
    },
  },
  plugins: [ // Підключення плагінів
    new HtmlWebpackPlugin({ // Генерація HTML файлу
      template: './index.html' // Шаблон HTML
    }),
    new CleanWebpackPlugin(), // Очищення директорії dist
  ],
  module: { // Налаштування модулів
    rules: [ // Правила для лоадерів
      {
        test: /.s[ac]ss$/i, // Правило для CSS файлів
        use: [
          'style-loader', // Додає CSS до DOM через тег <style>
          'css-loader', // Обробляє @import та url()
            'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i, // Правило для зображень
        type

: 'asset/resource', // Генерує URL та виводить файл у директорію
        generator: {
          filename: 'assets/images/[name].[hash][ext]', // Шаблон імені файлу для зображень
        }
      },
      {
        test: /\\.(woff|woff2|ttf|eot)$/i, // Правило для шрифтів
        type: 'asset/resource', // Генерує URL та виводить файл у директорію
        generator: {
          filename: 'assets/fonts/[name].[hash][ext]', // Шаблон імені файлу для шрифтів
        }
      },
      {
        test: /\\.xml$/, // Правило для XML файлів
        use: [
          'xml-loader' // Перетворює XML у JSON
        ]
      },
      {
        test: /\\.csv$/, // Правило для CSV файлів
        use: [
          'csv-loader' // Перетворює CSV у JSON
        ]
      }
    ]
  }
}
