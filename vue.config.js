module.exports = {
    devServer: {
        proxy: {
            '/api/': {
                target: 'http://localhost:6789/',
                ws: false,
                // 将主机标头的原点更改为目标URL
                changeOrigin: true,
                logLevel: 'debug',
            },
        }

    }
}

