module.exports = {
    devServer: {
        proxy: {
            '/get.json': {
                target: 'http://localhost:8000/',
                ws: false,
                // 将主机标头的原点更改为目标URL
                changeOrigin: true,
                logLevel: 'debug',
            },
        }

    }
}