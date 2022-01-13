const path = require('path');

// require > main startet in unserer application
module.exports = path.dirname(require.main.filename);