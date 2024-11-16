const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// إعداد مجلد التخزين
const storage = multer.diskStorage({
    destination: 'uploads/', // مجلد التخزين
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// تفعيل ملفات ثابتة ليتمكن المستخدمون من رؤية صفحة الرفع
app.use(express.static('public'));

// مسار رفع الملفات
app.post('/upload', upload.single('file'), (req, res) => {
    if (req.file) {
        res.status(200).json({ message: 'تم الرفع بنجاح!' });
    } else {
        res.status(400).json({ message: 'خطأ في الرفع' });
    }
});

app.listen(PORT, () => {
    console.log(`الخادم يعمل على المنفذ ${PORT}`);
});
