module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/basketball-app/'
        : '/',
    devServer: {
        host: 'localhost',
        port: 4000,
    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'Basketball App'
                return args
            })
    }
}