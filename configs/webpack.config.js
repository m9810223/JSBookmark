const path = require('path');
const fs = require('fs');

const base_dir = path.resolve(`${__dirname}/..`);
const src_dir = `${base_dir}/src`;
const dist_dir = `${base_dir}/dist/js`;

module.exports = (env, argv) => {
  const default_config = (fn) => {
    const config = {
      name: `${fn}`,
      mode: env.WEBPACK_SERVE ? 'development' : 'production',
      stats: {
        modules: false, // 減少訊息
      },
      entry: `${src_dir}/${fn}`,
      output: {
        path: dist_dir,
        filename: `${fn}`,
      },
      // devServer: { contentBase: dist_dir },
      // devtool: 'source-map',
    };
    return config;
  };

  if (env.all) {
    const files = fs.readdirSync(src_dir).filter((file) => {
      const extname = path.extname(file);
      const file_resolved = path.resolve(src_dir, file);
      return file !== 'utils.js' && extname === '.js' && fs.lstatSync(file_resolved).isFile();
    });
    return files.map((f) => default_config(f));
  }

  const config = default_config('index');
  return config;
};
