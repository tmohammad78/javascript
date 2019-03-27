const path=require('path');
const htmlwebpackplugin=require('html-webpack-plugin');

module.exports ={
    entry:'./src/js/index.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'js/bundle.js'
    },
    devServer:{
        contentBase:'./dist'
    },
    plugins:[
        new htmlwebpackplugin({
                filename:"index.html",
                template:"./src/index.html"            
        })
    ]    
};