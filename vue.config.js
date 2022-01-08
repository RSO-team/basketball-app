module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/basketball-app/'
        : '/',
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'Basketball App'
                return args
            })
    }
}