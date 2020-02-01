module.exports = {
    devServer: {
        proxy: {
            '/hello': {
                target: 'http://localhost:8080/',
                ws: false,
                // 将主机标头的原点更改为目标URL
                changeOrigin: true,
                logLevel: 'debug',
            },
        }

    }
}