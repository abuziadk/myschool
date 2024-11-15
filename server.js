const express = require('express');
const app = express();
const path = require('path');

// إعداد استضافة الملفات الثابتة
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'pages')));

// تحديد مسارات API
app.use('/api/upload', require('./api/upload'));
app.use('/api/search', require('./api/search'));

// تشغيل الخادم
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
