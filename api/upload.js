const multer = require('multer');

const upload = multer({ dest: 'uploads/' }); // مجلد التخزين المؤقت

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        upload.single('certificate')(req, {}, (err) => {
            if (err) {
                return res.status(500).json({ message: 'حدث خطأ أثناء رفع الملف.' });
            }

            // نقل الملف إلى المجلد النهائي (إذا لزم الأمر)
            const fs = require('fs');
            const path = require('path');
            const targetPath = path.join('uploads', req.file.originalname);

            fs.rename(req.file.path, targetPath, (renameErr) => {
                if (renameErr) {
                    return res.status(500).json({ message: 'فشل في حفظ الملف.' });
                }
                res.status(200).json({ message: 'تم رفع الملف بنجاح!' });
            });
        });
    } else {
        res.status(405).json({ message: 'طريقة غير مدعومة.' });
    }
};
